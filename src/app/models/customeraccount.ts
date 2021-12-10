import { Account } from "./account";
import { Purchase } from "./purchase";

export class CustomerAccount extends Account {
    purchases : Purchase[];
}