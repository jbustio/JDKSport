import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Estadio } from '../models/estadio';

@Injectable({
  providedIn: 'root'
})
export class EstadioService {

  selectedEstadio: Estadio;
  estadios: Estadio[];
  
  readonly URL_API = 'http://localhost:3000/api/baseball/estadios';
  readonly DEKO_API = 'http://localhost:3000/api/baseball/deko';

  constructor(private http: HttpClient) {
    this.selectedEstadio = new Estadio();
  }

  postEstadio(estadio: Estadio) {
    return this.http.post(this.URL_API, estadio);
  }

  getEstadios() {
    return this.http.get<Estadio[]>(this.URL_API);
  }

  putEstadio(estadio: Estadio) {
    return this.http.put(this.URL_API + `/${estadio._id}`, estadio);
  }

  deleteEstadio(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  consultDB(sql: string){
    console.log(this.DEKO_API+ '/consult');
    return this.http.post(this.DEKO_API+ '/consult',sql);
  }
}
