import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }
  getWishlist() {
    return this.http.get("http://localhost:3000/wishlist/").pipe(
      map((result:any) =>{
        let productId: any[] = []
        result.forEach((item: { id: any; }) => productId.push(item.id)
          
        )
        return productId;
      })
    )
      
  }

  addToWishlist(id: any) {
    return this.http.post<any>("http://localhost:3000/wishlist/",id )
  }

  removeFromWishlist(id:number) {
    return this.http.delete<any>("http://localhost:3000/wishlist/"+id);
  }
 
}
