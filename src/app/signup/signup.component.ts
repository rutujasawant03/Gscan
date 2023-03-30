import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormGroup,FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl} from "@angular/forms"
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  signupForm !: FormGroup;
  submitted ! : true ;
  title = 'angularvalidate';
  type: string ="password";
  isText: boolean =false;
  eyeIcon: string ="fa-eye-slash";
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})'),
  ]);
  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})'),
  ]);
  resetPasswordForm = this.formBuilder.group({
    newPassword: this.newPassword,
    confirmPassword: this.confirmPassword,
  });


  
  


  constructor(private formBuilder : FormBuilder,private http :HttpClient,private router :Router,private dialog : MatDialog,private dialogRef :MatDialogRef<SignupComponent>) { }


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:['',[Validators.required,Validators.minLength(6)]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      // password:['',[Validators.required,Validators.minLength(8)]],
      // confirmpassword:['',[Validators.required,Validators.minLength(8)]],
      mobile:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.maxLength(10)]],
      security:['',[Validators.required,Validators.minLength(10)]],
      
    }) 
   
  }
  Opendialog() {
    this.dialog.open(LoginComponent, {
      width:'50%',
    
    });
    
  }
  
  checkPasswords(pw: string, cpw: string) {
    this.isConfirmPasswordDirty = true;
    if (pw == cpw) {
      this.passwordsMatching = true;
      this.confirmPasswordClass = 'form-control is-valid';
    } else {
      this.passwordsMatching = false;
      this.confirmPasswordClass = 'form-control is-invalid';
    }
  }
  // confirmedValidator(password: string, confirmpassword: string) {
  //   return (signupForm: FormGroup) => {
  //     const control = signupForm.controls[password];
  //     const matchingControl = signupForm.controls[confirmpassword];
  //     if (matchingControl.errors && !matchingControl.errors.confirmedValidator) 
  //     {
  //       return;
  //     }
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ confirmedValidator: true });
  //     } 
  //     else 
  //     {
  //       matchingControl.setErrors(null);
  //     }
  //   };
  // }
 
  signUp(){
   
    this.submitted = true
    
    if(this.signupForm.invalid){
      alert("Something went wrong")
    
    }
    else{
   
     this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Sucessfull");
     
      this.signupForm.reset();
      
      this.dialogRef.close();
      
    this.dialog.open(LoginComponent, {
      width:'50%',
     
    });
    });
    }
    
  }
    
   
  
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon ="fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type ="text" : this.type ="password";
}

}
