import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { EventStatus } from '../../models/EventStatus';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../environment';
import { PaymentStatusService } from '../../services/payment-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-all-events',
  templateUrl: './show-all-events.component.html',
  styleUrls: ['./show-all-events.component.css']
})
export class ShowAllEventsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  stripe: Stripe | null = null;
  paymentProcessing = false;
  selectedEventId: number | null = null;
  paidEventIds: Set<number> = new Set();
  private paymentSubscription: Subscription | null = null;

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private paymentStatusService: PaymentStatusService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit: Initialisation du composant');
    // Load paid event IDs from localStorage
    const storedPaidEvents = localStorage.getItem('paidEventIds');
    if (storedPaidEvents) {
      this.paidEventIds = new Set(JSON.parse(storedPaidEvents));
      console.log('ngOnInit: Loaded paidEventIds from localStorage:', [...this.paidEventIds]);
    }

    // Initialize Stripe
    loadStripe(environment.stripePublicKey)
      .then(stripe => {
        this.stripe = stripe;
        console.log('ngOnInit: Stripe chargé avec succès');
      })
      .catch(error => {
        console.error('ngOnInit: Erreur lors du chargement de Stripe:', error);
        alert('Erreur lors du chargement de Stripe');
      });

    // Load events
    this.loadEvents();

    // Subscribe to payment success events
    this.paymentSubscription = this.paymentStatusService.paymentSuccess$.subscribe(eventId => {
      console.log('Payment success received for eventId:', eventId);
      this.markEventAsPaid(eventId);
      this.loadEvents(); // Refresh events to update participant count
      this.cdr.detectChanges(); // Ensure UI updates
    });
  }

  ngOnDestroy(): void {
    if (this.paymentSubscription) {
      this.paymentSubscription.unsubscribe();
      console.log('ngOnDestroy: Unsubscribed from paymentSuccess$');
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
        this.cdr.detectChanges();
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
    if (!this.stripe) {
      console.error('initiatePayment: Stripe.js non initialisé');
      alert('Erreur : Stripe non initialisé');
      return;
    }

    // Prevent payment if already paid
    if (this.paidEventIds.has(eventId)) {
      console.log('initiatePayment: Événement déjà payé:', eventId);
      return;
    }

    this.paymentProcessing = true;
    this.selectedEventId = eventId;
    this.cdr.detectChanges(); // Update UI to show processing state
    console.log('initiatePayment: Appel au backend pour créer une session Checkout');

    try {
      // Call backend to create a Checkout session
      this.eventService.createCheckoutSession(eventId).subscribe({
        next: async (response) => {
          console.log('initiatePayment: Session Checkout reçue:', response);
          const { sessionId } = response;

          // Redirect to Stripe Checkout
          const result = await this.stripe!.redirectToCheckout({ sessionId });
          if (result.error) {
            console.error('initiatePayment: Erreur lors de la redirection vers Checkout:', result.error.message);
            alert('Erreur : ' + result.error.message);
          }
          this.paymentProcessing = false;
          this.selectedEventId = null;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('initiatePayment: Erreur lors de la création de la session Checkout:', error);
          alert('Erreur lors de la création du paiement: ' + (error.error?.message || error.message || 'Erreur inconnue'));
          this.paymentProcessing = false;
          this.selectedEventId = null;
          this.cdr.detectChanges();
        }
      });
    } catch (error) {
      console.error('initiatePayment: Erreur générale:', error);
      alert('Erreur lors du paiement');
      this.paymentProcessing = false;
      this.selectedEventId = null;
      this.cdr.detectChanges();
    }
  }

  isEventPaid(eventId: number): boolean {
    const isPaid = this.paidEventIds.has(eventId);
    console.log(`isEventPaid: Checking eventId ${eventId}, isPaid: ${isPaid}`);
    return isPaid;
  }

  markEventAsPaid(eventId: number): void {
    console.log('markEventAsPaid: Marking event as paid, eventId:', eventId);
    this.paidEventIds.add(eventId);
    localStorage.setItem('paidEventIds', JSON.stringify([...this.paidEventIds]));
    console.log('markEventAsPaid: Updated paidEventIds:', [...this.paidEventIds]);
    this.cdr.detectChanges();
  }

  // For debugging: Manually trigger markEventAsPaid
  testMarkAsPaid(eventId: number): void {
    console.log('testMarkAsPaid: Manually marking event as paid, eventId:', eventId);
    this.markEventAsPaid(eventId);
  }
}