import { Injectable } from '@angular/core';
import { Item } from '../store/add_on/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Item[] = []

  constructor() { }
}
