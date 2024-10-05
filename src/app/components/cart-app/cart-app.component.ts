import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProdcutService } from '../../services/prodcut.service';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogoComponent, CartModalComponent, NavbarComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

//  total: number = 0;

  showCart: boolean = false;

  constructor(private service: ProdcutService){}
  
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    //this.calcularTotal();
  }

  addCart(product: Product): void {
    const hasItem = this.items.find(item => item.product.id === product.id);
    if(hasItem){
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    }else{
      this.items = [... this.items, {product: {... product}, quantity: 1}];
    }
    //this.calcularTotal();
    //this.saveSession();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter(item=> item.product.id != id);
    if(this.items.length == 0){
      sessionStorage.removeItem('cart');
      sessionStorage.clear();
    }
    //this.calcularTotal();
    //this.saveSession();
  }

//  calcularTotal(): void {
//    this.total = this.items.reduce((acumulador, item) => acumulador + item.quantity*item.product.price, 0);
//  }

//  saveSession(): void {
//    sessionStorage.setItem('cart', JSON.stringify(this.items))
//  }

  openCloseCart(): void {
    this.showCart = !this.showCart;
  }
}
