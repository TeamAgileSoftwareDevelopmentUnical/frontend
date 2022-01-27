import { CustomerAccount } from './customeraccount';
import { Product } from './product';
import { ProductResponse } from './response/productResponse';

export class Purchase{
    id: number;
    customer: CustomerAccount;
    date: Date;
    // FIXME: not the same of the backend
    soldProduct: ProductResponse;
    productQuantity: number;
    shippingAddress: string;
    paymentMethod: string;
    total: number;
}
