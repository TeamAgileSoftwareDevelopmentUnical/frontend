import { Account } from "./account";
import { Product } from "./product";

export class SellerAccount extends Account {

    products: Product[];

    paymentAddress: string;
    
}