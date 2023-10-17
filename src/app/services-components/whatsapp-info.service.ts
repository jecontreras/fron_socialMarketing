import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { WHATSAPPINFO } from '../interfaces/whatsappInfo';

@Injectable({
  providedIn: 'root'
})
export class WhatsappInfoService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<WHATSAPPINFO>('whatsappInfo/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<WHATSAPPINFO>('whatsappInfo/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<WHATSAPPINFO>('whatsappInfo/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<WHATSAPPINFO>('whatsappInfo/'+query.id, query, 'delete');
  }
}
