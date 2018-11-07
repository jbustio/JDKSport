import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import { GenericTableModule } from '@angular-generic-table/core';

import { CustomCovalentModule } from "./covalent.module";
import { AppComponent } from './app.component';
import { Routing } from "./app.routing";
import { CoreModule } from './core/core.module';
import { BaseballModule } from './baseball/baseball.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BaseballModule,
    BrowserAnimationsModule,
    CommonModule,
    CustomCovalentModule,
    HttpClientModule,
    FormsModule,
    Routing,
    ReactiveFormsModule,
    GenericTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
