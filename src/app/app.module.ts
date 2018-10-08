import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";

import { CustomCovalentModule } from "./covalent.module";
import { AppComponent } from './app.component';
import { Routing } from "./app.routing";
import { BoardComponent } from './baseball/components/board/board.component';
import { LigaComponent } from './baseball/components/liga/liga.component';
import { EquipoComponent } from './baseball/components/equipo/equipo.component';
import { EstadioComponent } from './baseball/components/estadio/estadio.component';
import { JugadorComponent } from './baseball/components/jugador/jugador.component';
import { JuegoComponent } from './baseball/components/juego/juego.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    LigaComponent,
    EquipoComponent,
    EstadioComponent,
    JugadorComponent,
    JuegoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CustomCovalentModule,
    HttpClientModule,
    FormsModule,
    Routing,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
