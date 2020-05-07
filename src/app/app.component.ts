import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Pagos Onlain';

  ngOnInit(): void {
    console.log("Buenas")
    // localStorage.setItem('config-fixed-header', 'fixed-header');
    // localStorage.setItem('config-fixed-leftmenu', 'fixed-leftmenu');
    // localStorage.setItem('config-fixed-footer', 'fixed-footer');
    // localStorage.setItem('config-boxed-layout', '');
    // localStorage.setItem('config-skin', 'theme-navyBlue');
    
  }

}
