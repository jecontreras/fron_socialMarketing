import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/services-components/pais.service';
import { ContratoService } from 'src/app/services-components/contrato.service';
import { error } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from 'src/app/services-components/facturas.service';
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

  constructor(
    private _pais: PaisService,
    private _contrato: ContratoService,
    private activate: ActivatedRoute,
    private _facturas: FacturasService,
    private router: Router

  ) { 
    this.id = (this.activate.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.cargarPais();
    if(this.id) { this.titulo = 'Editar';this.getContrato(); this.getFacturas()}
  }
  getContrato(){
    this._contrato.get({where:{id: this.id}}).subscribe(res=>{
      let dataRes:any = res['data'][0];
      this.clon = res['data'][0];
      this.data = this.DataFormat(dataRes);
      console.log(res, this.data);
    },error=>console.error(error));
  }
  getFacturas(){
    this._facturas.get({where:{idContrato: this.id}, populate: 'idContrato'}).subscribe(res=>this.list_facturas = res['data'], error=>console.error(error));
  }
  cargarPais(){
    this._pais.get({}).subscribe((res)=>this.list_pais=res.data,(error)=>console.error(error));
  }
  verFactura(obj:any, tipo:any){
    console.log(obj);
    if(tipo === 'pdf'){

    }else{
      this.router.navigate(['/dashboard/facturasform', obj.id]);
    }
  }
  submitContrato(){
    console.log(this.data);
    this.data.contrato.pais = this.data.usuario.pais;
    this._contrato.saved(this.data).subscribe(rta=>console.log(rta),error=>console.error(error));
  }
  editarContrato(){
    let data:any = {id: this.id};
    //console.log(this.clon, this.data);
    if(this.clon.estado !== this.data.contrato.estado) data.estado = this.data.contrato.estado;
    if(this.clon.detalle !== this.data.contrato.detalle) data.detalle =  this.data.contrato.detalle;
    console.log(data, "Terminar Avertencia");
    if(data.estado){

    }
    this._contrato.editar(data).subscribe(rta=>console.log(rta), error=>console.error(error));
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
