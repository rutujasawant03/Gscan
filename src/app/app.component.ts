import { Component, EventEmitter, Output } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog'
import { CartService } from './service/cart.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './service/auth.service';
import { ApiService } from './service/api.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent {

  title = 'G-Scan';
  public totalItem: number = 0;
  public grandTotal: number = 0;
  showFiller = false;
 loginU:any;

  public searchTerm !: string;

  constructor(private dialog: MatDialog, private cartService: CartService,private auth:AuthService,private api:ApiService) {
    this.auth.cartSubject.subscribe((data)=>{
    this.cartItem = data;
    });
  }

  ngOnInit(): void {
    this.cartService.getProduct()
      .subscribe(res => {
        // this.totalItem = res.length;
        this.grandTotal = res;

      })
      this.cartItemFunc();
      
  }
    cartItem:number = 0;
    cartItemFunc(){
      let user = localStorage.getItem('user');
      
        let userId = user && JSON.parse(user).id
        this.loginU = user && JSON.parse(user).fullname
    {
      this.api.getCartList(userId).subscribe((cartCount)=>{ 
        this.cartItem = cartCount.length
        console.log(this.cartItem,"sds")
      })
    } 

    }
      loggedin(){
        return localStorage.getItem('user');
      }
  
    
    opendialog() {
      this.dialog.open(LoginComponent, {
        width: '50%'

      })
    }

    logout() {
      let fullname = localStorage.getItem('user') ? localStorage.getItem('user') : ''
      console.log(fullname);
      if (fullname == '') {
        alert('U need to login');
        this.dialog.open(LoginComponent, {
          width: '50%'
        })
      }
      
      localStorage.removeItem('user');
      localStorage.removeItem('localCart');
      
      location.reload();
      
    }
    search(event: any) {
      this.searchTerm = (event.target as HTMLInputElement).value;
      console.log(this.searchTerm);
      this.cartService.search.next(this.searchTerm);
    }

}
