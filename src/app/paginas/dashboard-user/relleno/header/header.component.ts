import { Component, OnInit } from '@angular/core';
import { USER } from 'src/app/interfaces/user';
import { Store } from '@ngrx/store';

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
  logout(){
    
  }

}
