import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  PID: any;
  a: any;
  b: any;
  c: any;
  data: any;
  pid: any;
  pcat: any;
  pname: any;
  pdis: any;
  ppris: any;
  pimg: any;
  qut: any;
  id:any;
  productForm !: FormGroup;
  constructor(private api:ApiService,private dialog: MatDialog,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  
  }
  opendialog(item:any){
    
    this.dialog.open(InvoiceComponent, {
      width: '50%'
      
    })
   
    if(localStorage.getItem('localCart')){
      this.product = JSON.parse(localStorage.getItem('localCart') || "{}");
      console.log(this.product,'HGHGHGHGHG')
      for(let i=0;i<this.product.length;i++){
        this.id1=this.product[i].id;
       
        let a=this.product[i].SQty;
        console.log(a,"nnnnnnnnn")
        console.log(this.id1,'OOOOOOOOOP')
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id
        
        this.cartProduct = {
          userID:userId,
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
      let order=this.cartProduct;
      console.log(order,'qwertyuio')   
      this.api.postOrder(order).subscribe((result: any)=>{
        if(result){
          console.log(result,"zzzzzz")
          this.api.getProductId(result.productid).subscribe((res1)=>{
            let t=res1[0].quantity;
            this.updateQty(result.productid,result.quantity,a,t,result.category,result.productName,result.description,result.image,result.price);
           

          })
          
        }
        else{
          alert("order not placed")
        }
    

      });   
     }
    
      }
    
      
  }
 updateQty(id:any,cartqut:any,requt:any,aqut:any,catagory:any,productName:any,description:any,image:any,price:any) {

  console.log(id,"kkkkkkkk")
  console.log(requt,"ttttttt")
  console.log(cartqut,"ppppppp")
  console.log(aqut,"rrrrrrr")
  
  this.productForm = this.formBuilder.group({
            id: id,
            category: catagory,
            productName: productName,
            description: description,
            quantity: aqut,
            price: price,
            image: image,
            discount: 10,
            SQty: aqut-cartqut,
            RemQty: '',
          });
          console.log(this.productForm,'jjjjjjj')
          this.api.putProductqty(id, this.productForm.value).subscribe((res1) => {
                    console.log(res1,'VVVVVVVVVV')
                  },)
  

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
