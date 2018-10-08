import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Juego } from '../models/juego';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  selectedJuego: Juego;
  juegos: Juego[];
  
  readonly URL_API = 'http://localhost:3000/api/baseball/juegos';
  readonly DEKO_API = 'http://localhost:3000/api/baseball/deko';
  readonly DEKO_API2 = 'http://localhost:8000/api/baseball/play/';

  constructor(private http: HttpClient) {
    this.selectedJuego = new Juego();
  }

  postJuego(juego: Juego) {
    return this.http.post(this.URL_API, juego);
  }
  getJuegoById(_id: string) {
    console.log(_id);
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getJuegos() {
    return this.http.get(this.URL_API);
  }

  putJuego(juego: Juego) {
    return this.http.put(this.URL_API + `/${juego._id}`, juego);
  }

  deleteJuego(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  showLayer(data: string){
    const a  = {nombre: data};
    return this.http.post(this.DEKO_API2,a);
  }
  consultDB(sql: string){
    console.log(this.DEKO_API+ '/consult');
    return this.http.post(this.DEKO_API+ '/consult',sql);
  }
}
