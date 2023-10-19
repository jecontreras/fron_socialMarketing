import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { WhatsappInfoService } from 'src/app/services-components/whatsapp-info.service';
import { ToolsService } from 'src/app/services/tools.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _whatsapp: WhatsappInfoService,
    private _store: Store<APPINT>,
    private _tools: ToolsService
  ) {
    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      this.dataUser = store.user;
    });
  }

  showChatDetail(chat: any) {
    this.router.navigate(['/dashboard/chatWhatsapp', chat.id]);
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async(params) => {
      const chatId = params.get('id'); // Replace with your logic to get chat based on ID
      this.chat = {}
      this.chat = ( await this.getChatDetails(chatId) ) || {};
    });
    this.chats = await this.getWhatsapp( { where: { user: this.dataUser.id }} );
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
    console.log("**", listChat, ds)
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

    };
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
