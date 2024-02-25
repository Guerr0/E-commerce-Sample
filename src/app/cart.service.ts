import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './products';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private totalPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private itemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  // Osservabili per totalPrice e items
  totalPrice$: Observable<number> = this.totalPriceSubject.asObservable();
  items$: Observable<Product[]> = this.itemsSubject.asObservable();

  // Metodi getter per ottenere i valori correnti degli osservabili
  get totalPrice(): number {
    return this.totalPriceSubject.value;
  }

  get items(): Product[] {
    return this.itemsSubject.value;
  }



  constructor(private http: HttpClient) { }


  updateTotalPrice(price: number): void {
    let newTotalPrice: number = Math.ceil((this.totalPrice + price) * 100) / 100;
    this.totalPriceSubject.next(newTotalPrice);
  }

  addToCart(newItem: Product): void {
    this.itemsSubject.next([...this.items, newItem]);
    this.updateTotalPrice(newItem.price);
  }


  clearCart() {
    this.itemsSubject.next([]);
    this.totalPriceSubject.next(0);
  }

  getShippingPrices(): Observable<{ type: string, price: number }[]> {
    return this.http.get<{ type: string, price: number }[]>('/assets/shipping.json');
  }
}
