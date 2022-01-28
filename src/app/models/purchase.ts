import { CustomerAccount } from './customeraccount';
import { Product } from './product';
import { ProductResponse } from './response/productResponse';

export class Purchase{
    id: number;
    customer: CustomerAccount;
    date: Date;
    soldProduct: ProductResponse;
    productQuantity: number;
    shippingAddress: string;
    paymentMethod: string;
    total: number;
}
