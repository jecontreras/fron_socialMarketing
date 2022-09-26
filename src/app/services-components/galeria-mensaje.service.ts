import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { GALERIA } from '../interfaces/galeria';

@Injectable({
  providedIn: 'root'
})
export class GaleriaMensajeService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<GALERIA>('galeriaMensaje/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<GALERIA>('galeriaMensaje/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<GALERIA>('galeriaMensaje/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<GALERIA>('galeriaMensaje/'+query.id, query, 'delete');
  }
}
