import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { EventStatus } from '../../models/EventStatus';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../environment';

@Component({
  selector: 'app-show-all-events',
  templateUrl: './show-all-events.component.html',
  styleUrls: ['./show-all-events.component.css']
})
export class ShowAllEventsComponent implements OnInit, AfterViewInit {
  events: Event[] = [];
  stripe: Stripe | null = null;
  paymentProcessing = false;
  selectedEventId: number | null = null;
  showPaymentModal = false;
  card: StripeCardElement | null = null;
  elements: StripeElements | null = null;

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    console.log('ngOnInit: Initialisation du composant');
    try {
      this.stripe = await loadStripe(environment.stripePublicKey);
      console.log('ngOnInit: Stripe chargé avec succès');
      if (this.stripe) {
        this.elements = this.stripe.elements();
      }
    } catch (error) {
      console.error('ngOnInit: Erreur lors du chargement de Stripe:', error);
      alert('Erreur lors du chargement de Stripe');
    }
    this.loadEvents();
  }

  ngAfterViewInit(): void {
    // Ensure card element is mounted after modal is rendered
    if (this.showPaymentModal && this.elements) {
      this.setupCardElement();
    }
  }

  loadEvents(): void {
    console.log('loadEvents: Chargement des événements');
    this.eventService.getEvenements().subscribe({
      next: (events: Event[]) => {
        console.log('loadEvents: Événements reçus du backend:', events);
        this.events = events.map((event: Event) => ({
          id: event.id,
          resourceLink: event.resourceLink,
          resourceFileName: event.resourceFileName,
          title: event.title || 'Untitled Event',
          image: event.image,
          description: event.description || null,
          eventDate: this.convertDate(event.eventDate),
          endDate: this.convertDate(event.endDate),
          location: event.location || 'Unknown Location',
          maxParticipants: event.maxParticipants || 0,
          participantsCount: event.participantsCount || 0,
          priceCents: event.priceCents ?? 0,
          status: event.status || EventStatus.A_VENIR
        }));
        console.log('loadEvents: Événements transformés:', this.events);
      },
      error: (error) => {
        console.error('loadEvents: Erreur lors du chargement des événements:', error);
        alert('Erreur lors du chargement des événements');
      }
    });
  }

  private convertDate(date: string | number[] | Date | null | undefined): string {
    console.log('convertDate: Conversion de la date:', date);
    if (date instanceof Date) {
      return date.toISOString();
    } else if (Array.isArray(date) && date.length >= 5) {
      const d = new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
      return d.toISOString();
    } else if (typeof date === 'string') {
      return date;
    }
    console.warn('convertDate: Date invalide, retour à la date actuelle');
    return new Date().toISOString();
  }

  async initiatePayment(eventId: number): Promise<void> {
    console.log('initiatePayment: Début du processus de paiement pour eventId:', eventId);
    if (!this.stripe || !this.elements) {
      console.error('initiatePayment: Stripe.js non initialisé');
      alert('Erreur : Stripe non initialisé');
      return;
    }

    this.paymentProcessing = true;
    this.selectedEventId = eventId;
    this.showPaymentModal = true;
    this.cdr.detectChanges(); // Force DOM update for modal
    console.log('initiatePayment: Modale de paiement ouverte, paymentProcessing:', this.paymentProcessing);

    // Setup card element after modal is rendered
    this.setupCardElement();
  }

  private setupCardElement(): void {
    if (!this.elements) {
      console.error('setupCardElement: Stripe Elements non initialisé');
      return;
    }

    console.log('setupCardElement: Création de l\'élément carte');
    this.card = this.elements.create('card');
    const cardElement = document.getElementById('card-element');
    if (cardElement) {
      this.card.mount('#card-element');
      console.log('setupCardElement: Élément carte monté avec succès');
    } else {
      console.error('setupCardElement: #card-element non trouvé dans le DOM');
      alert('Erreur : Impossible d\'afficher le formulaire de paiement');
      this.closePaymentModal();
      return;
    }

    this.card.on('change', (event) => {
      const errorElement = document.getElementById('card-errors');
      if (errorElement) {
        errorElement.textContent = event.error ? event.error.message : '';
        console.log('setupCardElement: Événement de changement de carte:', event);
      }
    });
  }

  async confirmPayment(): Promise<void> {
    console.log('confirmPayment: Début de la confirmation du paiement pour eventId:', this.selectedEventId);
    if (!this.stripe || !this.card || !this.selectedEventId) {
      console.error('confirmPayment: Stripe, card ou eventId non défini');
      alert('Erreur : Configuration invalide');
      this.closePaymentModal();
      return;
    }

    console.log('confirmPayment: Création du PaymentMethod');
    try {
      const paymentMethodResult = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
        billing_details: {
          name: 'Client Name', // Replace with user input if available
        },
      });

      if (paymentMethodResult.error) {
        console.error('confirmPayment: Erreur lors de la création du PaymentMethod:', paymentMethodResult.error.message);
        alert('Erreur : ' + paymentMethodResult.error.message);
        this.closePaymentModal();
        return;
      }

      const paymentMethodId = paymentMethodResult.paymentMethod.id;
      console.log('confirmPayment: PaymentMethod créé avec ID:', paymentMethodId);

      console.log('confirmPayment: Appel au backend pour créer un PaymentIntent');
      this.eventService.createPaymentIntent(this.selectedEventId, paymentMethodId).subscribe({
        next: async (response) => {
          console.log('confirmPayment: Réponse du backend reçue:', response);
          const { client_secret, status } = response;

          if (status === 'requires_action' && client_secret) {
            console.log('confirmPayment: Paiement nécessite une action supplémentaire (ex. 3D Secure)');
            if (this.stripe) {
              const actionResult = await this.stripe.handleCardAction(client_secret);
              if (actionResult.error) {
                console.error('confirmPayment: Erreur lors de l\'action supplémentaire:', actionResult.error.message);
                alert('Erreur : ' + actionResult.error.message);
                this.closePaymentModal();
                return;
              }
              // Re-call createPaymentIntent with the same paymentMethodId to confirm
              if (this.selectedEventId) {
                this.eventService.createPaymentIntent(this.selectedEventId, paymentMethodId).subscribe({
                  next: (finalResponse) => {
                    this.handlePaymentSuccess(finalResponse);
                  },
                  error: (error) => {
                    this.handlePaymentError(error);
                  }
                });
              } else {
                console.error('confirmPayment: selectedEventId est null');
                alert('Erreur : ID de l\'événement manquant');
                this.closePaymentModal();
              }
            } else {
              console.error('confirmPayment: Stripe non initialisé');
              alert('Erreur : Stripe non initialisé');
              this.closePaymentModal();
            }
          } else {
            this.handlePaymentSuccess(response);
          }
        },
        error: (error) => {
          this.handlePaymentError(error);
        }
      });
    } catch (error) {
      console.error('confirmPayment: Erreur générale:', error);
      alert('Erreur lors de la confirmation du paiement');
      this.closePaymentModal();
    }
  }

  private handlePaymentSuccess(response: { client_secret: string; status: string }): void {
    console.log('handlePaymentSuccess: Paiement réussi, statut:', response.status);
    alert('Paiement réussi !');
    this.loadEvents(); // Refresh events
    this.closePaymentModal();
  }

  private handlePaymentError(error: any): void {
    console.error('handlePaymentError: Erreur lors de la création du PaymentIntent:', error);
    alert('Erreur lors du paiement: ' + (error.error?.message || error.message || 'Erreur inconnue'));
    this.closePaymentModal();
  }

  closePaymentModal(): void {
    console.log('closePaymentModal: Fermeture de la modale de paiement');
    this.showPaymentModal = false;
    this.paymentProcessing = false;
    this.selectedEventId = null;
    if (this.card) {
      console.log('closePaymentModal: Nettoyage de l\'élément carte');
      this.card.destroy();
      this.card = null;
    }
    this.cdr.detectChanges();
    console.log('closePaymentModal: paymentProcessing:', this.paymentProcessing);
  }
}