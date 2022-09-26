import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { ArchivosService } from 'src/app/services-components/archivos.service';
import { GaleriaService } from 'src/app/services-components/galeria.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-form-galeria',
  templateUrl: './form-galeria.component.html',
  styleUrls: ['./form-galeria.component.scss']
})
export class FormGaleriaComponent implements OnInit {

  id:any;
  titulo:string = "Detallado";
  data:any = {
    listRotador: [],
  };
  editorConfig: any;
  listPlataforma:any = [];
  dataUser:any = {};
  btnDisabled:boolean = false;
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  intervalo:any;

  listNumerosGr = [];
  listCompletaNumeroGr = [];
  files:any = [];
  listDePlataforma:any = [];
  counstNumero:number = 0;

  constructor(
    private activate: ActivatedRoute,
    private _store: Store<APPINT>,
    private _tools: ToolsService,
    public dialog: MatDialog,
    private _archivos: ArchivosService,
    private _galeria: GaleriaService
  ) { 
    this._store.subscribe((store: any) => {
      store = store.name;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    this.agregarMasRotador();
  }

  ngOnDestroy(){
    clearInterval( this.intervalo );
  }

  submit(){

  }

  agregarMasRotador(){
    if( !this.data.listRotador ) this.data.listRotador = [ { files: [] }];
    this.data.listRotador.push({
      id: this._tools.codigo(),
      files: []
    });
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

  eliminarFoto( item:any, id:any ){
    //console.log( item, id )
    item.galeriaList = item.galeriaList.filter( ( row:any ) => row.id != id );
  }

  eliminarMensajes( item:any ){
    this.data.listRotador = this.data.listRotador.filter( ( row:any ) => row.id != item.id );
  }

  guardarMensajes(){
    if( !this.id ) return false;
    if( this.btnDisabled ) return false;
    this.btnDisabled = true;
  }

  nexProceso(){
    let data:any = {
      id: this.data.id,
      listRotador: this.data.listRotador.filter(( item:any ) => item.mensajes )
    };
    if( !data.id ) { this.btnDisabled = false; return false; }
    for( let item of this.data.listRotador ) item.files = [];
    this._galeria.editar( data ).subscribe(( res:any )=>{
      this._tools.presentToast( 'Actualizado rotador mensajes...' );
      this.btnDisabled = false;
    },(error)=>{ this._tools.presentToast( 'Error al actualizar...' ); this.btnDisabled = false; });
  }


}


export class Contact {
  name: string = "";
  email: string = "";
  phone: string = "";
  address: string = "";
}
