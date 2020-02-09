import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuInterfac } from '../interfaces/menu';

import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  getMenuOpts() {
    return this.http.get<MenuInterfac[]>('/assets/data/menu.json');
  }
}
