import { Component, OnInit } from '@angular/core';
import { FactoryModelsService } from 'src/app/services/factory-models.service';
import { ContratoService } from 'src/app/services-components/contrato.service';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[][];
}

declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {

  public dataTable: DataTable;
  public totalUsuarios = 0;
  public loader = true;
  public loaderBotones = false;
  public loadPuntos = false;
  public datoBusqueda = '';
  public query:any = {
    where:{},
    skip: 0,
  };
  public Headers: any = ['Acciones', 'tipo', 'estado', 'Valor a Pagar', 'empresa', 'cliente', 'pais', 'creado'];

  constructor(
    private _contrato: ContratoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarTodos();
  }

  cargarTodos() {
    this._contrato.get(this.query).subscribe(
      (response: any) => {
        console.log(response);
        this.dataTable = {
          headerRow: this.Headers,
          footerRow: [],
          dataRows: []
        };
        this.dataTable.headerRow = this.dataTable.headerRow;
        this.dataTable.footerRow = this.dataTable.headerRow;
        this.dataTable.dataRows = response.data;
        this.totalUsuarios = response.count;
        this.loader = false;
        setTimeout(() => {
          this.config();
          console.log("se cumplio el intervalo");
        }, 500);
      },
      error => {
        console.log('Error', error);
      });
  }
  config() {
    if(!$('#datatables').DataTable) return false;
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      /*language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
      }*/

    });

    const table = $('#datatables').DataTable();

    //Like record
    table.on('click', '.like', function (e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }
  
  editartContrato(obj:any){
    console.log(obj);
    if(obj === 'pdf'){

    }else{
      this.router.navigate(['/dashboard/contratoform', obj.id]);
    }
  }

  eliminarContrato(obj:any){
    console.log(obj)
  }

  buscar() {
    this.loader = true;
    //console.log(this.datoBusqueda);
    this.datoBusqueda = this.datoBusqueda.trim();
    if (this.datoBusqueda === '') {
      this.cargarTodos();
    } else {
      this.query.where.or = [
        {
          codigo: {
            contains: this.datoBusqueda|| ''
          }
        }
      ];
      this.cargarTodos();
    }
  }


}
