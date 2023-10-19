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
  getWhatsapp(query: any){
    return this._model.querys<WHATSAPPINFO>('WhatsappTxt/querys', query, 'post');
  }
  savedWhatsapp(query: any){
    return this._model.querys<WHATSAPPINFO>('WhatsappTxt/init', query, 'post');
  }
  editarWhatsapp(query: any){
    return this._model.querys<WHATSAPPINFO>('WhatsappTxt/'+query.id, query, 'put');
  }
  getWhatsappHistorial(query: any){
    return this._model.querys<WHATSAPPINFO>('WhatsappHistorial/querys', query, 'post');
  }
  savedWhatsappHistorial(query: any){
    return this._model.querys<WHATSAPPINFO>('WhatsappHistorial/init', query, 'post');
  }
  editarWhatsappHistorial(query: any){
    return this._model.querys<WHATSAPPINFO>('WhatsappHistorial/'+query.id, query, 'put');
  }
  sendChat(query: any){
    return this._model.querys<WHATSAPPINFO>('WhatsappHistorial/send', query, 'post');
  }
}
