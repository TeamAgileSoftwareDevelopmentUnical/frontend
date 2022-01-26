import { Purchase } from '../models/purchase';

export class Order{
    orderId: number;
    customer: number;
    date: Date;
    soldProducts: Purchase[];
    shippingAddress : string;
    paymentMethod : string;
    totalAmount : number;

    constructor(
        orderId: number,
        customer: number,
        date: Date,
        purchases: Purchase[],
        shippingAddress: string,
        paymentMethod: string,
        totalAmount: number
        ){
            this.orderId = orderId;
            this.customer = customer;
            this.date = date;
            this.soldProducts = purchases;
            this.shippingAddress = shippingAddress;
            this.paymentMethod = paymentMethod;
            this.totalAmount = totalAmount;
        }
}