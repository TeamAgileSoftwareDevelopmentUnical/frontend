import { Product } from './product';
import { SellerAccount } from './selleraccount';

export class Batch{
    id: number;
    products: Product[];
    seller: SellerAccount;
    price: number;
    availableQuantity: number;
}
