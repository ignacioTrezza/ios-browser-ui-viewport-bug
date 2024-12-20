import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    HomeComponent,
    Page1Component,
    Page2Component,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
})
export class AppModule { }
