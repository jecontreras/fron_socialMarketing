import { Component, OnInit } from '@angular/core';
import { USER } from 'src/app/interfaces/user';
import { Store } from '@ngrx/store';
import { UserAction } from 'src/app/redux/app.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dataUser:any = {};
  constructor(
    private _store: Store<USER>,
  ) { 
    this._store.select("name")
    .subscribe((store:any)=>{
      //console.log(store);
      this.dataUser = store.user;
    });
  }

  ngOnInit() {
  }
  loguot(){
    let accion = new UserAction( this.dataUser, 'drop');
    this._store.dispatch( accion );
    location.reload();
  }

}
