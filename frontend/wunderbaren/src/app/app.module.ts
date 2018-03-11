import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SplashComponent } from './components/splash/splash.component';
import { CategoryComponent } from './components/category/category.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemComponent } from './components/item/item.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';

import { WunderbarService } from './service/wunderbaren.service';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

const appRoutes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'item/:category',      component: ItemComponent },
  { path: "login", component: LoginComponent },
  { path: '',
    redirectTo: '/category',
    pathMatch: 'full'
  },
  { path: 'payment', component: PaymentComponent },
  { path: 'splash', component: SplashComponent },
  { path: '**', component: SplashComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    CategoryComponent,
    NavbarComponent,
    ItemComponent,
    FooterComponent,
    LoginComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [WunderbarService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
