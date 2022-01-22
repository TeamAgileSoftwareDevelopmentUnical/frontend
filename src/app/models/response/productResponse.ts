import {BatchResponse} from './batchResponse';
import {SellerResponse} from './sellerResponse';

export class ProductResponse{
  productId: number;
  productName: string;
  productDesc: string;
  type: string;
  photo: string;
  batch: BatchResponse = new BatchResponse();
  seller: SellerResponse = new SellerResponse();
}
