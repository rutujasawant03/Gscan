import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Cart } from '../cart.model';
import { cart, product } from '../data-type';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { PaymentauthService } from '../service/paymentauth.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 discValue:number = 10;
  total:number= 0;
  product :any ;
  order :any =[];
  cartProduct:any;
  item: any;
  invoiceData:Cart = new Cart();
  constructor(private cartService : CartService,private http : HttpClient,private payauth:PaymentauthService,
    private dialog: MatDialog,private api:ApiService) { }

  ngOnInit(): void {
    
    this.loadCart();
    this.CartDetails();
  }
  CartDetails(){
    if(localStorage.getItem('localCart')){
      this.product = JSON.parse(localStorage.getItem('localCart') || "{}");
      console.log(this.product.length,'tttttt')
      console.log(this.product[1]['productid'],'yyyyy');
      
   console.log(this.total,'d')
      
    }
  }
  opendialog(item:any){
    this.dialog.open(InvoiceComponent, {
      width: '50%'
      
    })
    
    let user = localStorage.getItem('user');
    let order = localStorage.getItem('localCart')
      let userId = user && JSON.parse(user).id
      
     
    
     
     
      this.api.postOrder(this.product).subscribe((result: any)=>{
        if(result){
          alert('product added')

        }
        this.product = JSON.parse(localStorage.getItem('localCart') || '{}');

      })
      
  }
//  delete(){
//   this.product = JSON.parse(localStorage.getItem('localCart') || '{}');
//   for (let i =0; i< this.product.length;i++){
//     // this.api.deleteCart
//   }
//  }
  
 
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.product = JSON.parse(localStorage.getItem('localCart') || '[]')
      
      this.total = this.product.reduce(function(acc: any,val: any){
        return acc + (val.price * val.quantity);
      }, 0)
    }
  }

  totalDisc(){
    
      this.discValue = this.product.reduce(function(acc: any, val: any){
        return acc + (val.quantity*val.mrp*val.discount/100);
      },0)
   
  }
  
     
  options = {
    "key": "rzp_test_aErLjoKUqCb7rU",
    "amount":this.discValue *100, 
    "currency": "INR",
    "name": "GScan", //your business name
    "description": "Test Transaction",
    "image": "assets/logog.png",
    "order_id": "", 
    // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    // "routerLink":"invoice",
    "prefill": {
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#1cda3b"
    }
};
rzp1:any;
pay(){
  this.options.amount = (this.total *100) - (this.discValue*100)
  this.rzp1 = new this.payauth.nativeWindow.Razorpay(this.options);
  this. rzp1.open();
}
}
