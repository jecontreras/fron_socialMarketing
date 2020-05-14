import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { MENSAJES } from '../interfaces/interfasapp';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<MENSAJES>('mensajes/querys', query, 'post');
  }
  getDetallado(query: any){
    return this._model.querys<MENSAJES>('chatdetallado/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<MENSAJES>('mensajes/create', query, 'post');
  }
  renvio (query: any){
    return this._model.querys<MENSAJES>('mensajes/renvio', query, 'post');
  }
  editar (query: any){
    return this._model.querys<MENSAJES>('mensajes/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<MENSAJES>('mensajes/'+query.id, query, 'delete');
  }
}
