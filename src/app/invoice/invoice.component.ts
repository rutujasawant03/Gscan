import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {jsPDF} from "jspdf";
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @ViewChild('content',{static:false}) el !:ElementRef;
  public product :any =[];
  constructor() { }

  ngOnInit(): void {
    this.CartDetails();
    this.loadCart();
    localStorage.removeItem('localCart')
    
  }
  CartDetails(){
    if(localStorage.getItem('localCart')){
      this.product = JSON.parse(localStorage.getItem('localCart') || '[]');
     
      console.log(this.product);
    }
  }
 
  
  total:number = 0
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.product = JSON.parse(localStorage.getItem('localCart') || '[]')
      
      this.total = this.product.reduce(function(acc: any,val: any){
        return acc + (val.price * val.quantity);
      }, 0)
    }
  }
  discValue:number = 10
  totalDisc(){
    if(localStorage.getItem('cart')){
      this.product= JSON.parse(localStorage.getItem('locarCart') || '[]')
      this.discValue = this.product.reduce(function(acc: any, val: any){
        return acc + (val.quantity*val.mrp*val.discount/100);
      },0)
    }
  }
 //invoice
 PDF(){
   let pdf = new jsPDF('p','pt','a4');
   pdf.html(this.el.nativeElement,{
     callback:(pdf)=>{
       pdf.save("invoice.pdf");
     }
   });
  //  pdf.save();
 }

}
