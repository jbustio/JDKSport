import { RouterModule, Routes } from '@angular/router';
import {LigaComponent} from "./baseball/components/liga/liga.component";
import { EquipoComponent } from './baseball/components/equipo/equipo.component';
import { EstadioComponent } from './baseball/components/estadio/estadio.component';
import { JuegoComponent } from './baseball/components/juego/juego.component';
import { JugadorComponent } from './baseball/components/jugador/jugador.component';
import { BoardComponent } from './baseball/components/board/board.component';

const routes: Routes = [
  { path: 'liga', component: LigaComponent },
  { path: 'equipo', component: EquipoComponent },
  { path: 'juego', component: JuegoComponent },
  { path: 'jugador', component: JugadorComponent },
  { path: 'estadio', component: EstadioComponent },
  { path: 'board', component: BoardComponent }
];

export const Routing = RouterModule.forRoot(routes);
