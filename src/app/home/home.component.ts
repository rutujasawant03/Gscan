import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { AppComponent } from '../app.component';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { ProductComponent } from '../product/product.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public totalItem : number = 0;
  public grandTotal : number = 0;
  public searchTerm !: string  ;
   public productList : any;
  searchKey:string ="";
  cart1:any
  item: any;
  cartID:any;
  cartProduct:any;
  constructor(private dialog : MatDialog,private cartService : CartService,private api : ApiService){
    
    }
    openDialog() {
      this.dialog.open(AppComponent,{
        width:'30px'
      
      });
  }

  ngOnInit(): void {
    this.cartService.getProduct()
    .subscribe(res=>{
      this.totalItem = res.length;
      this.grandTotal =res;
      
    })
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      
    })

    
    
}
search(event:any){
  this.searchTerm = (event.target as HTMLInputElement).value;
  console.log(this.searchTerm);
}
// addtoCart(item:any){
//   this.cartService.addtoCart(item);
//   // console.log(item, "ye dkho hum haya hai")
// }
itemsCart:any;
opendialog(item:any) {
  
  if(!localStorage.getItem('user')){

    alert('U need to login');
    this.dialog.open(LoginComponent, {
      width: '50%'
   
    })
  }
else{
let user = localStorage.getItem('user');

  let userId = user && JSON.parse(user).id
  
  this.cartProduct = {
    userID :userId,
    productid : item.id,
    category: item.category,
    description :item.description,
    image : item.image,
    price : item.price,
    productName : item.productName,
    quantity : item.quantity,
    total: item.total,
    discount:10,
  }

  this.cart1 = this.cartProduct

var Pid = item.id;
console.log(Pid,'pid var')
console.log(Pid,'pid var')
let index:number = -1;
this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '[]');
console.log(this.itemsCart,'cartdeta')

for(let i=0; i<this.itemsCart.length; i++){
if(Pid === this.itemsCart[i].productid){
  this.itemsCart[i].quantity = item.quantity;
  index = i;
  break;
}
}

if(index == -1){
this.itemsCart.push(this.cart1);
console.log(this.cart1,'ds')
localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
}
else{

localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
}
if(index == -1){
this.cartService.postCart(this.cart1).subscribe((result: any)=>{
  if(result){
  }
 
})
}
} 
  
 
}

}
function openDialog() {
  throw new Error('Function not implemented.');
}

