import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from 'src/app/services-components/mensajes.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-form-mensajes',
  templateUrl: './form-mensajes.component.html',
  styleUrls: ['./form-mensajes.component.scss']
})
export class FormMensajesComponent implements OnInit {
  id:any;
  titulo:string = "Detallado";
  data:any = {};
  listChat:any = [];

  constructor(
    private activate: ActivatedRoute,
    private _mensajes: MensajesService,
    private _tools: ToolsService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) { this.titulo = "Editar"; this.getChat(); }
  }

  getChat(){
    this._mensajes.get( { where: { id: this.id }} ).subscribe((res:any)=>{
      res = res.data[0];
      if(!res) return this.Router.navigate(['/dashboard/mensajes']);
      this.data = res || {};
      this.getChatDetallado();
    },(error)=> this._tools.presentToast("Error de server"));
  }

  getChatDetallado(){
    this._mensajes.getDetallado( { where: { chat: this.id }}).subscribe((res:any)=> this.listChat = res.data );
  }

}
