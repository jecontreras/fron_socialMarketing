import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { WhatsappInfoService } from 'src/app/services-components/whatsapp-info.service';
import { ToolsService } from 'src/app/services/tools.service';
//import { Socket } from 'ngx-socket-io';
import * as _ from 'lodash';
@Component({
  selector: 'app-chat-whatsapp',
  templateUrl: './chat-whatsapp.component.html',
  styleUrls: ['./chat-whatsapp.component.scss']
})
export class ChatWhatsappComponent implements OnInit {

  // Chat data (replace with your data)
  chats:any= [];

  chat: any; // Placeholder for chat data
  newMessage: string;
  dataUser:any = {};
  btnDisabled:boolean = false;
  chatId:any;
  vandera:boolean = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _whatsapp: WhatsappInfoService,
    private _store: Store<APPINT>,
    private _tools: ToolsService,
    //private socket: Socket
  ) {
    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      this.dataUser = store.user;
    });
    /*socket.fromEvent('newMessage').subscribe((message) => {
      console.log("**37",message )
    });*/
  }

  showChatDetail(chat: any) {
    this.router.navigate(['/dashboard/chatWhatsapp', chat.id]);
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async(params) => {
      this.chatId = params.get('id'); // Replace with your logic to get chat based on ID
      this.chat = {}
      this.chat = ( await this.getChatDetails( this.chatId ) ) || {};
      window.document.scrollingElement.scrollTop=1000000000;
    });
    this.chats = await this.getWhatsapp( { where: { user: this.dataUser.id }} );
    if( this.vandera ){
      this.vandera = false;
      setInterval(async()=>{
        let newsData:any = await this.getWhatsapp( { where: { user: this.dataUser.id }} );
        for( let row of newsData ){
          let index = _.findIndex(this.chats, ['id', row.id]);
          if( index >= 0 ) this.chats[index].txt = row.txt;
          else this.chats.unshift( row );
        }
        if( this.chatId ){
          let newsData:any = await this.getChatDetails( this.chatId );
          for( let row of newsData.messages ){
            let index = _.findIndex(this.chat.messages, ['id', row.id]);
            if( index >= 0 ) this.chat['messages'][index].txt = row.txt;
            else {
              this.chat.messages.push( row );
              window.document.scrollingElement.scrollTop=1000000000;
            }
          }
        }
      }, 2000);
    }
  }


  getWhatsapp( querys ){
    return new Promise( resolve =>{
      this._whatsapp.getWhatsapp( querys ).subscribe( res =>{
         resolve( res.data || [] );
      });
    })
  }

  getWhatsappHistorial( querys ){
    return new Promise( resolve =>{
      this._whatsapp.getWhatsappHistorial( querys ).subscribe( res =>{
         resolve( res.data || [] );
      });
    })
  }

  async getChatDetails(chatId: string) {
    // Replace with your logic to get chat details based on chatId
    // Return an object with chat details
    let ds:any = await this.getWhatsapp( { where: { id: chatId }, limit: 1000000 } );
    if( !ds ) return {};
    ds = ds[0];
    let listChat = await this.getWhatsappHistorial( { where: { whatsappTxt: ds.id }, limit: 1000000 } );
    //console.log("**", listChat, ds)
    return {
      id: chatId,
      logo: ds.logo,
      name: ds.Sinfrom,
      lastSeen: ds.create,
      messages: listChat,
      to: ds.to,
      Sinto: ds.Sinto,
      from: ds.from,
      Sinfrom: ds.Sinfrom,
      numberGuide: ds.numberGuide,
      estado: ds.estado,
      trasport: ds.tipeGuide

    };
  }

  async handleopenAlertGuide(){
    let alert:any = await this._tools.alertInput( { title: "Numero de Guia ¡Sin punto ni comas!", input: "text", confirme: "Enviar" });
    console.log("******120", alert )
    alert = alert.value;
    let ds = {
      id: this.chat.id,
      numberGuide: alert,
      tipeGuide: "varios"
    };
    alert = await this._tools.alertInput( { title: "Que Plataforma se Envio!", input: "text", placeholder: "envia,interrapidisimo,servientrega,tcc,coordinadora", confirme: "Enviar" });
    console.log("******120", alert )
    ds.tipeGuide = alert.value;
    ds = _.omitBy(ds, _.isNull);
    let result:any = await this.handleUpdateChat( ds );
    if( result === false ) return this._tools.tooast( { title:"Error no podimos actualizar el numero de guia", icon: "error" } );
    this.newMessage = "Ok mira Tu Numero de Guia: " + ds.numberGuide + " Transportadora: " + ds.tipeGuide;
    this.sendMessage();
  }

  handleUpdateChat( data:any ){
    return new Promise( resolve =>{
      this._whatsapp.editarWhatsapp( data ).subscribe( res =>{
        resolve( res );
      },()=> resolve( false ) )
    })
  }

  sendMessage() {
    if( this.btnDisabled ) return false;
    this.btnDisabled = true;
    let cuerpo = {
      msx: {
        from: this.chat.to,
        to: this.chat.from,
        body: this.newMessage,
        urlMedios: "",
        quien: 1
      },
      user: this.dataUser
    };
    console.log("**", cuerpo, this.chat)
    this._whatsapp.sendChat( cuerpo ).subscribe( res=>{
      res = res.data;
      this.chat.messages.push( res.Whatsapphistorial );
      this.newMessage = '';
      this.btnDisabled = false;
      //this._tools.tooast( { title:"Mensaje Enviado", icon: "success" } );
    },()=> { this.btnDisabled = false; this._tools.tooast( { title:"Error con el servidor", icon: "error" } ); } );
  }

}
