import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SplashComponent } from './components/splash/splash.component';
import { CategoryComponent } from './components/category/category.component';
import { AppComponent } from './app.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
