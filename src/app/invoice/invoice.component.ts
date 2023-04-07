import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf";
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @ViewChild('content', { static: false }) el !: ElementRef;
  public product: any = [];
  constructor(private cartService: CartService,public api:ApiService) { }
  cartdelete:any;
  ngOnInit(): void {
    this.CartDetails();
    this.loadCart();
    localStorage.removeItem('localCart')


  }
  CartDetails() {
    this.cartService.getProduct()
      .subscribe(res => {
        res = this.product
      })
  }

  total: number = 0
  loadCart() {
    if (localStorage.getItem('localCart')) {
      this.product = JSON.parse(localStorage.getItem('localCart') || '[]')
      this.total = this.product.reduce(function (acc: any, val: any) {
        return acc + (val.price * val.quantity);
      }, 0)
    }
  }
  discValue: number = 10
  totalDisc() {
    if (localStorage.getItem('cart')) {
      this.product = JSON.parse(localStorage.getItem('locarCart') || '[]')
      this.discValue = this.product.reduce(function (acc: any, val: any) {
        return acc + (val.quantity * val.mrp * val.discount / 100);
      }, 0)
    }
  }
  //invoice
  PDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: function (pdf) {
        pdf.setPage(0);
        pdf.save("invoice.pdf");
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 2500,
    });
  }
  delete(){
    this.cartdelete = JSON.parse(localStorage.getItem('localCart') || '{}');
    for (let i =0; i< this.cartdelete.length;i++){
      this.api.deleteCart(this.cartdelete[i].id).subscribe((res)=>{
  
      })
    }
    
  }
}
