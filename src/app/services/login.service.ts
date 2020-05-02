import { Injectable } from '@angular/core';
import { USER } from '../interfaces/user';
import { FactoryModelsService } from './factory-models.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private _model: FactoryModelsService
  ) {
    // this.cuerpo = this._model;
  }
  login(query: any){
    return this._model.querys<USER>('personas/login', query, 'post');
  }
  register (query: any){
    return this._model.querys<USER>('personas/register', query, 'post');
  }
}