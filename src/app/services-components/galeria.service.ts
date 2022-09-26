import { Injectable } from '@angular/core';
import { GALERIA } from '../interfaces/galeria';
import { FactoryModelsService } from '../services/factory-models.service';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<GALERIA>('galeria/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<GALERIA>('galeria/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<GALERIA>('galeria/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<GALERIA>('galeria/'+query.id, query, 'delete');
  }
}
