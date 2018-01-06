import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SplashComponent } from './components/splash/splash.component';
import { CategoryComponent } from './components/category/category.component';
import { AppComponent } from './app.component';

import { WunderbarService } from './service/wunderbaren.service';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WunderbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
