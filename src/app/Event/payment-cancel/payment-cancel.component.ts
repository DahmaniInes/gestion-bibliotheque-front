import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-cancel',
  template: `
    <div class="payment-cancel">
      <h1>Paiement annulé</h1>
      <p>Le paiement a été annulé. Veuillez réessayer si nécessaire.</p>
      <a routerLink="/events">Retour aux événements</a>
    </div>
  `,
  styles: [`
    .payment-cancel {
      text-align: center;
      padding: 50px;
    }
    h1 {
      color: #dc3545;
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
export class PaymentCancelComponent {}