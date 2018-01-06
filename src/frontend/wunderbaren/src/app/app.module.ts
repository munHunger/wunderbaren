import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SplashComponent } from './components/splash/splash.component';
import { CategoryComponent } from './components/category/category.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemComponent } from './components/item/item.component';

import { WunderbarService } from './service/wunderbaren.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'item/:category',      component: ItemComponent },
  { path: '',
    redirectTo: '/category',
    pathMatch: 'full'
  },
  { path: '**', component: SplashComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    CategoryComponent,
    NavbarComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [WunderbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
