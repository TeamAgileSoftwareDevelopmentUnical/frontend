import { CustomerAccount } from "./customeraccount";
import { Product } from "./product";

export class Order{
    customer: CustomerAccount;
    date: Date;
    soldProducts: Product[];
    shippingAddress : string;
    paymentMethod : string;
    totalAmount : number;
}