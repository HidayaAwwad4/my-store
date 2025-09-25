import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'my_store_cart_v1';
  private items: CartItem[] = [];

  private items$ = new BehaviorSubject<CartItem[]>([]);
  private total$ = new BehaviorSubject<number>(0);
  private count$ = new BehaviorSubject<number>(0);

  constructor() {
    this.load();
  }

  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.items$.next(this.items);
    this.calculateTotals();
  }

  private load() {
    const raw = localStorage.getItem(this.storageKey);
    this.items = raw ? JSON.parse(raw) : [];
    this.items$.next(this.items);
    this.calculateTotals();
  }

  private calculateTotals() {
    const total = this.items.reduce((s, it) => s + it.product.price * it.quantity, 0);
    const count = this.items.reduce((s, it) => s + it.quantity, 0);
    this.total$.next(Number(total.toFixed(2)));
    this.count$.next(count);
  }

  getItems(): Observable<CartItem[]> { return this.items$.asObservable(); }
  getTotal(): Observable<number> { return this.total$.asObservable(); }
  getCount(): Observable<number> { return this.count$.asObservable(); }

  addToCart(product: Product, quantity = 1) {
    const idx = this.items.findIndex(i => i.product.id === product.id);
    if (idx >= 0) {
      this.items[idx].quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.persist();
  }

  updateQuantity(productId: number, quantity: number) {
    const idx = this.items.findIndex(i => i.product.id === productId);
    if (idx >= 0) {
      this.items[idx].quantity = quantity;
      if (this.items[idx].quantity <= 0) {
        this.items.splice(idx, 1);
      }
      this.persist();
    }
  }

  remove(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.persist();
  }

  clear() {
    this.items = [];
    this.persist();
  }
}
