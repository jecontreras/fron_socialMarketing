import { Component, OnInit } from '@angular/core';
import { USER } from 'src/app/interfaces/user';

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
      estado: 0,
      tipoEnvio: [ 0,1 ]
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

  constructor() { }

  ngOnInit() {
  }

}
