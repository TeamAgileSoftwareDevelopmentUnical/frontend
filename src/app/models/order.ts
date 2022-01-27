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
        ){
            this.orderId = orderId;
            this.customer = customer;
            this.date = date;
            this.soldProducts = purchases;
            this.shippingAddress = shippingAddress;
            this.paymentMethod = paymentMethod;
            this.totalAmount = this.getSumAmount();
        }

        getSumAmount()
        {
            let sum = 0;
            if(this.soldProducts.length !== 0)
            {               
                this.soldProducts.forEach(element => {
                    sum += element.total;                    
                });                
            }
            return sum;
        }
}

