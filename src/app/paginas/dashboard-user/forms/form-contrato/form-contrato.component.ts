import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/services-components/pais.service';
import { ContratoService } from 'src/app/services-components/contrato.service';
import { error } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from 'src/app/services-components/facturas.service';
import { ArchivosService } from 'src/app/services-components/archivos.service';
import { ToolsService } from 'src/app/services/tools.service';
declare const moment;

@Component({
  selector: 'app-form-contrato',
  templateUrl: './form-contrato.component.html',
  styleUrls: ['./form-contrato.component.scss']
})
export class FormContratoComponent implements OnInit {

  data:any = {
    usuario:{}, 
    detalle:{},
    contrato:{
      empresaApp: "5e3b9537a61c0523e4c514db"
    }
  };
  list_detalle:any = ["credito", "contado"];
  list_estados:any = ["activo", "finalizo", "eliminado", "cancelado"];
  list_pais:any = [];
  titulo:any = "Crear";
  id:any = "";
  clon:any = {};
  list_facturas:any = [];
  files: File[] = [];
  list_files:any = [];

  constructor(
    private _pais: PaisService,
    private _contrato: ContratoService,
    private activate: ActivatedRoute,
    private _facturas: FacturasService,
    private router: Router,
    private _archivos: ArchivosService,
    private _tools: ToolsService

  ) { 
    this.id = (this.activate.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.cargarPais();
    if(this.id) { this.titulo = 'Editar';this.getContrato(); this.getFacturas(); this.getArchivos()}
  }
  getContrato(){
    this._contrato.get({where:{id: this.id}}).subscribe(res=>{
      let dataRes:any = res['data'][0];
      this.clon = res['data'][0];
      this.data = this.DataFormat(dataRes);
      //console.log(res, this.data);
    },error=>this._tools.error({mensaje: 'Error de Consula', footer: 'Problemas con el Servidor'}));
  }
  getFacturas(){
    this._facturas.get({where:{idContrato: this.id}, populate: 'idContrato'}).subscribe(res=>this.list_facturas = res['data'], error=>this._tools.error({mensaje: 'Error de Consula', footer: 'Problemas con el Servidor'}));
  }
  getArchivos(){
    this._archivos.get({where:{contrato: this.id}}).subscribe((res:any)=>this.DataFormArchivo(res.data), error=>this._tools.error({mensaje: 'Error de Consula', footer: 'Problemas con el Servidor'}));
  }
  cargarPais(){
    this._pais.get({}).subscribe((res)=>this.list_pais=res.data,(error)=>this._tools.error({mensaje: 'Error de Consula', footer: 'Problemas con el Servidor'}));
  }
  verFactura(obj:any, tipo:any){
    //console.log(obj);
    if(tipo === 'pdf'){

    }else{
      this.router.navigate(['/dashboard/facturasform', obj.id]);
    }
  }
  submitContrato(){
    //console.log(this.data);
    this.data.contrato.pais = this.data.usuario.pais;
    this._contrato.saved(this.data).subscribe((rta:any)=>{this.id = rta.id; this._tools.tooast({title:'Agregado'}); },error=>this._tools.error({mensaje: 'Error de Consula', footer: 'Problemas con el Servidor'}));
  }
  editarContrato(){
    let data:any = {id: this.id};
    //console.log(this.clon, this.data);
    if(this.clon.estado !== this.data.contrato.estado) data.estado = this.data.contrato.estado;
    if(this.clon.detalle !== this.data.contrato.detalle) data.detalle =  this.data.contrato.detalle;
    //console.log(data, "Terminar Avertencia");
    if(data.estado){
      this._tools.confirm({title: 'Editar Estado del Contrato', detalle: 'Esta Seguro de Cambiar el estado!', confir: 'Si Editar'}).then((rta:any)=>{
        //console.log(rta);
        if(!rta.value) return false;
        this._contrato.editar(data).subscribe(rta=>{this._tools.tooast({title:'Editado'});}, error=>this._tools.error({mensaje: 'Error de Consula', footer: 'Problemas con el Servidor'}));
      });
    }else{
      this._contrato.editar(data).subscribe(rta=>{this._tools.tooast({title:'Editado'});}, error=>this._tools.error({mensaje: 'Error de Consula', footer: 'Problemas con el Servidor'}));
    }
  }
  onSelect(event) {
    //console.log(event, this.files);
    this.files.push(...event.addedFiles);
  }
   
  onRemove(event) {
    //console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
  async subirArchivos(){
    let archivos:any = [];
    this._tools.ProcessTime({title: 'Cargando Archivos'});
    for(let row of this.files){
      let result = await this._archivos.getBase64(row);
      archivos.push({
        contrato: this.id,
        name: row.name,
        type: row.type,
        size: row.size,
        url: result
      });
    }
    this._archivos.saved({archivos: archivos}).subscribe(res=>{this.DataFormArchivo(res.data); this.files=[];}, error=>this._tools.error({mensaje: 'Error de Consula', footer: 'Problemas con el Servidor'}));
    //console.log(archivos);
  }
  DataFormArchivo(res){
    //console.log(res);
    this.list_files.push( ...res );
    this.list_files = this._archivos.iframe(this.list_files);
  }
  VerArchivo( obj:any ){
   this._archivos.verArchivo(obj);
  }
  DeleteArchivo( obj:any, idx:any ){
    //console.log(obj);
    this._tools.confirm({title: 'Eliminar Elemento', detalle: 'Esta Seguro de Eliminarlo!', confir: 'Si Eliminar'}).then((rta:any)=>{
      //console.log(rta);
      if(!rta.value) return false;
      this._archivos.delete(obj).subscribe((res:any)=>{this.list_files.splice(idx,1); this._tools.tooast({title: 'Eliminado Exitoso!'})}, error=>this._tools.error({mensaje: 'Error de Consula', footer: 'Problemas con el Servidor'}))
    });
  }
  DataFormat(obj:any){
    let user: any = obj['user'];
    let detalle: any = obj['detalleContrato'];
    this.data = {
      usuario:{
        "nombre": user.nombre,
        "email": user.email,
        "numero": user.numero,
        "cedula": user.cedula,
        "direccion": user.direccion,
        "pais": user.pais
      },
      detalle:{
        "tipo": detalle.tipo == 'acredito' ? 'credito' : 'contado',
        "meses": detalle.meses,
        "valorTotal": detalle.valorTotal,
        "valorIva": detalle.valorIva,
        "empiezasPagar": moment(detalle.empiezasPagar).format('YYYY-MM-DD'),
        "diasHabilesCorte": detalle.diasHabilesCorte
      },
      contrato:{
        "detalle":obj.detalle,
        "estado":obj.estado,
        "valorApagar": obj.valorApagar,
        "pais": obj.pais.pais,
        "empresaApp": obj.empresaApp.titulo
      }
    };
    return this.data;
  }

}
