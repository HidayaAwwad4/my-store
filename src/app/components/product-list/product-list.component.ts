import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { NgForOf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [RouterLink, NgForOf, CommonModule],
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1);
    alert(`${product.name} has been added to your cart!`);
  }
}
