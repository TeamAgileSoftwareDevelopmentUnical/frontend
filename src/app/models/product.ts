import { Purchase } from './purchase';
import { Type } from './enumproduct';
import { SellerAccount } from './selleraccount';

export class Product{
    id: number;
    name: string;
    description: string;
    price: number;
    sellerID: number;
    availableQuantity: number;
    type: string;
    photo: string;
}
