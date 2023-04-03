import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  discValue:number = 10;
  total:number= 0;
  cartdelete:any;
  product :any ;
  order :any =[];
  cartProduct:any;
  item: any;
  invoiceid:any=0;
  length:any;
  AllOrder:any;
  id1:any;
  constructor(private api:ApiService,private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  opendialog(item:any){
    
    this.dialog.open(InvoiceComponent, {
      width: '50%'
      
    })
   
    if(localStorage.getItem('localCart')){
      this.product = JSON.parse(localStorage.getItem('localCart') || "{}");
      for(let i=0;i<this.product.length;i++){
        this.id1=this.product[i].id;
        console.log(this.id1,'OOOOOOOOOP')
        this.api.getProductId
      
        
        let user = localStorage.getItem('user');
    
        let userId = user && JSON.parse(user).id
        
        this.cartProduct = {
          userID :userId,
          productid : this.product[i].productid,
          category: this.product[i].category,
          description :this.product[i].description,
          image : this.product[i].image,
          price : this.product[i].price,
          productName : this.product[i].productName,
          quantity : this.product[i].quantity,
          total: this.product[i].total,
          discount:10,
         
        }
      let order=this.cartProduct
      console.log(order,'qwertyuio')
     
      this.api.postOrder(order).subscribe((result: any)=>{
        if(result){
          
          

        }
        else{
          alert("order not placed")
        }
        this.product = JSON.parse(localStorage.getItem('localCart') || '{}');

      })
      
      this.delete()
        
      
      
      alert('order placed')
      
      
   console.log(this.total,'d')
      
    }
    
      }
      
    
    
      
  }

  delete(){
    this.cartdelete = JSON.parse(localStorage.getItem('localCart') || '{}');
    for (let i =0; i< this.cartdelete.length;i++){
      this.api.deleteCart(this.cartdelete[i].id).subscribe((res)=>{
  
      })
    }
    
    
   }
   
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
 
}
