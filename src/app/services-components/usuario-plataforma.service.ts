import { Injectable } from '@angular/core';
import { USUARIOPLATAFORMA } from '../interfaces/usuarioPlataforma';
import { FactoryModelsService } from '../services/factory-models.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPlataformaService {


  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<USUARIOPLATAFORMA>('UsuarioPlataforma/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<USUARIOPLATAFORMA>('UsuarioPlataforma/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<USUARIOPLATAFORMA>('UsuarioPlataforma/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<USUARIOPLATAFORMA>('UsuarioPlataforma/'+query.id, query, 'delete');
  }
}
