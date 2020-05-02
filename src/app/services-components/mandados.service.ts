import { Injectable } from '@angular/core';
import { MANDADOS } from '../interfaces/interfasapp';
import { FactoryModelsService } from '../services/factory-models.service';

@Injectable({
  providedIn: 'root'
})
export class MandadosService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<MANDADOS>('ordenes/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<MANDADOS>('ordenes/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<MANDADOS>('ordenes/'+query.id, query, 'put');
  }
}
