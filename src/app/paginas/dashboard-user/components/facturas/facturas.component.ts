import { Component, OnInit } from '@angular/core';
import { FactoryModelsService } from 'src/app/services/factory-models.service';
import { ContratoService } from 'src/app/services-components/contrato.service';
import { FacturasService } from 'src/app/services-components/facturas.service';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[][];
}

declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  public dataTable: DataTable;
  public totalUsuarios = 0;
  public loader = true;
  public loaderBotones = false;
  public loadPuntos = false;
  public datoBusqueda = '';
  public query:any = {
    where:{},
    populate: 'idContrato',
    skip: 0,
  };
  public Headers:any = ['Acciones', 'Numero Factura', 'Contrato Codigo', 'Factura Generada', 'Facturas Atrasadas', 'Precio Total', 'Estado', 'Fecha Pagada'];

  constructor(
    private _factura: FacturasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarTodos();
  }

  cargarTodos() {
    this._factura.get(this.query).subscribe(
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

    /* // Edit record
    table.on('click', '.edit', function (e) {
      let $tr = $(this).closest('tr');
      if ($($tr).hasClass('child')) {
        $tr = $tr.prev('.parent');
      }
      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
      e.preventDefault();
    }); */

    /* // Delete a record
    table.on('click', '.remove', function (e) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    }); */

    //Like record
    table.on('click', '.like', function (e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }
  
  verFactura(obj:any, tipo:any){
    console.log(obj);
    if(tipo === 'pdf'){

    }else{
      this.router.navigate(['/dashboard/facturasform', obj.id]);
    }
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
