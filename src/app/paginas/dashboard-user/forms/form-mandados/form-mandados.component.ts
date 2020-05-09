import { Component, OnInit } from '@angular/core';
import { ResenaService } from 'src/app/services-components/resena.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-mandados',
  templateUrl: './form-mandados.component.html',
  styleUrls: ['./form-mandados.component.scss']
})
export class FormMandadosComponent implements OnInit {
  
  titulo:string = "";
  listComentario:any = [];
  id:string;

  constructor(
    private _resena: ResenaService,
    private _tools: ToolsService,
    private activate: ActivatedRoute,
    private Router: Router
  ) { }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if(this.id) this.getResena();
  }

  getResena(){
    this._resena.get({ where: { ordenes: this.id } }).subscribe((res:any)=>{
      res = res.data;
      this.listComentario = res;
    });
  }

}
