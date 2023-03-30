import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  signupForm !: FormGroup;
  submitted ! : true ;
  type: string ="password";
  isText: boolean =false;
  eyeIcon: string ="fa-eye-slash";
  loading = false;


  constructor(private formBuilder : FormBuilder,private http :HttpClient,private dialog : MatDialog, 
    private router: Router,private dialogRef :MatDialogRef<ResetComponent>) { }
  

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      
      password:['',[Validators.required, Validators.pattern( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      
      
    })
  }
  
            
  
  signUp(){
   
    this.submitted = true
    
    if(this.signupForm.invalid){
      alert("Something went wrong")
    
    }
    else{
   
      
       
     this.dialog.open(LoginComponent, {
       width:'50%',
       
      
     });
     this.dialogRef.close();
    
     
    }
   }
   
 
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon ="fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type ="text" : this.type ="password";
}

}
