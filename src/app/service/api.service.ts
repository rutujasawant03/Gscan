import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cart } from '../cart.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  post(arg0: string, arg1: { email: any; }) {
    throw new Error('Method not implemented.');
  }
  addtoCart() {
    throw new Error('Method not implemented.');
  }

  constructor(private http : HttpClient) { }
  
  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  putUser(data:any,id: number){
    return this.http.put<any>("http://localhost:3000/signupUsers/"+id , data);
  }
  getUser(){
    return this.http.get<any>("http://localhost:3000/signupUsers/");
  }
  getProductId(id:number){
    return this.http.get<any>("http://localhost:3000/productList?id="+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postOrder(cartData:any){
    return this.http.post<any>("http://localhost:3000/order/",cartData);
  }
  // getOrder(id:number){
  //   return this.http.get<any>("http://localhost:3000/order/"+id);
  // }
  getCartList(userId:number){
    return this.http.get<any>("http://localhost:3000/cart?userID="+userId)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  getCartList1(id:number){
    return this.http.get<any>("http://localhost:3000/cart?id="+id)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  getCartLists(data:Cart){
    return this.http.get<any>("http://localhost:3000/cart/"+data);
  }
  removeToCart(cartId: number) {
    return this.http.delete<any>("http://localhost:3000/cart?id="+cartId);
  }
 deleteCart(id:number){
   return this.http.delete<any>("http://localhost:3000/cart/"+id)
   .pipe(map((res:any)=>{
    return res;
  }))
 }
 putProduct(data:any,id: number){
  return this.http.put<any>("http://localhost:3000/productList/"+id , data);
}
getOrders(){
  return this.http.get<any>("http://localhost:3000/order/");
}
putProductqty(id: any,data:any){
  return this.http.put<any>("http://localhost:3000/productList/"+id ,data);
}
}
