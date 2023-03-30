import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from "@angular/forms"
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { cart, product } from '../data-type';
import { SecurityComponent } from '../security/security.component';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  type: string ="password";
  isText: boolean =false;
  eyeIcon: string ="fa-eye-slash";
  product: any;
  item: any;
  index:any;
  cartProduct:any;
  constructor(private formBuilder:FormBuilder,private http :HttpClient,private router :Router,
    private dialog : MatDialog,private dialogRef :MatDialogRef<LoginComponent>,private cartService : CartService,private api:ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required,],
      password:['',Validators.required]
    })
  }
  Opendialog() {
    this.dialog.open(SignupComponent, {
      width:'50%'
      
    })
  }
  opendialog() {
    this.dialog.open(SecurityComponent, {
      width:'50%'
      
    })
  }
  
  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user =res.find((a:any)=>{
        return a.email ===this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Sucessfully!!");
        
      
      if(res){
          localStorage.setItem('user',JSON.stringify(user))
        }
      
        this.localToDb(this.item,this.index)
        this.loginForm.reset();
        this.dialogRef.close();
        this.router.navigate(['product'])
        localStorage.getItem('localCart')
        
      }
      else{
        alert("User not found!!");
      }
     
    },err=>{
      alert("Something went wrong!!")
    
    })
  }
 
  localToDb(item:any,index:any) {
    // if(this.loginForm){
    let user = localStorage.getItem('user');
    let order = localStorage.getItem('localCart')
      let userId = user && JSON.parse(user).id
      if(order){
        // let cartDataList:CartService[]= JSON.parse(order);
  
      this.cartProduct = {
        userID :userId,
        productid : item.id,
        category: item.category,
        description :item.description,
        image : item.image,
        price : item.price,
        productName : item.productName,
        quantity : item.quantity,
        total: item.total
      }
      
      let cart = this.cartProduct
     
      this.cartService.postCart(cart).subscribe((result)=>{
        if(result){
          console.log(result,"item store in db");
        }
      })
      if(this.cartProduct.length===index+1){
        localStorage.removeItem('localCart')
      }
     
  
      }
      this.cartList(userId)
      location.reload();
      
        
    // } 
  }
  cartList(userId:number){
    this.api.getCartList(userId).subscribe((res)=>{
      console.log(res,'localCart')
      if(res){
        localStorage.setItem('localCart',JSON.stringify(res))
      }

    })
  }
  hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon ="fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type ="text" : this.type ="password";
  }
  // useEffect(){
  //   sessionStorage.clear();
  //       };
 
  
}
