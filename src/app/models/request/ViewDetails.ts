import { BatchResponse } from "../response/batchResponse";
import { SellerResponse } from "../response/sellerResponse";

export class ViewDetails{
    productID: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productQuantity: number;
    photo: string;
    batch: BatchResponse= new BatchResponse();
    seller: SellerResponse= new SellerResponse();
  }
  