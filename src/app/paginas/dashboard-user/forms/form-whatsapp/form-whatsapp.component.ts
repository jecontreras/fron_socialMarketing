import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ExcelService } from 'src/app/services/excel.service';
import { ArchivosService } from 'src/app/services-components/archivos.service';
import { GaleriaService } from 'src/app/services-components/galeria.service';

export interface Fruit {
  id?: any;
  nombre?: string;
  usu_email: string;
}

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[][];
}


@Component({
  selector: 'app-form-whatsapp',
  templateUrl: './form-whatsapp.component.html',
  styleUrls: ['./form-whatsapp.component.scss']
})
export class FormWhatsappComponent implements OnInit, OnDestroy {

  id:any;
  titulo:string = "Detallado";
  data:any = {
    tipoEnvio: '2',
    listEmails: [],
    listRotador: [],
    pausar: true,
    cantidadTiempoMensaje: 25,
    tiempoMsxPausa: 60,
    cantidadMsxPausa: 10,
    rotadorMensajes: true
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
  intervalo:any;

  listNumerosGr = [];
  listCompletaNumeroGr = [];
  files:any = [];
  listDePlataforma:any = [];
  counstNumero:number = 0;
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  coint:number;

  dataTable: DataTable;
  pagina = 10;
  loader:boolean = false;
  query:any = {
    where:{
      estado: 0
    },
    sort: "createdAt DESC",
    page: 0,
    limit: 10
  };
  Header:any = [ 'Acciones','Mensaje de','Para de','Mandado','Mensaje','Oferta','Estado', 'Creado' ];
  dataConfig:any = {
    vista: "whatsap"
  };

  constructor(
    private activate: ActivatedRoute,
    private _mensajes: MensajesService,
    private _empresas: EmpresaService,
    private _store: Store<APPINT>,
    private _tools: ToolsService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private excelSrv: ExcelService,
    private _archivos: ArchivosService,
    private _galeria: GaleriaService
  ) {
    this.editor();
    this._store.subscribe((store: any) => {
      store = store.name;
      this.dataUser = store.user || {};
    });
  }

  async ngOnInit() {
    this.dataTable = {
      headerRow: this.Header,
      footerRow: this.Header,
      dataRows: []
    };
    this.getEmpresas();
    await this.cargarTodos();
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) {
      this.getMensaje();
      this.intervalo = setInterval(()=>{
        this.getFoto();
      }, 3000)
    }
    else {
      this.data.creado = this.dataUser.id;
      this.data.creadoEmail = this.dataUser.email;
      this.agregarMasRotador();
    }

  }

  ngOnDestroy(){
    clearInterval( this.intervalo );
  }



  getFoto(){
    this._mensajes.get( { where: { id: this.id }}).subscribe((res:any)=>{
      res = res.data[0];
      this.spinner.hide();
      if( !res ) return false;
      this.data.imagenWhat = res.imagenWhat;
    });
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
      this.onSelectPlt( );
      let selecciono = this.dataTable.dataRows.find( ( item:any ) => item.id == this.data.listRotador2 );
      this.dataConfig.id = this.data.listRotador2;
      this.seleccion( selecciono );
      try {
        this.data.listRotador = _.map( this.data.listRotador, ( item:any )=>{
          return {
            files: [],
            ...item
          }
        })
      } catch (error) { }
      this.ProsesoMensajes();
      console.log( this.data)
    });
  }

  async onSelectPlt( ){
    if( this.listPlataforma.length === 0 ) await this.getEmpresas();;
    this.listDePlataforma=[];
    let filtro = _.find( this.listPlataforma, ( item:any )=> item.id == this.data.empresa );
    console.log("***", this.data, filtro )
    if( !filtro ) {return false};
    if( !filtro.cantidadLista ) return false;
    for(let i=0; i< filtro.cantidadLista; i++ ){
      this.listDePlataforma.push ( { titulo: "lista "+Number( i + 1 ), id: i+1 } );
    }
  }

  ProsesoMensajes(){
    this._mensajes.getMensajeNumero( { where:{ mensaje: this.data.id }, sort: "createdAt ASC" } ).subscribe(( res:any )=>{
      res = res.data;
      for( let row of res ){
        this.listCompletaNumeroGr.push( row );
        for( let key of row.numerosPendientes || []){
          this.counstNumero++;
          this.data.listEmails.push( { username: key.username || ' ', telefono: key.telefono || '000', id: row.id } );
          this.listNumerosGr.push( { username: key.username || ' ', telefono: key.telefono || '000', id: row.id} );
        }
        for( let key of row.numerosCompletados || [] ){
          this.counstNumero++;
          this.data.listEmails.push( { username: key.username || ' ', telefono: key.telefono || '000', id: row.id } );
          this.listNumerosGr.push( { username: key.username || ' ', telefono: key.telefono || '000', id: row.id } );
        }
      }
    });
  }

  getEmpresas(){
    return new Promise( resolve =>{
      this._empresas.get({ where: { estado: 0 }, limit: -1}).subscribe((res:any)=>{
        this.listPlataforma = res.data;
        if( this.dataUser.rol !== '6520612bf48bb70d888bffe3' ) this.listPlataforma = this.listPlataforma.filter( row => row.id === '6456728a45ce5d0014db2870');
        resolve( true );
      });
    })
  }

  openUsurios(){
    let filtro:any = this.listPlataforma.find( (row:any)=> row.id == this.data.empresa );
    if(!filtro) return this._tools.presentToast("Error plataforma no seleccionada");
    filtro.vista = "whatsapp";
    const dialogRef = this.dialog.open(FormUsuarioComponent,{
      width: '700px',
      data: filtro
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(!result) return false;
      this.data.listEmails = _.map( result, ( item:any )=>{
        return {
          username: item.nombre,
          telefono: item.usu_telefono,
          email: item.usu_email,
          ...item
        }
      });
    });
  }

  async enviar(){
    this.btnDisabled=true;
    let data = _.omit( this.data, ['listEmails']);
    this._tools.ProcessTime({ title: 'cargando', tiempo: 9000 });
    this._mensajes.saved( this.data ).subscribe((res:any)=>{
      this._tools.presentToast("Whatsapp Enviados");
      this.id = res.data.id;
      if( this.data.listEmails[0] ) this.procesoGuardarNumeros();
      else this._mensajes.getPlataformas( { url: res.data.empresa.urlRespuesta, id: this.id, cantidadLista: this.data.cantidadLista, plataforma: this.data.empresa, idLista: this.data.idLista } ).subscribe(( res:any )=>{ this.btnDisabled=false; }, error => this.btnDisabled=false );
      this.getMensaje();
      this.data = {};
    },(error)=> { this._tools.presentToast("Error al envio de Whatsapp"); this.btnDisabled=false;})
  }

  procesoGuardarNumeros(){
    let listaFinal:any = [];
    for( let row of this.data.listEmails ){
      let filtro = this.listNumerosGr.find( ( item:any )=> item.telefono == row.telefono );
      if( !filtro ) listaFinal.push( row );
    }
    let data:any = {
      mensaje: this.id,
      numerosPendientes: listaFinal
    };
    this._mensajes.savedMensajeNumero( data ).subscribe(( res:any )=>{});
  }

  actualizar(){
    this.btnDisabled=true;
    let data = _.omit( this.data, ['empresa', 'creado', 'createdAt', 'updatedAt', 'listEmails']);
    data = _.omitBy( data, _.isNull);
    this._mensajes.editar( data ).subscribe((res:any)=>{
      this._tools.presentToast("Whatsapp Actualizado");
      this.procesoGuardarNumeros();
      this.btnDisabled=false;
    },(error)=> { this._tools.presentToast("Error en el Actualizado"); this.btnDisabled=false;})
  }

  renvio(){
    this.btnDisabled=true;
    this.data = _.omit(this.data, ['empresa', 'creado', 'createdAt', 'updatedAt', 'listEmails']);
    this.data.estadoActividad = false;
    this.data = _.omitBy( this.data, _.isNull);
    this._mensajes.renvio( this.data ).subscribe((res:any)=>{
      this._tools.presentToast("Whatsapp Renviado");
      this.btnDisabled=false;
    },(error)=> { this._tools.presentToast("Error al renvio de Whatsapp"); this.btnDisabled=false;})
  }

  transformar(){
    let obj:string = "";
    let formatiando:any = [];
    for( let row of this.data.listEmails ) formatiando.push( { telefono: row.usu_telefono, username: row.usu_nombre } );
    if( Object.keys(formatiando).length > 0 ) obj = formatiando.join();
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
      let validando = value.split(".");
      if( !validando[1] ) {}
      else{
        let username = validando[0];
        let telefono = validando[1];
        this.data.listEmails.push({ username: username, telefono: telefono.trim(), id: this.codigo() });
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  async remove(fruit: Fruit) {
    const index = this.data.listEmails.indexOf(fruit);

    if (index >= 0) {
      console.log( this.data.listEmails[index] );
      if( this.data.listEmails[index].id ) await this.ProcesoEliminarNumero( index );
      this.data.listEmails.splice(index, 1);
    }
  }

  async ProcesoEliminarNumero( index ){
    return new Promise( resolve =>{
      let filtro:any = this.listCompletaNumeroGr.find(( item:any ) => item.id == this.data.listEmails[ index ].id );
      if( !filtro ) return false;
      if( filtro.numerosPendientes ) filtro.numerosPendientes = filtro.numerosPendientes.filter( ( item:any )=> item.telefono !== this.data.listEmails[ index ].telefono );
      if( filtro.numerosCompletados ) filtro.numerosCompletados = filtro.numerosCompletados.filter( ( item:any )=> item.telefono !== this.data.listEmails[ index ].telefono );
      let data:any = {
        id: filtro.id,
        numerosPendientes: filtro.numerosPendientes,
        numerosCompletados: filtro.numerosCompletados
      };
      this._mensajes.editarMensajeNumero( data ).subscribe(( res:any )=> { this._tools.tooast( { title: "Borrado"}); resolve( true ); }, ()=> { this._tools.tooast( { title: 'Error', icon: "error"}); resolve( false );});
    });
  }

  codigo(){
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
  }

  agregarMasRotador(){
    if( !this.data.listRotador ) this.data.listRotador = [ { files: [] }];
    this.data.listRotador.push({
      id: this.codigo(),
      files: []
    });
  }

  eliminarMensajes( item:any ){
    this.data.listRotador = this.data.listRotador.filter( ( row:any ) => row.id != item.id );
    this.nexProceso();
  }

  guardarMensajes(){
    if( !this.id ) return false;
    if( this.btnDisabled ) return false;
    this.btnDisabled = true;
    this.nexProceso();
  }

  nexProceso(){
    let data:any = {
      id: this.data.id,
      listRotador: this.data.listRotador.filter(( item:any ) => item.mensajes )
    };
    if( !data.id ) { this.btnDisabled = false; return false; }
    for( let item of this.data.listRotador ) item.files = [];
    this._mensajes.editar( data ).subscribe(( res:any )=>{
      this._tools.presentToast( 'Actualizado rotador mensajes...' );
      this.btnDisabled = false;
    },(error)=>{ this._tools.presentToast( 'Error al actualizar...' ); this.btnDisabled = false; });
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) return false;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.excelSrv.importFromFile(bstr);
      const importedData = data.slice(1, -1);
      console.log( "esto es",importedData );
      this.counstNumero = importedData.length
      let lista:any = [];
      for( let row of importedData ){
        if( !row[1] ) continue;
        lista.push( {
          username: row[0] || " ",
          telefono: row[1]
        });
      }
      this.trasnFormVer( lista );
    };
    reader.readAsBinaryString(target.files[0]);
  }
  trasnFormVer( lista:any ){
      for(let row of lista) {
        let filtro = this.data.listEmails.find( ( item:any ) => item.telefono == row.telefono );
        if( !filtro ) this.data.listEmails.push( { username: row.username, telefono: row.telefono } );
      }
  }

  pushImg( item:any ){
    if( !item.galeriaList ) item.galeriaList = [];
    item.galeriaList.push( { id: this._tools.codigo() } )
  }

  eliminarFoto( item:any, id:any ){
    //console.log( item, id )
    item.galeriaList = item.galeriaList.filter( ( row:any ) => row.id != id );
    this.nexProceso();
  }

  updateImgList( item:any ){
    this.nexProceso();
  }

  onSelects(event: any, item:any ): void {
    //console.log( event );
    item.files= event.addedFiles;
  }

  async subirFile( item:any ) {
    return new Promise( async ( resolve ) =>{
      for( let row of item.files ){
        let form: any = new FormData();
        form.append('file', row );
        //this._tools.ProcessTime({});
        //console.log( form, this.files )
        if( !item.galeriaList ) item.galeriaList = [];
        let resultFile = await this.createFile( form );
        if( !resultFile ) continue;
        item.galeriaList.push( { id: this._tools.codigo(), foto: resultFile } );
        this.nexProceso();
      }
      item.files = [];
      resolve( true );
    });
  }

  createFile( form:any ){
    return new Promise( resolve =>{
      this._archivos.create( form ).subscribe((res: any) => {
        //console.log(res);
        this._tools.presentToast("Exitoso");
        resolve( res.files );
      }, (error) => { console.error(error); this._tools.presentToast("Error de servidor"); resolve( false ); });
    });
  }

  onRemoves( event:any, item:any ) {
    //console.log(event);
    item.files.splice( item.files.indexOf( event ), 1 );
  }

  onScroll(){
    console.log("*************Men")
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.cargarTodos();
     }
   }

   cargarTodos() {
    return new Promise( resolve =>{
      this.spinner.show();
      this.query.where.user = this.dataUser.id;
      this._galeria.get(this.query)
      .subscribe(
        (response: any) => {
          this.coint= response.count;
          this.dataTable.headerRow = this.dataTable.headerRow;
          this.dataTable.footerRow = this.dataTable.footerRow;
          this.dataTable.dataRows.push(... response.data);
          this.dataTable.dataRows =_.unionBy(this.dataTable.dataRows || [], response.data, 'id');
          this.loader = false;
            this.spinner.hide();

            if (response.data.length === 0 ) {
              this.notEmptyPost =  false;
            }
            this.notscrolly = true;
            resolve( true );
        },
        error => {
          console.log('Error', error);
          this.loader = false;
          resolve( false );
        });
    });
   }

   seleccion( item:any ){
    console.log("**", item )
    if( !item ) return;
    for(let row of this.dataTable.dataRows ) row['check'] = false;
    item.check = !item.check;
    this.data.listRotador2 = item.id;
   }


}


export class Contact {
  name: string = "";
  email: string = "";
  phone: string = "";
  address: string = "";
}

/*
                                                    <div class="row form-group col-12" *ngIf="data.rotadorMensajes">
                                                        <button type="button" class="btn btn-primary" (click)="agregarMasRotador()">Agregar Mas</button>
                                                        <ul class="list-group">
                                                            <li class="list-group-item" *ngFor="let item of data.listRotador; let i=index;">
                                                                <h1>Mensaje: {{ i }}</h1>
                                                                <!--<button type="button" class="btn btn-success" (click)="pushImg( item )" >Agregar Mas Imagen</button>-->
                                                                <br>
                                                                <div>
                                                                    <ngx-dropzone (change)="onSelects($event, item); subirFile( item )">
                                                                        <ngx-dropzone-label>Subir Fotos</ngx-dropzone-label>
                                                                        <ngx-dropzone-image-preview ngProjectAs="ngx-dropzone-preview" *ngFor="let f of item.files" [file]="f"
                                                                            [removable]="true" (removed)="onRemoves(f, item)" multiple="true" accept="image/jpeg,image/jpg,image/png"
                                                                            maxFileSize="1500000">
                                                                            <ngx-dropzone-label>{{ f.name }} ({{ f.type }})</ngx-dropzone-label>
                                                                        </ngx-dropzone-image-preview>
                                                                    </ngx-dropzone>
                                                                </div>
                                                                <ul *ngIf="item.galeriaList">
                                                                    <li *ngFor="let key of item.galeriaList">
                                                                        <img style="width: 155px; border-radius: 20px;" [src]="key.foto" alt="">
                                                                        <!--<input type="text" aria-label="..." [(ngModel)]="key.foto" (change)="updateImgList( key )">-->
                                                                        <button type="button" class="btn btn-danger" (click)="eliminarFoto( item, key.id )" >Eliminar Foto</button>
                                                                    </li>
                                                                </ul>
                                                                <textarea class="form-control" [(ngModel)]="item.mensajes" rows="4" placeholder="Mensajes...."></textarea>
                                                                <button type="button" class="btn btn-danger" (click)="eliminarMensajes( item )" >Eliminar Mensajes</button>
                                                            </li>
                                                            <li class="list-group-item">
                                                                <button type="button" class="btn btn-primary" (click)="agregarMasRotador()">Agregar Mas</button>
                                                                <button type="button" class="btn btn-success" (click)="guardarMensajes()" *ngIf="data.id">Guardar Mensajes</button>
                                                            </li>
                                                        </ul>
                                                    </div>*/
