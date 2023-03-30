import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cart, product } from '../data-type';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  product: any;
  cartData = new EventEmitter<product[] | []>();
  constructor(private http : HttpClient) { }
  postCart(cartData:any){
    return this.http.post<any>("http://localhost:3000/cart/",cartData);
  }
  getProduct(){
    return this.productList.asObservable();

  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
    
  }
  
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product : any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }

    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
  // getCartList(userId:number){
  //   return this.http.get<any>("http://localhost:3000/cart?userId="+userId,
  //   {observe:'response'}).subscribe((result)=>{
  //     console.log(result,'iiiiii')
  //     if(result){
  //       this.cartData.emit(result.body)
  //     }
      
  //   })
  // }
}


