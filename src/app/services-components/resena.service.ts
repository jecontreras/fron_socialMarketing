import { Injectable } from '@angular/core';
import { RESENA } from '../interfaces/interfasapp';
import { FactoryModelsService } from '../services/factory-models.service';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<RESENA>('resena/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<RESENA>('resena/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<RESENA>('resena/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<RESENA>('resena/'+query.id, query, 'delete');
  }
}
