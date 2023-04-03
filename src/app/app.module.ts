import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from'@angular/platform-browser/animations';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import {HttpClientModule} from'@angular/common/http';
import { ProductComponent } from './product/product.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatNativeDateModule } from '@angular/material/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SecurityComponent } from './security/security.component';
import { ResetComponent } from './reset/reset.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatTabsModule} from '@angular/material/tabs';
import { InvoiceComponent } from './invoice/invoice.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import {MatMenuModule} from '@angular/material/menu';

import { RouterModule, Routes } from '@angular/router';
import { ScanComponent } from './scan/scan.component';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddToCartComponent,
    ProductComponent,
    FilterPipe,
    LoginComponent,
    SignupComponent,
    SecurityComponent,
    ResetComponent,
    CheckoutComponent,
    InvoiceComponent,
 
    ScanComponent,
      SummaryComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatBadgeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatTabsModule,
    NgxScannerQrcodeModule,
    RouterModule,
    MatMenuModule
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

