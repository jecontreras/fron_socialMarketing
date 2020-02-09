import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { CONTRATO } from '../interfaces/contrato';
import { FACTURAS } from '../interfaces/facturas';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(
    private _model: FactoryModelsService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<FACTURAS>('facturas/querys', query, 'post');
  }
  editar (query: any){
    return this._model.querys<FACTURAS>('facturas/'+query.id, query, 'put');
  }
}