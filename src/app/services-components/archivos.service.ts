import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { ARCHIVOS } from '../interfaces/archivos';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(
    private _model: FactoryModelsService,
    public sanitizer: DomSanitizer,
  ) {
    // this.cuerpo = this._model;
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  get(query: any){
    return this._model.querys<ARCHIVOS>('archivos/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<ARCHIVOS>('archivos', query, 'post');
  }
  delete (query: any){
    return this._model.querys<ARCHIVOS>('archivos/'+query.id, query, 'delete');
  }
  iframe (query:any){
    for(let row of query){
      if(row.type === 'application/pdf') {
        if(!row.url.changingThisBreaksApplicationSecurity) row.url = this.sanitizer.bypassSecurityTrustResourceUrl(row.url);
      }
    }
    return query;
  }
  verArchivo(query:any){
    let url = query.url;
    if(query.url.changingThisBreaksApplicationSecurity) {
      url = query.url.changingThisBreaksApplicationSecurity;
      window.open("").document.write("<iframe width='100%' height='100%' src='" + encodeURI(url)+"'></iframe>")
    }else{
      window.open("").document.write("<img src="+encodeURI(url)+" style='height: 560px;'>")
    }
  }
}
