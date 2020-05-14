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
    return this._model.querys<USER>('user/querys', query, 'post');
  }
  registro (query: any){
    return this._model.querys<USER>('user/register', query, 'post');
  }
  cambioPassword (query: any){
    return this._model.querys<USER>('user/cambioPass', query, 'post');
  }
  saved (query: any){
    return this._model.querys<USER>('user/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<USER>('user/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<USER>('user/'+query.id, query, 'delete');
  }
  getPlataforma(url:string, query){
    return this._model.querysHttp<USER>(url, query, 'post');
  }
}
