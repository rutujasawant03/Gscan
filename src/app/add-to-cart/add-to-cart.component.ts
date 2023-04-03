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
  Pid:any;
  qutid: number=0;
  ty:any;
  id :any;
  abc:any;
  getpid:any;
  quid:any;
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
    let user = localStorage.getItem('user');
     
      let userId = user && JSON.parse(user).id
      
    this.api.getCartList(userId).subscribe((res)=>{
      
      this.ty = res
      if(res){
        localStorage.setItem('localCart',JSON.stringify(res))
      }
     
    })
    
    // this.CartDetails();
    this.loadCart();
    this.getID();
    
  }
  
  itemsCart:any = [];
  getID(){
    
    this.api.getProductId(this.id).subscribe(res=>{
      let data = res;
      console.log(data,'hhjj');
      console.log(res,'ii')
    
    this.cartService.postCart(data).subscribe((result: any)=>{
        if(result){location.reload()
        }
      })
      
      let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null){
      let storeDataGet : any = [];
      storeDataGet.push(data);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));
      location.reload()
    }
    else{
      
      this.Pid = data.id;
      let index:number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '[]');
     
      for(let i=0; i<this.itemsCart.length; i++){
        if(parseInt(this.Pid) === parseInt(this.itemsCart[i].id)){
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
  // CartDetails(){
  //   if(localStorage.getItem('localCart')){
  //     this.ty = JSON.parse(localStorage.getItem('localCart') || '[]');
  //     console.log(this.ty);
  //   }
  // }


  incQty(id: any,quantity: any){
   
   
   
    for(let i=0; i<this.ty.length; i++){
  
     if(this.ty[i].id === id){
      this.api.getCartList1(id).subscribe((result)=>{
        this.abc=result;
        this.quid=this.abc[0].productid;
        console.log(this.quid,'hcgvfhgdfdzfb')
        this.api.getProductId(this.quid).subscribe((res)=>{
          console.log(res,'kjhgfdghfgxd')
          this.qutid=res.SQty;
          this.getpid=res.id
          console.log(this.getpid,'hcgvb')
        })
      })
       if(quantity <= this.qutid-1){
       this.ty[i].quantity = parseInt(quantity) + 1;
       }
       else if(quantity==this.qutid){
        alert("Product out of stock");
      }
      }
      
    }
   
    localStorage.setItem('localCart', JSON.stringify(this.ty));
    this.loadCart();
   
 }

 decQty(id: any,quantity: any){
   for(let i=0; i<this.ty.length; i++){
    if(this.ty[i].id === id){
     if(quantity !=1)
      this.ty[i].quantity = parseInt(quantity) - 1;
    }
   }
   localStorage.setItem('localCart', JSON.stringify(this.ty));
   this.loadCart();
   
} 
Opendialog(){
       
  console.log(this.qutid,"khjgdfsfadfghjkgvgwr")
  if(this.qutid>0){
    this.dialog.open(CheckoutComponent, {
      width:'50%',
    
    });
  }
  else{
    alert("Product out of stock")
  }
  


}
    
 

  removeItem(item:any){
    console.log(item,'dss');
    if(localStorage.getItem('localCart')){ 
      this.ty = JSON.parse(localStorage.getItem('localCart') || '[]');
      this.api.deleteCart(item).subscribe((res)=>{
        for(let i=0; i<this.ty.length; i++){
            if(this.ty[i].id === item){
              this.ty.splice(i, 1);
              localStorage.setItem('localCart', JSON.stringify(this.ty));
             
            }
           
          }
          
      })
      this.loadCart();
          this.cartNumberFunc()
    }
    
  }
  emptyCart(){
    localStorage.removeItem('localCart');
    location.reload();
    this.cartNumberFunc();
    
  }
  // cart icon update
  // cartNumber:number = 0;
  // cartNumberFunc(){
  //   var cartValue = JSON.parse(localStorage.getItem('localCart')|| '[]');
  //   this.cartNumber = cartValue.length;
    
  //   this.auth.cartSubject.next(this.cartNumber)
  
  // }
  cartNumber:number = 0;
  cartNumberFunc(){
     let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id
      
    this.api.getCartList(userId).subscribe((cartValue)=>{
    this.cartNumber = cartValue.length;
    console.log(this.cartNumber,'rutu');
    this.auth.cartSubject.next(this.cartNumber)
    })
  }
  // grandTotal
  total:number = 0
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.ty = JSON.parse(localStorage.getItem('localCart') || '[]')
      this.total = this.ty.reduce(function(acc: any,val: any){
        return acc + (val.price * val.quantity);
      }, 0)
    }
  }

 
  
}
