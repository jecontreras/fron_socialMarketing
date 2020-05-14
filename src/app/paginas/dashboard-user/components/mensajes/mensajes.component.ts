import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services-components/mensajes.service';
import { ToolsService } from 'src/app/services/tools.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as _ from 'lodash';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[][];
}

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

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
  Header:any = [ 'Acciones','Mensaje de','Para de','Mandado','Mensaje','Oferta','Estado', 'Creado' ];
  $:any;
  public datoBusqueda = '';

  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  coint:number;
  btnDisabled:boolean = false;
  constructor(
    private _mensajes: MensajesService,
    private spinner: NgxSpinnerService,
    private _tools: ToolsService,
    private Router: Router
  ) { }

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
      estado: 1
    };
    return new Promise(resolve=>{
      this._mensajes.editar(data).subscribe((res:any)=>{
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
    this.Router.navigate(['/dashboard/mensajesform', obj.id]);
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
     this._mensajes.get(this.query)
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
    if (this.datoBusqueda === '') {
      this.query = {where:{},page: 0};
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

}
