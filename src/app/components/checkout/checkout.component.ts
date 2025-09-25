import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private router: Router, private cartService: CartService) {
    this.cartItems$ = this.cartService.getItems();
    this.total$ = this.cartService.getTotal();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const orderData = {
        customer: form.value,
        items: null,
        total: null
      };

      // نفرغ العربة بعد الطلب
      this.cartService.clear();
      this.router.navigate(['/confirmation']);
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
