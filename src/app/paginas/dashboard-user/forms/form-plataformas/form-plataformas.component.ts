import { Component, OnInit } from '@angular/core';
import { PlataformaService } from 'src/app/services-components/plataforma.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-plataformas',
  templateUrl: './form-plataformas.component.html',
  styleUrls: ['./form-plataformas.component.scss']
})
export class FormPlataformasComponent implements OnInit {
  id:any = "";
  data:any = {};
  btnDisabled:boolean = false;
  constructor(
    private _plataforma: PlataformaService,
    private _tools: ToolsService
  ) { }

  ngOnInit() {
  }

  actualizar(){
    this.btnDisabled=true;
    let data = _.omit( this.data, ['empresa', 'creado', 'createdAt', 'updatedAt', 'listEmails']);
    data = _.omitBy( data, _.isNull);
    this._plataforma.editar( data ).subscribe((res:any)=>{
      this._tools.presentToast("Whatsapp Actualizado");
      this.btnDisabled=false;
    },(error)=> { this._tools.presentToast("Error en el Actualizado"); this.btnDisabled=false;})
  }

  enviar(){

  }

}
