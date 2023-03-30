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
   

    
    
}
search(event:any){
  this.searchTerm = (event.target as HTMLInputElement).value;
  console.log(this.searchTerm);
}
addtoCart(item:any){
  this.cartService.addtoCart(item);
  // console.log(item, "ye dkho hum haya hai")
}
opendialog() {
  alert('U need to login');
  this.dialog.open(LoginComponent, {
    width: '50%'
 
  })
  
 
}

}
function openDialog() {
  throw new Error('Function not implemented.');
}

