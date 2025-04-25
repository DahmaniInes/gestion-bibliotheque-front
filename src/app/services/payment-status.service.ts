import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentStatusService {
  private paymentSuccessSource = new Subject<number>();
  paymentSuccess$ = this.paymentSuccessSource.asObservable();

  notifyPaymentSuccess(eventId: number): void {
    console.log('notifyPaymentSuccess: Broadcasting eventId:', eventId);
    this.paymentSuccessSource.next(eventId);
  }
}