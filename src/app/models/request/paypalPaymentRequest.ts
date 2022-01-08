export class PaypalPaymentRequest{
  price: number;
  currency: string;
  method: string;
  intent: string;
  description: string;
  successURL: string;
  cancelURL: string;
}
