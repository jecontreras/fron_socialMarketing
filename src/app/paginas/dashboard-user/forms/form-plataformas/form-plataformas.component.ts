import { Component, OnInit } from '@angular/core';
import { PlataformaService } from 'src/app/services-components/plataforma.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-plataformas',
  templateUrl: './form-plataformas.component.html',
  styleUrls: ['./form-plataformas.component.scss']
})
export class FormPlataformasComponent implements OnInit {
  id:any = "";
  data:any = {};
  btnDisabled:boolean = false;
  titulo:string = "Crear Plataforma";
  constructor(
    private _plataforma: PlataformaService,
    private _tools: ToolsService,
    private activate: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id) {
      this.titulo = "Editar Plataforma";
      this.getRow();
    }
  }

  getRow(){
    this._plataforma.get( { where: { id: this.id } } ).subscribe( ( res:any )=>{
      res = res.data[0];
      if( !res ) return false;
      this.data = res;
    })
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
