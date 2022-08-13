import { Component, OnInit, Inject } from '@angular/core';
import { UsuariosService } from 'src/app/services-components/usuarios.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit {

  data:any = {};
  btnDisabled:boolean = false;
  id:any;
  titulo:any =  "Lista de";
  query:any = {
    where:{},
    page: 0,
    limit: 1000000
  };
  listRow:any = [];
  listSeleccion:any = [];
  count:Number = 0;
  urlPlataforma:string = "";
  datoBusqueda:string = "";
  loader:boolean = false;

  constructor(
    private _user: UsuariosService,
    private _tools: ToolsService,
    public dialogRef: MatDialogRef<FormUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    if(Object.keys(this.datas).length > 0) {
      console.log(this.datas);
      this.id = this.datas;
      this.urlPlataforma = this.id.urlConfirmacion;
      this.getUser();
    }
  }
  
  pageEvent(ev:any){
    console.log(ev);
    this.query.page = ev.pageIndex;
    this.query.limit = ev.pageSize;
    this.getUser();
  }

  getUser(){
    this.loader = true;
    // this.spinner.show();
    this._user.getPlataforma( this.urlPlataforma, this.query ).subscribe((res:any)=>{
      console.log(res);
      res.data = this.formatos(res.data);
      this.listRow.push(... res.data );
      this.listRow = _.unionBy(this.listRow || [], res.data, 'id');
      this.count = res.count || 3000;
      // this.spinner.hide();
      this.loader = false;
    });
  }

  formatos( res:any ){
    return _.map(res, (row:any)=>{
      if( this.id.slug === "publihazclick" ){
        return {
          usu_nombre: row.name,
          usu_email: row.email,
          usu_imagen: row.foto,
          usu_telefono: "57"+row.celular,
          ...row
        };
      }else if( this.id.slug == "rocketfy"){
        return {
          usu_nombre:  row.cliente,
          usu_email: row.email,
          usu_telefono:  "57"+row.telefono,
          ... row
        };
      }
      else{
        return {
          ...row,
          usu_telefono: `${ ( row.usu_indicativo || 57 ) }${ row.usu_telefono }`
        };
      }
    });
  }

  buscar() {
    //console.log(this.datoBusqueda);
    this.datoBusqueda = this.datoBusqueda.trim();
    this.listRow = [];
    this.query = { where:{ } ,page: 0, limit: 10 };
    if (this.datoBusqueda !== '') {
      if( this.id.slug === "publihazclick" ) this.query.where.or = [
        {
          name: {
            contains: this.datoBusqueda|| ''
          }
        },
        {
          email: {
            contains: this.datoBusqueda|| ''
          }
        },
        {
          lastname: {
            contains: this.datoBusqueda|| ''
          }
        }
      ];
      else this.query.where.or = [
        {
          usu_nombre: {
            contains: this.datoBusqueda|| ''
          }
        },
        {
          usu_email: {
            contains: this.datoBusqueda|| ''
          }
        },
        {
          usu_apellido: {
            contains: this.datoBusqueda|| ''
          }
        }
      ];
    }
    this.getUser();
  }

  select( item:any ){
    item.check=!item.check;
    console.log("***", item)
    if( item.check ) this.listSeleccion.push( { id: item.id, nombre: item.usu_nombre, usu_email: item.usu_email, usu_telefono: item.usu_telefono } );
    else this.listSeleccion = this.listSeleccion.filter( ( row:any )=> row.id !== item.id );
  }

  seleccionarTodos(){
    for(let row of this.listRow) {
      row.check=!row.check;
      this.listSeleccion.push( { id: row.id, nombre: row.usu_nombre, usu_email: row.usu_email, usu_telefono: row.usu_telefono} );
    }
    this.listSeleccion = _.unionBy(this.listSeleccion || [], this.listSeleccion, 'id');
  }

  seleccionados(){
    this.dialogRef.close( this.listSeleccion );
  }

}
