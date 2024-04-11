import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { UsuariosService } from 'src/app/services-components/usuarios.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { UserAction } from 'src/app/redux/app.actions';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  data:any = {};
  btnDisabled:boolean = false;
  id:any;

  constructor(
    private _store: Store<APPINT>,
    private _user: UsuariosService,
    private _tools: ToolsService,
    private Router: Router
  ) {

    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      this.data = _.clone( store.user ) || {};
      console.log("***32",this.data)
    });

  }

  ngOnInit() {
  }

  submit(){
    this.update();
  }

  update(){
    if( this.data.password ) return this.cambioPassword();
    this.data = _.omit( this.data, ['rol', 'password', 'confirpassword']);
    this._user.editar(this.data).subscribe((res:any)=>{
      console.log(res);
      this.data = res;
      let accion = new UserAction( res, 'put');
      this._store.dispatch(accion);
      this._tools.presentToast("Perfil Actualizado correctamente");
    },(error)=> this._tools.presentToast("Error al Actualizar el Perfil"));
  }

  cambioPassword(){
    let data:any = {
      id: this.data.id,
      password: this.data.password,
      confirpassword: this.data.confirpassword
    };
    if( data.password !== data.confirpassword ) return this._tools.presentToast("Error las contraseñas no son iguales");
    this._user.cambioPassword(data).subscribe((res:any)=>{
      console.log(res);
      this._tools.presentToast("Contraseña actualizada");
    },(error)=> this._tools.presentToast( error.data ||  "Error de servidor"));
  }

}
