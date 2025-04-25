import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { PaymentStatusService } from '../../services/payment-status.service';

@Component({
  selector: 'app-payment-success',
  template: `
    <div class="payment-success">
      <h1>Paiement réussi !</h1>
      <p>Votre inscription à l'événement a été confirmée.</p>
      <a routerLink="/events">Retour aux événements</a>
    </div>
  `,
  styles: [`
    .payment-success {
      text-align: center;
      padding: 50px;
    }
    h1 {
      color: #28a745;
    }
    a {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `]
})
export class PaymentSuccessComponent implements OnInit {
  eventId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private paymentStatusService: PaymentStatusService
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.queryParamMap.get('eventId'));
    if (this.eventId) {
      console.log('Payment successful for event ID:', this.eventId);
      // Increment participant count
      this.eventService.confirmPayment(this.eventId).subscribe({
        next: (response) => {
          console.log('Participant count updated:', response);
          // Notify ShowAllEventsComponent of successful payment
          this.paymentStatusService.notifyPaymentSuccess(this.eventId!);
          console.log('Notified payment success for eventId:', this.eventId);
        },
        error: (error) => {
          console.error('Error updating participant count:', error);
          // Notify anyway, since backend operation succeeded
          this.paymentStatusService.notifyPaymentSuccess(this.eventId!);
          console.log('Notified payment success despite error for eventId:', this.eventId);
          alert('Erreur lors de la mise à jour du nombre de participants: ' + (error.error?.message || error.message || 'Erreur inconnue'));
        }
      });
    }
  }
}