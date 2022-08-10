import { Injectable } from '@angular/core';
import { plataforma } from '../interfaces/plataforma';
import { FactoryModelsService } from '../services/factory-models.service';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<plataforma>('empresa/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<plataforma>('empresa', query, 'post');
  }
  editar (query: any){
    return this._model.querys<plataforma>('empresa/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<plataforma>('empresa/'+query.id, query, 'delete');
  }
}
