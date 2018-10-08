import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Equipo } from '../models/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  selectedEquipo: Equipo;
  equipos: Equipo[];
  
  readonly URL_API = 'http://localhost:3000/api/baseball/equipos';
  readonly DEKO_API = 'http://localhost:3000/api/baseball/deko';

  constructor(private http: HttpClient) {
    this.selectedEquipo = new Equipo();
  }

  postEquipo(equipo: Equipo) {
    return this.http.post(this.URL_API, equipo);
  }

  getEquipos() {
    return this.http.get<Equipo[]>(this.URL_API);
  }

  putEquipo(equipo: Equipo) {
    return this.http.put(this.URL_API + `/${equipo._id}`, equipo);
  }

  deleteEquipo(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  consultDB(sql: string){
    console.log(this.DEKO_API+ '/consult');
    return this.http.post(this.DEKO_API+ '/consult',sql);
  }
}
