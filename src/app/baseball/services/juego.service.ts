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
  readonly DEKO_API = 'http://localhost:3000/api/core/deko';
  readonly DEKO_API2 = 'http://localhost:8000/api/baseball/play/';
  readonly DEKO_Show = 'http://localhost:8000/api/baseball/show/';
  readonly DEKO_Update = 'http://localhost:8000/api/baseball/update/';

  constructor(private http: HttpClient) {
    this.selectedJuego = new Juego();
  }

  postJuego(juego: Juego) {
    return this.http.post(this.URL_API, juego);
  }
  getJuegoById(_id: string) {
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

  playGr(data: string) {
    const a = { nombre: data };
    return this.http.post(this.DEKO_API2, a);
  }

  runMacro(data: string) {
    const a = { macro: data };
    return this.http.post(this.DEKO_Show, a);
  }

  crearConsulta(data: any) {
    var sql = 'Update ' + data['table'] + ' SET ';
    var cont = 0;
    for (var key in data) {
      if (key != 'table' && key != 'id') {
        if (cont != 0) {
          if (typeof data[key] === "string") {
            sql += "," + key + "= '" + data[key] + "'";
          } else {
            sql += "," + key + "= " + data[key];
          }
        } else {
          cont += 1;
          if (typeof data[key] === "string") {
            sql += key + "= '" + data[key] + "'";
          } else {
            sql += key + "= " + data[key];
          }
        }
      }
    }
    sql += " WHERE id=" + data['id'];
    return { sql: sql };
  }

  crearMultiConsulta(data:any){
    console.log(data);
/*      var sql = 'Update ' + data['table'] + ' SET ';
     for(var r in data['data']){
       for (var key in r) {

       }
     } */
  }

  consultDB(sql: any) {
    //return this.http.post(this.DEKO_Update,sql);
    return this.http.post(this.DEKO_API + '/consult', sql);
  }
}
