import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetComponent } from '../reset/reset.component';
import { SignupComponent } from '../signup/signup.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  signupForm !: FormGroup;
  submitted ! : true ;
  session:any;
  type: string ="password";
  isText: boolean =false;
  eyeIcon: string ="fa-eye-slash";
  actionBtn : string ="Save";
  data: any;
  

  constructor( private formBuilder : FormBuilder,private router :Router,private http :HttpClient,
    private dialog : MatDialog,private dialogRef :MatDialogRef<SecurityComponent>,private api : ApiService,) { }


  ngOnInit(): void {


    
    this.signupForm = this.formBuilder.group({
      
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required,Validators.minLength(8)]],
     
      security:['',[Validators.required,Validators.minLength(10)]],
     
      

      
      
      
    });
    
  }
  
  
  signUp(){
    this.submitted = true
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user =res.find((a:any)=>{
        
        return a.security === this.signupForm.value.security && a.email ===this.signupForm.value.email ;
        console.log(this.signupForm, 'ewe')

      });
      
      this.data = {
        fullname : user.fullname,
        email : user.email,
        mobile : user.mobile,
        security : user.security,
        password:this.signupForm.value.password
      }
      console.log(this.data, 'dekho')
      if(user){
        console.log(user.id,'main')
        this.api.putUser(this.data,user.id)
        .subscribe({
          next:(res)=>{
            alert("Sucessfully!!");
            this.signupForm.reset();
            this.dialogRef.close();
          }
        })
       
      
      }
      else{
        alert("Icorrect")
      }
    },err=>{
        alert("Something went wrong!!")
      
      
    
       
      
    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon ="fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type ="text" : this.type ="password";
}
}
   
  
  
  

