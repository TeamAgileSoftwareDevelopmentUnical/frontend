import {ProductInfo} from "./productInfo";

export class StripeCheckoutPaymentRequest{
  description: string;
  amount: number;
  stripeToken: string;
  stripeEmail: string;
  customerId: number;
  productIds: ProductInfo[] = [];
}
