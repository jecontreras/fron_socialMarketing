import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { LOGICWHATSAPP } from '../interfaces/logicWhatsapp';

@Injectable({
  providedIn: 'root'
})
export class LogicWhatsappService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<LOGICWHATSAPP>('InfoWhatsapp/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<LOGICWHATSAPP>('InfoWhatsapp/create', query, 'post');
  }
  editar (query: any){
    return this._model.querys<LOGICWHATSAPP>('InfoWhatsapp/updates', query, 'post');
  }
  delete (query: any){
    return this._model.querys<LOGICWHATSAPP>('InfoWhatsapp/'+query.id, query, 'delete');
  }
  getDetail(query: any){
    return this._model.querys<LOGICWHATSAPP>('InfoWhatsappDetallado/querys', query, 'post');
  }
  savedDetail (query: any){
    return this._model.querys<LOGICWHATSAPP>('InfoWhatsappDetallado/create', query, 'post');
  }
  editarDetail (query: any){
    return this._model.querys<LOGICWHATSAPP>('InfoWhatsappDetallado/'+query.id, query, 'put');
  }
  updateWhatsappDetalle (query: any){
    return this._model.querys<LOGICWHATSAPP>('InfoWhatsapp/updateWhatsappDetalle', query, 'post');
  }
  deleteDetail (query: any){
    return this._model.querys<LOGICWHATSAPP>('InfoWhatsappDetallado/'+query.id, query, 'delete');
  }
}
