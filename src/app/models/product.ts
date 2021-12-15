import { Purchase } from "./purchase";
import { Type } from "./enumproduct";
import { SellerAccount } from "./selleraccount";

export class Product{
    id: number;
    name : string;
    description: string;
    price: number;
    seller : number;
    availableQuantity: number;
    type : string;

}
