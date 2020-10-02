import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from 'src/app/services-components/mensajes.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EmpresaService } from 'src/app/services-components/empresa.service';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Fruit {
  id?: any;
  nombre?: string;
  usu_email: string;
}


@Component({
  selector: 'app-form-mensajes',
  templateUrl: './form-mensajes.component.html',
  styleUrls: ['./form-mensajes.component.scss']
})
export class FormMensajesComponent implements OnInit {

  id:any;
  titulo:string = "Detallado";
  data:any = {
    tipoEnvio: '0',
    listEmails: []
  };
  editorConfig: any;
  listPlataforma:any = [];
  dataUser:any = {};
  btnDisabled:boolean = false;
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private activate: ActivatedRoute,
    private _mensajes: MensajesService,
    private _empresas: EmpresaService,
    private _store: Store<APPINT>,
    private _tools: ToolsService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private Router: Router
  ) { 
    this.editor();
    this._store.subscribe((store: any) => {
      store = store.name;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getMensaje(); 
    else {
      this.data.creado = this.dataUser.id;
      this.data.creadoEmail = this.dataUser.email;
    }
    this.getEmpresas();
  }

  getMensaje(){
    this.spinner.show();
    this._mensajes.get( { where: { id: this.id }}).subscribe((res:any)=>{
      res = res.data[0];
      this.spinner.hide();
      if( !res ) return false;
      this.data = res;
      if( this.data.empresa ) this.data.empresa = this.data.empresa.id;
      this.data.listEmails = [];
      if( this.data.emails ){ let filtro:any = this.data.emails.split(","); for(let row of filtro) this.data.listEmails.push( { usu_email: row }); }
    });
  }

  getEmpresas(){
    this._empresas.get({ where: { }, limit: -1}).subscribe((res:any)=>{
      this.listPlataforma = res.data;
    });
  }

  openUsurios(){
    let filtro:any = this.listPlataforma.find( (row:any)=> row.id == this.data.empresa );
    if(!filtro) return this._tools.presentToast("Error plataforma no seleccionada");
    const dialogRef = this.dialog.open(FormUsuarioComponent,{
      width: '700px',
      data: filtro
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(!result) return false;
      this.data.listEmails = result;
    }); 
  }

  enviar(){
    this.btnDisabled=true;
    this.data.emails = this.transformar();
    this._mensajes.saved( this.data ).subscribe((res:any)=>{
      this._tools.presentToast("Email Enviados");
      this.id = res.data.id;
      this.data = {};
      this.Router.navigate(['/dashboard/mensajesform', res.data.id]);
      this.btnDisabled=false;
    },(error)=> { this._tools.presentToast("Error al envio de emails"); this.btnDisabled=false;})
  }

  renvio(){
    this.btnDisabled=true;
    this.data.emails = this.transformar();
    this.data = _.omit(this.data, ['empresa', 'creado', 'createdAt', 'updatedAt']);
    this.data = _.omitBy( this.data, _.isNull);
    this._mensajes.renvio( this.data ).subscribe((res:any)=>{
      this._tools.presentToast("Email Renviado");
      this.btnDisabled=false;
    },(error)=> { this._tools.presentToast("Error al renvio de emails"); this.btnDisabled=false;})
  }

  transformar(){
    let obj:string = "";
    let formatiando:any = [];
    for( let row of this.data.listEmails ) formatiando.push(row.usu_email);
    if( Object.keys(formatiando).length > 0 ) obj = formatiando.join();
    console.log(obj)
    return obj;
  }

  editor(){
    let config:AngularEditorConfig = {
          editable: true,
          spellcheck: true,
          height: '300px',
          minHeight: '0',
          maxHeight: 'auto',
          width: 'auto',
          minWidth: '0',
          translate: 'yes',
          enableToolbar: true,
          showToolbar: true,
          placeholder: 'Enter text here...',
          defaultParagraphSeparator: '',
          defaultFontName: '',
          defaultFontSize: '',
          fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
          ],
          customClasses: [
          {
            name: 'quote',
            class: 'quote',
          },
          {
            name: 'redText',
            class: 'redText'
          },
          {
            name: 'titleText',
            class: 'titleText',
            tag: 'h1',
          },
        ],
        uploadUrl: 'v1/image',
        uploadWithCredentials: false,
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
          ['bold', 'italic'],
          ['fontSize']
        ]
    };
    this.editorConfig = config;
  }

  eventoDescripcion(){}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.data.listEmails.push({usu_email: value.trim(), id: this.codigo()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.data.listEmails.indexOf(fruit);

    if (index >= 0) {
      this.data.listEmails.splice(index, 1);
    }
  }

  codigo(){
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
  }
  

}
