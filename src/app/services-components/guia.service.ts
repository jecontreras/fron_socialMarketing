import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { GUIA } from '../interfaces/guia';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<GUIA>('galeria/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<GUIA>('galeria/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<GUIA>('galeria/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<GUIA>('galeria/'+query.id, query, 'delete');
  }
}
