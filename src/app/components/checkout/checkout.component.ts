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


  customer = {
    name: '',
    address: '',
    email: '',
    card: ''
  };

  constructor(private router: Router, private cartService: CartService) {
    this.cartItems$ = this.cartService.getItems();
    this.total$ = this.cartService.getTotal();
  }

  onFieldChange(field: string, value: string) {
    console.log(`Field changed: ${field} = ${value}`);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const orderData = {
        customer: this.customer,
        items: null,
        total: null
      };

      this.cartService.clear();
      this.router.navigate(['/confirmation']);
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
