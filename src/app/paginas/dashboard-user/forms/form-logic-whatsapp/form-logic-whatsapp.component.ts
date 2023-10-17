import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { LogicWhatsappService } from 'src/app/services-components/logic-whatsapp.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { GaleriaService } from 'src/app/services-components/galeria.service';
import { WhatsappInfoService } from 'src/app/services-components/whatsapp-info.service';

@Component({
  selector: 'app-form-logic-whatsapp',
  templateUrl: './form-logic-whatsapp.component.html',
  styleUrls: ['./form-logic-whatsapp.component.scss']
})
export class FormLogicWhatsappComponent implements OnInit {
  data:any = {

  };
  titulo:string="Crear"
  listLogic:any = [
    {
      indicador: "He visto esto en Facebook",
      urlMedios: "",
      respuesta: `¡Hola Buen Día! Bienvenidos a la Tienda Virtual @liam_stilos
        01. Ver catalogó!
        02. Hacer pedido!
        03. ¡Chatear con un asesor!
        00. Volver al menú principal!
      `
    },
    {
      indicador: "hola",
      urlMedios: "",
      respuesta: `¡Hola Buen Día! Bienvenidos a la Tienda Virtual @liam_stilos
        01. Ver catalogó!
        02. Hacer pedido!
        03. ¡Chatear con un asesor!
        00. Volver al menú principal!
      `
    },
    {
      indicador: "1",
      urlMedios: "",
      respuesta: `
        4 *Ver Catalogo de Hombre*
        5 *Ver Catalogo de Mujer*
        6 *Ver Catalogo de Jean Hombre*
        7 *Ver Catalogo de Jean Mujer*
        0. *Volver al menú principal*
      `
    },
    {
      indicador: "2",
      urlMedios: "",
      respuesta: `
      *Para el proceso de hacer pedido los requisitos son*
      1. Foto o modelo del producto interesado?
      2. Ciudad de Destino?
      3. Nombre de la persona a recibir?
      4. Talla interesado?
      5. ¿Direccion a recibir?
      6. ¿Telefono de quien lo recibe?

      ¡Nota! Una vez nos manda toda la información nosotros nos encargamos del proceso de validación de tu pedido y en breve te mandaremos el número de guía.

 Recuerda que todos nuestros envíos son dé forma *Gratuita*

 ¡Gracias por tu compra y por preferirnos Feliz día!

      `
    },
    {
      indicador: "4",
      urlMedios: "64ae40b5802dc8001412ac05",
      respuesta: `
      *Para el proceso de hacer pedido los requisitos son*
                    1. Foto o modelo del producto interesado?
                    2. Ciudad de Destino?
                    3. Nombre de la persona a recibir?
                    4. Talla interesado?
                    5. ¿Direccion a recibir?
                    6. ¿Telefono de quien lo recibe?

                    ¡Nota! Una vez nos manda toda la información nosotros nos encargamos del proceso de validación de tu pedido y en breve te mandaremos el número de guía.
                    Recuerda que todos nuestros envíos son dé forma *Gratuita*
                    ¡Gracias por tu compra y por preferirnos Feliz día!
      `
    },
    {
      indicador: "5",
      urlMedios: "64af63db865a1300140ee306",
      respuesta: `
      *Para el proceso de hacer pedido los requisitos son*
                    1. Foto o modelo del producto interesado?
                    2. Ciudad de Destino?
                    3. Nombre de la persona a recibir?
                    4. Talla interesado?
                    5. ¿Direccion a recibir?
                    6. ¿Telefono de quien lo recibe?

                    ¡Nota! Una vez nos manda toda la información nosotros nos encargamos del proceso de validación de tu pedido y en breve te mandaremos el número de guía.
                    Recuerda que todos nuestros envíos son dé forma *Gratuita*
                    ¡Gracias por tu compra y por preferirnos Feliz día!
      `
    },
    {
      indicador: "5",
      urlMedios: "64af63db865a1300140ee306",
      respuesta: `
      *Para el proceso de hacer pedido los requisitos son*
                    1. Foto o modelo del producto interesado?
                    2. Ciudad de Destino?
                    3. Nombre de la persona a recibir?
                    4. Talla interesado?
                    5. ¿Direccion a recibir?
                    6. ¿Telefono de quien lo recibe?

                    ¡Nota! Una vez nos manda toda la información nosotros nos encargamos del proceso de validación de tu pedido y en breve te mandaremos el número de guía.
                    Recuerda que todos nuestros envíos son dé forma *Gratuita*
                    ¡Gracias por tu compra y por preferirnos Feliz día!
      `
    },
    {
      indicador: "He visto esto en Facebook",
      urlMedios: "",
      respuesta: `En Un Momento un Asesor se Comunica contigo..
      `
    },
  ];
  disableBtn:boolean = false;
  id:string;
  dataUser:any = {};
  listGaleria:any = [];
  listWhatsappInfo:any = [];

  constructor(
    private _logicWhatsapp: LogicWhatsappService,
    private _Tools: ToolsService,
    private Router: Router,
    private activate: ActivatedRoute,
    private _store: Store<APPINT>,
    private _galeria: GaleriaService,
    private _whatsappInfo: WhatsappInfoService
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      this.dataUser = store.user;
    });
  }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getId();
    this.getGaleria();
    this.getWhatsappInfo();
  }

  getId(){
    this.titulo = "actualizar"
    this._logicWhatsapp.get( { where: { id: this.id } } ).subscribe( res => {
      res = res.data[0];
      this.data = res;
      this.listLogic = res.listLogic;
      try {
        this.data.numero = res.numero.id;
      } catch (error) {

      }
    })
  }

  getGaleria(){
    this._galeria.get( { where: { user: this.dataUser.id }, limit: 100000 } ).subscribe( res => {
      this.listGaleria = res.data;
    });
  }

  getWhatsappInfo(){
    this._whatsappInfo.get( { where: { user: this.dataUser.id }, limit: 100000 } ).subscribe( res => {
      this.listWhatsappInfo = res.data;
    });
  }

  handleDropList(){
    this.listLogic = [];
  }


  handlePushList(){
    this.listLogic.push( { } );
  }

  handleDrop(item){
    this.handleUpdateDetails( item );
  }

  handleSubmit(){
    if( this.disableBtn ) return false;
    this.disableBtn = true;
    if( this.id ) this.handleUpdate();
    else this.handleCreate();
    this.disableBtn = false;
  }

  handleCreate(){
    return new Promise( resolve => {
      this.data.user = this.dataUser.id;
      this._logicWhatsapp.saved( {
        detalle: this.data,
        listDetails: this.listLogic
      }).subscribe( res =>{
        this._Tools.tooast( { title: "Creado logica Whatsapp"} );
        this.Router.navigate( ['/dashboard/logicWhsatsappform', res.id ] );
        resolve( true );
      },()=> resolve( false ) );
    })
  }

  handleUpdate(){
    return new Promise( resolve =>{
      let data = this.data;
      data = _.omit(data, [ 'listLogic','user' ])
      data = _.omitBy(data, _.isNull);
      this._logicWhatsapp.editar( {
        detalle: data,
        id: this.data.id,
        listDetails: this.listLogic
      }).subscribe( res =>{
        this._Tools.tooast( { title: "Autualizado logica Whatsapp"} );
        this.listLogic = res || [];
        resolve( true );
      }, ()=> resolve( false ) );
    });
  }

  handleUpdateDetails( item:any ){
    return new Promise( resolve =>{
      if( !item.id ) resolve( true );
      this._logicWhatsapp.updateWhatsappDetalle( {
        detalle: {
          estado: 1
        },
        id: item.id
      }).subscribe( res =>{
        this._Tools.tooast( { title: "Eliminado Item"} );
        resolve( true );
      }, ()=> resolve( false ) );
    });
  }

}
