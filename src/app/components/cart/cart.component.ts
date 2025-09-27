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
  cartItems: (CartItem & { previousQuantity: number })[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      // عند جلب العناصر، خزّن الكمية الحالية في previousQuantity
      this.cartItems = items.map(item => ({ ...item, previousQuantity: item.quantity }));
      this.calculateTotal();
    });

    this.cartService.getTotal().subscribe(total => this.total = total);
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  removeItem(index: number) {
    const product = this.cartItems[index].product;
    this.cartService.remove(product.id);
    this.cartItems.splice(index, 1);
    this.calculateTotal();
    alert(`${product.name} has been removed from your cart.`);
  }

  onInputChange(index: number, value: string, inputElement: HTMLInputElement) {
    const qty = Number(value);
    const item = this.cartItems[index];

    if (qty < 1) {
      const confirmDelete = confirm(`Do you want to remove ${item.product.name} from your cart?`);
      if (confirmDelete) {
        this.removeItem(index);
      } else {
        setTimeout(() => {
          inputElement.value = item.previousQuantity.toString();
        });
      }
      return;
    }
    item.quantity = qty;
    item.previousQuantity = qty;
    this.cartService.updateQuantity(item.product.id, qty);
    this.calculateTotal();
  }
}
