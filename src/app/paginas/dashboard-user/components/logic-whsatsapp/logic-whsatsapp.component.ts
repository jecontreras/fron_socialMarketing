import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { USER } from 'src/app/interfaces/user';
import { LogicWhatsappService } from 'src/app/services-components/logic-whatsapp.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[][];
}

@Component({
  selector: 'app-logic-whsatsapp',
  templateUrl: './logic-whsatsapp.component.html',
  styleUrls: ['./logic-whsatsapp.component.scss']
})
export class LogicWhsatsappComponent implements OnInit {
  dataTable: DataTable;
  pagina = 10;
  paginas = 0;
  loader:boolean = false;
  query:any = {
    where:{
      estado: 0
    },
    sort: "createdAt DESC",
    page: 0
  };
  Header:any = [ 'Acciones','Nombre Tienda Whatsapp','Numero','Estado', 'Creado' ];
  $:any;
  public datoBusqueda = '';

  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  coint:number;
  btnDisabled:boolean = false;
  dataUser: USER;

  constructor(
    private spinner: NgxSpinnerService,
    private _tools: ToolsService,
    private Router: Router,
    private _store: Store<APPINT>,
    private _logicWhatsapp: LogicWhatsappService
  ) {
    this._store.subscribe((store: any) => {
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
  async delete(obj:any){
    let data = {
      id: obj.id,
      detalle:{
        id: obj.id,
        estado: 1
      },
      listDetails: []
    };
    return new Promise(resolve=>{
      this._logicWhatsapp.editar(data).subscribe((res:any)=>{
        this.dataTable.dataRows = this.dataTable.dataRows.filter( (row:any) => row.id !== obj.id );
        this._tools.presentToast("Eliminado");
        resolve(true);
      },(error)=>{console.error(error); this._tools.presentToast("Error de servidor"); resolve(false) })
    })
  }

  async procesoDelete(){
    let confirm = await this._tools.confirm( {title:"Eliminar", detalle:"Deseas Eliminar Dato", confir:"Si Eliminar"} );
    if(!confirm.value) return false;
    this.btnDisabled = true;
    for(let row of this.dataTable.dataRows ) if( row['checks'] ) await this.delete( row );
    this.btnDisabled = false;
  }

  editar(obj:any){
    this.Router.navigate(['/dashboard/logicWhsatsappform', obj.id]);
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
     this.query.where.user = this.dataUser.id;
     this._logicWhatsapp.get(this.query)
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
         this.loader = false;
       });
   }
   buscar() {
    this.loader = true;
    this.notscrolly = true
    this.notEmptyPost = true;
    //console.log(this.datoBusqueda);
    this.datoBusqueda = this.datoBusqueda.trim();
    this.dataTable.dataRows = [];
    this.query = { where:{ estado: 0 }, page: 0 };
    if (this.datoBusqueda !== '') {
      this.query.page = 0;
      this.query.where.or = [
        {
          titulo: {
            contains: this.datoBusqueda|| ''
          }
        },
        {
          numero: {
            contains: this.datoBusqueda|| ''
          }
        }
      ];
    }
    this.cargarTodos();
  }

}
