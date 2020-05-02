import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { USER } from 'src/app/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<USER>('personas/querys', query, 'post');
  }
  registro (query: any){
    return this._model.querys<USER>('personas/register', query, 'post');
  }
  cambioPassword (query: any){
    return this._model.querys<USER>('personas/cambioPass', query, 'post');
  }
  saved (query: any){
    return this._model.querys<USER>('personas/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<USER>('personas/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<USER>('personas/'+query.id, query, 'delete');
  }
}
