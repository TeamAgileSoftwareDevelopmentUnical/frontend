import { Purhcase } from "./purhcase";
import { Type } from "./enumproduct";
import { SellerAccount } from "./selleraccount";

export class Product{
    id: number;
    name : string;
    description: string;
    price: number;
    seller : SellerAccount;
    availableQuantity: number;
    charts : Purhcase[];
    type : Type;

}