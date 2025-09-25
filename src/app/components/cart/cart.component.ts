import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });

    this.cartService.getTotal().subscribe(total => this.total = total);
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  removeItem(index: number) {
    const product = this.cartItems[index].product;
    this.cartService.remove(product.id);

    alert(`${product.name} has been removed from your cart.`);
  }

  updateQuantity(index: number, qty: number) {
    const quantity = Number(qty);
    if (quantity < 1) return;
    const productId = this.cartItems[index].product.id;
    this.cartService.updateQuantity(productId, quantity);
  }
}
