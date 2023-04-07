import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from "@angular/forms"
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
  submitted !: true;
  title = 'angularvalidate';
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";








  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private dialog: MatDialog, private dialogRef: MatDialogRef<SignupComponent>) { }


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.maxLength(10)]],
      security: ['', [Validators.required, Validators.minLength(10)]],
    }
      , {
        validators: this.MustMatch('password', 'confirmpassword')
      }
    )
    this.duplicate()
  }
  Opendialog() {
    this.dialog.open(LoginComponent, {
      width: '50%',

    });

  }
  get r() {
    return this.signupForm.controls
  }
  MustMatch(password: any, confirmpassword: any) {
    return (formgroup: FormGroup) => {
      const passwordcontrol = formgroup.controls[password];
      const confirmpasswordcontrol = formgroup.controls[confirmpassword];
      if (confirmpasswordcontrol.errors && confirmpasswordcontrol.errors['MustMatch']) {
        return;
      }
      if (passwordcontrol.value !== confirmpasswordcontrol.value) {
        confirmpasswordcontrol.setErrors({ MustMatch: true })
      }
      else {
        confirmpasswordcontrol.setErrors(null)
      }
    }
  }
  signUp() {
    this.submitted = true
    if (this.signupForm.invalid) {
      alert("Something went wrong")
    }
    else {
      this.http.get<any>("http://localhost:3000/signupUsers")
        .subscribe(res => {
          const email = res.find((a: any) => {
            return a.email === this.signupForm.value.email
          });
          if (email) {
            alert("User already exist!!");
          } else {
            this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
              .subscribe(res => {
                alert("Signup Sucessfull");

                this.signupForm.reset();

                this.dialogRef.close();

                this.dialog.open(LoginComponent, {
                  width: '50%',
                });
              });
          }

        })
    }
  }
  duplicate() {
    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          let userInfo = a.email
        });
      })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
