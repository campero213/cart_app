import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'catalogo-component',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent {

  @Input() products!: Product[];

  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();
  addCart(product : Product) {
    this.productEventEmitter.emit(product);
  }
}
