import {BatchResponse} from "./batchResponse";
import {SellerResponse} from "./sellerResponse";

export class ProductResponse{
  productId: number;
  productName: string;
  productDesc: string;
  type: string;
  batch: BatchResponse;
  seller: SellerResponse;
}
