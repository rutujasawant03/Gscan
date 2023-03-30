import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';

import { ScanComponent } from './scan/scan.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'product',component : ProductComponent},
  {path:'add-to-cart',component : AddToCartComponent},
  {path:'invoice',component : InvoiceComponent},
  {path:'scan',component : ScanComponent}
  // {path:'login',component:LoginComponent},
  // {path:'signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
