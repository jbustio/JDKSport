import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Liga } from '../models/liga';

@Injectable({
  providedIn: 'root'
})
export class LigaService {

  selectedLiga: Liga;
  ligas: Liga[];
  
  readonly URL_API = 'http://localhost:3000/api/baseball/ligas';

  constructor(private http: HttpClient) {
    this.selectedLiga = new Liga();
  }

  postLiga(liga: Liga) {
    return this.http.post(this.URL_API, liga);
  }

  getLigas() {
    return this.http.get(this.URL_API);
  }

  putLiga(liga: Liga) {
    return this.http.put(this.URL_API + `/${liga._id}`, liga);
  }

  deleteLiga(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
