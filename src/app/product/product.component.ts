import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, max } from 'rxjs';
import { Cart } from '../cart.model';
import { cart, product } from '../data-type';
import { LoginComponent } from '../login/login.component';

import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { WishlistService } from '../service/wishlist.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public productList: any;
  cartData: any;
  searchKey: string = "";
  // public product :any ;
  public filterCategory: any
  cart1: any

  item: any;
  cartID: any;
  cartProduct: any;
  product: any | Cart;
  userId: any;
  @Input()
  addedToWishlist!: boolean;
  productId: any;
  quantityR: number = 0;
  Pid: any;
  wishlist: number[] = []

  constructor(private api: ApiService, private dialog: MatDialog, private cartService: CartService, private auth: AuthService, private wishlistService: WishlistService) { }
  ngOnInit(): void {
    this.api.getProduct()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          if (a.category === "Butter" || a.category === "Bakery") {
            a.category = "Snacks"
          }
        });
        this.productList.forEach((a: any) => {
          if (this.Pid === this.productList.id) {
            this.quantityR = a.quantity;
          }
          Object.assign(a, { quantity: 1, total: a.price });
        });
      });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      })
  }
  itemsCart: any;
  addtoCart(item: any) {
    
    if (!localStorage.getItem('user')) {
      alert('U need to login');
      this.dialog.open(LoginComponent, {
        width: '50%'
      })
    }
    else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id
      this.cartProduct = {
        userID: userId,
        productid: item.id,
        category: item.category,
        description: item.description,
        image: item.image,
        price: item.price,
        productName: item.productName,
        quantity: item.quantity,
        total: item.total,
        discount: 10,
        SQty: item.SQty,
        RemQty: item.RemQty,
        
        
      }
      this.cart1 = this.cartProduct
      this.Pid = item.id;
      console.log(this.Pid, 'pid var')
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      console.log(this.itemsCart, 'cartdeta')
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (this.Pid === this.itemsCart[i].productid) {
          this.itemsCart[i].quantity = item.quantity;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(this.cart1);
        console.log(this.cart1, 'ds')
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
      else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
      if (index == -1) {
        this.cartService.postCart(this.cart1).subscribe((result: any) => {
          if (result) {
          }
        })
      }
    }
  }
  cartNumber: number = 0;
  cartNumberFunc() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id
    this.api.getCartList(userId).subscribe((cartValue) => {
      this.cartNumber = cartValue.length;
      console.log(this.cartNumber, 'rutu');
      this.auth.cartSubject.next(this.cartNumber)
    })
  }
 
}
