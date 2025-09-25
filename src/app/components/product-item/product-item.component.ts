import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  standalone: true,
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>(); // event

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
