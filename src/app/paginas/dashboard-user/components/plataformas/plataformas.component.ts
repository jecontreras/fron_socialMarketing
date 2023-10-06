import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlataformaService } from 'src/app/services-components/plataforma.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { Store } from '@ngrx/store';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[][];
}

@Component({
  selector: 'app-plataformas',
  templateUrl: './plataformas.component.html',
  styleUrls: ['./plataformas.component.scss']
})
export class PlataformasComponent implements OnInit {

  dataTable: DataTable;
  pagina = 10;
  paginas = 0;
  loader = true;
  query:any = {
    where:{
      estado: 0
    },
    sort: "createdAt DESC",
    page: 0
  };
  Header:any = [ 'Acciones','Titulo','Nit','urlRespuesta','UrlConfirmacion','Fecha Registro','Estado' ];
  $:any;
  public datoBusqueda = '';

  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  coint:number;
  btnDisabled:boolean = false;
  dataUser:any = {};

  constructor(
    private spinner: NgxSpinnerService,
    private _tools: ToolsService,
    private Router: Router,
    private _plataforma: PlataformaService,
    private _store: Store<APPINT>,
  ) {

    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      this.dataUser = store.user;
    });

  }

  ngOnInit() {
    this.dataTable = {
      headerRow: this.Header,
      footerRow: this.Header,
      dataRows: []
    };
    this.cargarTodos();
  }

  crear(obj:any){

  }
  editar(obj:any){
    this.Router.navigate(['/dashboard/plataformaform', obj.id]);
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.cargarTodos();
     }
   }

   cargarTodos() {
     this.spinner.show();
     if( this.dataUser.rol !== '6520612bf48bb70d888bffe3' ) this.query.where.id = "6456728a45ce5d0014db2870";
     this._plataforma.get(this.query)
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
       },
       error => {
         console.log('Error', error);
       });
   }
  buscar() {
    this.loader = false;
    this.notscrolly = true
    this.notEmptyPost = true;
    //console.log(this.datoBusqueda);
    this.datoBusqueda = this.datoBusqueda.trim();
    this.dataTable.dataRows = [];
    if (this.datoBusqueda === '') {
      this.query = {where:{ estado:0 },page: 0};
      this.cargarTodos();
    } else {
      this.query.page = 0;
      this.query.where.or = [
        {
          nombre: {
            contains: this.datoBusqueda|| ''
          }
        },
        {
          email: {
            contains: this.datoBusqueda|| ''
          }
        },
        {
          apellido: {
            contains: this.datoBusqueda|| ''
          }
        },
        {
          celular: {
            contains: this.datoBusqueda|| ''
          }
        },
      ];
      this.cargarTodos();
    }
  }

  async procesoDelete(){
    let confirm = await this._tools.confirm( {title:"Eliminar", detalle:"Deseas Eliminar Dato", confir:"Si Eliminar"} );
    if(!confirm.value) return false;
    this.btnDisabled = true;
    for(let row of this.dataTable.dataRows ) if( row['checks'] ) await this.delete( row );
    this.btnDisabled = false;
  }


  async delete(obj:any){
    let data = {
      id: obj.id,
      estado: 1
    };
    return new Promise(resolve=>{
      //return resolve( true )
      this._plataforma.editar( data ).subscribe( (res:any)=>{
        this.dataTable.dataRows = this.dataTable.dataRows.filter( (row:any) => row.id !== obj.id );
        this._tools.presentToast("Eliminado");
        resolve(true);
      },(error)=>{console.error(error); this._tools.presentToast("Error de servidor"); resolve(false) })
    });
  }

}
