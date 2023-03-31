import { Component, Input, OnInit } from '@angular/core';
import { from, max } from 'rxjs';
import { Cart } from '../cart.model';
import { cart, product } from '../data-type';

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
  public productList : any;
  searchKey:string ="";
  // public product :any ;
  public filterCategory : any
  item: any;
  
  cartProduct:any;
  product : any |Cart ;
  userId: any;
  @Input()
  addedToWishlist!: boolean;
  productId: any;
  wishlist: number[] = []
  cart: {} | undefined;
  constructor(private api : ApiService, private cartService : CartService,private auth : AuthService,private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res; 
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category === "Butter" || a.category === "Bakery"){
          a.category ="Snacks"
        }
       
      });
      this.productList.forEach((a:any) =>{
        Object.assign(a,{quantity:1,total:a.price});
       
      });
   
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
   this.CartDetails();
  }
  
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
  CartDetails(){
    if(localStorage.getItem('localCart')){
      this.product = JSON.parse(localStorage.getItem('localCart') || '[]');
      
      console.log(this.product,'hiiiiii');
    }
  }
  itemsCart:any | Cart= [];
  
  addtoCart(item:any){
   
    this.cartService.addtoCart(item);
    
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null && !localStorage.getItem('user')){
      let storeDataGet : any = [];
      storeDataGet.push(item);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));
      
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
      
      let cart = this.cartProduct
    
     
     
      this.cartService.postCart(cart).subscribe((result: any)=>{
        if(result){
          alert('product added')
          console.log(result.id,'hvgxjhhj')
          
        
           
        }
      })
      var Pid = item.id;
      let index:number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      for(let i=0; i<this.itemsCart.length; i++){
        if(parseInt(Pid) === parseInt(this.itemsCart[i].id)){
          this.itemsCart[i].quantity = item.quantity;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.itemsCart.push(cart);
        localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
      }
      else{
        
        localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
      }
      
    }
    // localStorage.setItem('localCart',JSON.stringify(item))
    this.cartNumberFunc();
    
   
  }
 
  cartNumber:number = 0;
  cartNumberFunc(){
    var cartValue = JSON.parse(localStorage.getItem('localCart')|| '[]');
    this.cartNumber = cartValue.length;
    console.log(this.cartNumber);
    this.auth.cartSubject.next(this.cartNumber)
  }
  handleAddToWishlist() {
    this.wishlistService.addToWishlist(this.product.id).subscribe(() => {
      this.addedToWishlist = true;
    })
  }

  handleRemoveFromWishlist() {
    this.wishlistService.removeFromWishlist(this.product.id).subscribe(() => {
      this.addedToWishlist = false;
    })
  }
  loadWishlist() {
    this.wishlistService.getWishlist().subscribe(productIds => {
      this.wishlist = productIds
    })
  }
  
   
 
  // search(event:any){
  //   this.searchTerm = (event.target as HTMLInputElement).value;
  //   console.log(this.searchTerm);
  //   this.cartService.search.next(this.searchTerm);
  // }
}
