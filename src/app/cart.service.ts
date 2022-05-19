import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalPrice : number = 0; 
  items: Product[] = [];

  constructor(private http: HttpClient) { }

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }

  getTotalPrice(){
    return this.totalPrice;
  }

  updateTotalPrice(price : number){
    this.totalPrice= this.totalPrice + price;
  }

}
