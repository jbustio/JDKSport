import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  selectedJugador: Jugador;
  jugadores: Jugador[];
  
  readonly URL_API = 'http://localhost:3000/api/baseball/jugadores';
  readonly DEKO_API = 'http://localhost:3000/api/baseball/deko';

  constructor(private http: HttpClient) {
    this.selectedJugador = new Jugador();
  }

  postJugador(jugador: Jugador) {
    return this.http.post(this.URL_API, jugador);
  }

  getJugadores() {
    return this.http.get(this.URL_API);
  }

  getJugadorPorID(jugadorID : string){
    return this.http.get(this.URL_API + `/${jugadorID}` );
  }
  
  getJugadoresPorEquipo(equipoID : string){
    return this.http.get(this.URL_API + `/equipo/${equipoID}` );
  }

  putJugador(jugador: Jugador) {
    return this.http.put(this.URL_API + `/${jugador._id}`, jugador);
  }

  deleteJugador(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  consultDB(sql: string){
    console.log(this.DEKO_API+ '/consult');
    return this.http.post(this.DEKO_API+ '/consult',sql);
  }
}
