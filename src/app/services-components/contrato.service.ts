import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { FactoryModelsService } from '../services/factory-models.service';
import { CONTRATO } from '../interfaces/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(
    private _model: FactoryModelsService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<CONTRATO>('contrato/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<CONTRATO>('contrato/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<CONTRATO>('contrato/'+query.id, query, 'put');
  }
}