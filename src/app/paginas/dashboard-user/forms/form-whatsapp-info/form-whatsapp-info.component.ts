import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { WhatsappInfoService } from 'src/app/services-components/whatsapp-info.service';

@Component({
  selector: 'app-form-whatsapp-info',
  templateUrl: './form-whatsapp-info.component.html',
  styleUrls: ['./form-whatsapp-info.component.scss']
})
export class FormWhatsappInfoComponent implements OnInit {

  data:any = {

  };
  disableBtn:boolean = false;
  id:string;
  dataUser:any = {};
  listGaleria:any = [];
  titulo:string = "Crear";

  constructor(
    private _whatsappInfo: WhatsappInfoService,
    private _Tools: ToolsService,
    private Router: Router,
    private activate: ActivatedRoute,
    private _store: Store<APPINT>,
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      this.dataUser = store.user;
    });
  }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getId();
  }

  getId(){
    this.titulo = "Actualizar";
    this._whatsappInfo.get( { where: { id: this.id } } ).subscribe( res => {
      res = res.data[0];
      this.data = res;
    })
  }
  handleSubmit(){
    if( this.disableBtn ) return false;
    this.disableBtn = true;
    if( this.id ) this.handleUpdate();
    else this.handleCreate();
    this.disableBtn = false;
  }

  handleCreate(){
    return new Promise( resolve => {
      this.data.user = this.dataUser.id;
      this._whatsappInfo.saved( this.data ).subscribe( res =>{
        this._Tools.tooast( { title: "Creado Lista Whatsapp"} );
        this.Router.navigate( ['/dashboard/whatsappInfoform', res.id ] );
        resolve( true );
      },()=> resolve( false ) );
    })
  }

  handleUpdate(){
    return new Promise( resolve =>{
      let data = this.data;
      data = _.omit(data, [ 'listLogic','user' ])
      data = _.omitBy(data, _.isNull);
      this._whatsappInfo.editar( data ).subscribe( res =>{
        this._Tools.tooast( { title: "Autualizado Lista Whatsapp"} );
        resolve( true );
      }, ()=> resolve( false ) );
    });
  }
}
