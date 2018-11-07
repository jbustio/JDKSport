import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from "@angular/forms";


import { BoardComponent } from './components/board/board.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { EstadioComponent } from './components/estadio/estadio.component';
import { JuegoComponent } from './components/juego/juego.component';
import { JugadorComponent } from './components/jugador/jugador.component';
import { LigaComponent } from './components/liga/liga.component';
import { CustomCovalentModule } from '../covalent.module';
import { AlbateComponent } from './components/board/albate/albate.component';
import { JugadorDialogComponent } from './components/jugador/jugador-dialog/jugador-dialog.component';
import { RosterDialogComponent } from './components/board/roster-dialog/roster-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CustomCovalentModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    BoardComponent,
    EquipoComponent,
    EstadioComponent,
    JuegoComponent,
    JugadorComponent,
    LigaComponent,
    AlbateComponent,
    JugadorDialogComponent,
    RosterDialogComponent
  ],
  entryComponents: [JugadorDialogComponent,RosterDialogComponent]
})
export class BaseballModule { }
