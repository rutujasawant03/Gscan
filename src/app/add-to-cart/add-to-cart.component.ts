import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../cart.model';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  itemForm !: FormGroup;
  product: any | Cart;
  public grandTotal !: number;
  productList: any | Cart;
  data: any;
  updqty:any;
  item: any;
  Pid: any;
  qutid: number = 0;
  ty: any;
  id: any;
  abc: any;
  getpid: any;
  quid: any;
  id3:any;
  cartProduct: any;
  constructor(private cartService: CartService, private http: HttpClient, private formBuilder: FormBuilder,
    private api: ApiService, private auth: AuthService, private dialog: MatDialog, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(queryParam => {
      this.id = queryParam.id;
      console.log(this.id,'pppppppp')
    })

    this.cartService.getProduct()
      .subscribe(res => {
        this.product = res;
      })
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id
    this.api.getCartList(userId).subscribe((res) => {
      this.ty = res
      if (res) {
        console.log(res,'IIIIUUUUU')
        // location.reload()
        localStorage.setItem('localCart', JSON.stringify(res))
      }
    })
    this.loadCart();
    // this.getID();
  }
  itemsCart: any = [];
  // getID() {
  //   this.api.getProductId(this.id).subscribe(res => {
      
  //     // for(let i=0;i<res.length;i++){
        
  //     //   if(this.ty.id === res.id){
  //       // location.reload()
  //       let data=res
        
  //       localStorage.setItem('localCart', JSON.stringify(data));
  //     console.log(data, 'hhjj');
     
   
  //     // let cartDataNull = localStorage.getItem('localCart');
  //     // if (cartDataNull == null) {
  //     //   let storeDataGet: any = [];
  //     //   storeDataGet.push(data);
  //     //   localStorage.setItem('localCart', JSON.stringify(storeDataGet));
  //     //   location.reload()
  //     // }
  //     // else {
  //       // this.Pid = data.id;
  //       let index: number = -1;
  //       this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '[]');
  //       for (let i = 0; i < this.itemsCart.length; i++) {
  //         if (parseInt(this.Pid) === parseInt(this.itemsCart[i].id)) {
  //           this.itemsCart[i].quantity = data.quantity;
  //           index = i;
  //           break;
  //         }
  //       }
  //       if (index == -1) {
  //         this.itemsCart.push(data);
  //         localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
  //       }
  //       else {
  //         localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
  //       }
  //       // if (index == -1) {
  //       //   this.cartService.postCart(data[0]).subscribe((result: any) => {
  //       //     if (result) {
  //       //     }
  //       //   })
  //       // }
  //     // }
  //   // }
  //   // }
  //   })
  // }
  incQty(id: any, quantity: any,proid:any) {
   
  console.log(proid,'DXFCGVJHBJN')
  this.api.getProductId(proid).subscribe((res)=>{
    let actqut=res[0].SQty;
    console.log(res,"jhgfdfgh")
    if (quantity < actqut) {
      for(let a=0;a<=this.ty.length;a++){
        if(this.ty[a].id===id){      
          this.ty[a].quantity = parseInt(quantity) + 1;
        }
        
        }
      }else if (quantity == actqut) {
        alert("Product out of stock");
      }
           
  })
    
    
    localStorage.setItem('localCart', JSON.stringify(this.ty));
    this.loadCart();
  }

  decQty(id: any, quantity: any) {
    for (let i = 0; i < this.ty.length; i++) {
      if (this.ty[i].id === id) {
        if (quantity != 1)
          this.ty[i].quantity = parseInt(quantity) - 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.ty));
    this.loadCart();
  }
  Opendialog() {
    console.log(this.qutid, "khjgdfsfadfghjkgvgwr")
    // if (this.qutid > 0) {
      this.dialog.open(CheckoutComponent, {
        width: '50%',
      });
      // this.api.getProduct().subscribe((res1)=>{
      //   for(let i=0;i<res1.length;i++){
      //     let qtiqty=res1[i].quantity
      //     console.log(qtiqty,'tyyttyyytt')
       
      // if(localStorage.getItem('localCart')){
      //   this.updqty=JSON.parse(localStorage.getItem('localCart') || '{}')
      //   for(let i = 0; i<this.updqty.length; i++){
      //     this.id3 = this.updqty[i].id
      //     this.cartProduct = {
      //       id: this.updqty[i].productid,
      //       category: this.updqty[i].category,
      //       productName: this.updqty[i].productName,
      //       description: this.updqty[i].description,
      //       quantity: this.updqty[i].quantity,
      //       price: this.updqty[i].price,
      //       SQty: this.updqty[i].SQty+this.updqty[i].quantity,
      //       RemQty: qtiqty-this.updqty[i].SQty,
      //       image:this.updqty[i].image,
      //       discount: 10
      //     }
      //     console.log( qtiqty-this.updqty[i].SQty,'llllllllllllll')
      //     console.log(this.cartProduct,'fddfdf');
      //     console.log(this.updqty[i].SQty+this.updqty[i].quantity,'ddddd')
      //     this.api.putProduct(this.cartProduct,this.updqty[i].productid).subscribe((res)=>{
      //         console.log(res,'res')
      //       })
      //   }
      // }
    // }
    // else {
    //   alert("Product out of stock")
    // }
//   }
// }
// )
  }
  removeItem(item: any) {
    console.log(item, 'dss');
    if (localStorage.getItem('localCart')) {
      this.ty = JSON.parse(localStorage.getItem('localCart') || '[]');
      this.api.deleteCart(item).subscribe((res) => {
        for (let i = 0; i < this.ty.length; i++) {
          if (this.ty[i].id === item) {
            this.ty.splice(i, 1);
            localStorage.setItem('localCart', JSON.stringify(this.ty));
          }
        }
      })
      this.loadCart();
      this.cartNumberFunc()
    }
  }
  emptyCart() {
    localStorage.removeItem('localCart');
    location.reload();
    this.cartNumberFunc();

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
  // grandTotal
  total: number = 0
  loadCart() {
    if (localStorage.getItem('localCart')) {
      this.ty = JSON.parse(localStorage.getItem('localCart') || '[]')
      this.total = this.ty.reduce(function (acc: any, val: any) {
        return acc + (val.price * val.quantity);
      }, 0)
    }
  }
}
