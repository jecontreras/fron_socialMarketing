import { Component, OnInit } from '@angular/core';
import { PlataformaService } from 'src/app/services-components/plataforma.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioPlataformaService } from 'src/app/services-components/usuario-plataforma.service';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[][];
}

@Component({
  selector: 'app-form-plataformas',
  templateUrl: './form-plataformas.component.html',
  styleUrls: ['./form-plataformas.component.scss']
})
export class FormPlataformasComponent implements OnInit {
  
  id:any = "";
  data:any = {};
  btnDisabled:boolean = false;
  titulo:string = "Crear Plataforma";
  dataTable: DataTable;
  dataTable2: DataTable;
  pagina = 10;
  paginas = 0;
  loader = true;
  query:any = {
    where:{},
    sort: "createdAt DESC",
    page: 0
  };
  Header:any = ["Fotos",'Nombre','Celular','Email','Fecha Registro' ];
  $:any;
  public datoBusqueda = '';

  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  coint:number;


  constructor(
    private _plataforma: PlataformaService,
    private _tools: ToolsService,
    private activate: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private Router: Router,
    private _usuarioPlataforma: UsuarioPlataformaService
  ) { }

  ngOnInit() {
    this.dataTable = {
      headerRow: this.Header,
      footerRow: this.Header,
      dataRows: []
    };
    this.dataTable2 = {
      headerRow: this.Header,
      footerRow: this.Header,
      dataRows: []
    };
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id) {
      this.titulo = "Editar Plataforma";
      this.getRow();
      this.query.where.plataforma = this.id;
      this.cargarTodos();
      //this.cargarTodos2();
    }
  }

  getRow(){
    this._plataforma.get( { where: { id: this.id } } ).subscribe( ( res:any )=>{
      res = res.data[0];
      if( !res ) return false;
      this.data = res;
    })
  }

  actualizar(){
    this.btnDisabled=true;
    let data = _.omit( this.data, ['empresa', 'creado', 'createdAt', 'updatedAt', 'listEmails']);
    data = _.omitBy( data, _.isNull);
    this._plataforma.editar( data ).subscribe((res:any)=>{
      this._tools.presentToast("Whatsapp Actualizado");
      this.btnDisabled=false;
    },(error)=> { this._tools.presentToast("Error en el Actualizado"); this.btnDisabled=false;})
  }

  enviar(){
    this.btnDisabled = true;
    this.data.slug = this._tools.transSlug( this.data.titulo );
    this._plataforma.saved( this.data ).subscribe( ( res:any )=>{
      this._tools.presentToast("Plataforma creada...");
      this.id = res.id;
      this.data.id = res.id;
      this.btnDisabled = false;
    },( error )=> { this._tools.presentToast("Error al crear la plataforma..."); this.btnDisabled = false; });
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
     this._usuarioPlataforma.get( this.query )
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
}