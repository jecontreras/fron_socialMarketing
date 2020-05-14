import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { EMPRESA } from '../interfaces/interfasapp';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<EMPRESA>('empresa/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<EMPRESA>('empresa/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<EMPRESA>('empresa/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<EMPRESA>('empresa/'+query.id, query, 'delete');
  }
}
