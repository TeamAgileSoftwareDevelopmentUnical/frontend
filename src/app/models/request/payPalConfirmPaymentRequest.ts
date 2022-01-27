import {ProductInfo} from './productInfo';

export class PayPalConfirmPaymentRequest{
  paymentId: string;
  payerId: string;
  customerId: number;
  productIds: ProductInfo[] = [];
}
