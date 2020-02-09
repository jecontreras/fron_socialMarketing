import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { PAIS } from '../interfaces/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private _model: FactoryModelsService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<PAIS>('pais/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<PAIS>('pais/create', query, 'post');
  }
}