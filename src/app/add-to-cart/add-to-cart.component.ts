import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
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
  product :any | Cart;
  public grandTotal !: number;
   productList : any | Cart;
  data: any;
  item: any;
  id :any;
  constructor(private cartService : CartService,private http :HttpClient,private formBuilder:FormBuilder,
    private api : ApiService,private auth : AuthService,private dialog: MatDialog, private actRoute: ActivatedRoute){}

  ngOnInit(): void {
    
   
    this.actRoute.queryParams.subscribe(queryParam =>{
      console.log(queryParam,'hiii')
      this.id = queryParam.id;
      console.log(this.id,'hello')
    })
   
  this.cartService.getProduct()
    .subscribe(res=>{
      this.product = res;
      
      
    })
    this.CartDetails();
    this.loadCart();
    this.getID();
    this.removeItem(this.id)
  }
  Opendialog(){
    this.dialog.open(CheckoutComponent, {
      width:'50%',
    
    });
    
  }
  itemsCart:any = [];
  getID(){
    
    this.api.getProductId(this.id).subscribe(res=>{
      let data = res;
      console.log(data,'hh');
      console.log(res,'ii')
      
      let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null){
      let storeDataGet : any = [];
      storeDataGet.push(data);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));
      location.reload()
    }
    else{
      
      var Pid = data.id;
      let index:number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '[]');
     
      for(let i=0; i<this.itemsCart.length; i++){
        if(parseInt(Pid) === parseInt(this.itemsCart[i].id)){
          this.itemsCart[i].quantity = data.quantity;
          index = i;
          
          break;
          
        }
      
      }
      
      if(index == -1){
        this.itemsCart.push(data);
        localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
        
      }
      else{
        localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
        
      }
    }
    
    })
  }
  CartDetails(){
    if(localStorage.getItem('localCart')){
      this.product = JSON.parse(localStorage.getItem('localCart') || '[]');
      console.log(this.product);
    }
  }


  incQty(id: any,quantity: any){
    
    for(let i=0; i<this.product.length; i++){
     if(this.product[i].id === id){
    
       if(quantity !=10){
       this.product[i].quantity = parseInt(quantity) + 1;
       }
      
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.product));
    this.loadCart();
   
 }

 decQty(id: any,quantity: any){
   for(let i=0; i<this.product.length; i++){
    if(this.product[i].id === id){
     if(quantity !=1)
      this.product[i].quantity = parseInt(quantity) - 1;
    }
   }
   localStorage.setItem('localCart', JSON.stringify(this.product));
   this.loadCart();
   
} 

    
 

  removeItem(id:number){
    // console.log(item);
    // if(localStorage.getItem('localCart')){
    //   this.product = JSON.parse(localStorage.getItem('localCart') || '[]');
    //   for(let i=0; i<this.product.length; i++){
    //     if(this.product[i].id === item){
    //       this.product.splice(i, 1);
    //       localStorage.setItem('localCart', JSON.stringify(this.product));
         
    //     }
       
    //   }
    //   this.loadCart();
    //       this.cartNumberFunc()
    // }
   
    
    this.api.deleteCart(id).subscribe((res)=>{
      console.log(res,'pppppppppp')
     
    })
  }
  cartList(userId:number){
    this.api.getCartList(userId).subscribe((res)=>{
      if(res){
        localStorage.setItem('localCart',JSON.stringify(res))
      }
    })
  }
  emptyCart(){
    localStorage.removeItem('localCart');
    location.reload();
    this.cartNumberFunc();
    
  }
  // cart icon update
  cartNumber:number = 0;
  cartNumberFunc(){
    var cartValue = JSON.parse(localStorage.getItem('localCart')|| '[]');
    this.cartNumber = cartValue.length;
    
    this.auth.cartSubject.next(this.cartNumber)
  }
  // grandTotal
  total:number = 0
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.product = JSON.parse(localStorage.getItem('localCart') || '[]')
      this.total = this.product.reduce(function(acc: any,val: any){
        return acc + (val.price * val.quantity);
      }, 0)
    }
  }

 
  
}
