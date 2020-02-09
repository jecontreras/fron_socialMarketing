import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from 'src/app/services-components/facturas.service';

@Component({
  selector: 'app-form-facturas',
  templateUrl: './form-facturas.component.html',
  styleUrls: ['./form-facturas.component.scss']
})
export class FormFacturasComponent implements OnInit {
  data:any = {};
  id:any = '';
  titulo:any = 'ver';

  constructor(
    private activate: ActivatedRoute,
    private _factura: FacturasService,
    private router: Router
  ) { 
    this.id = (this.activate.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getFactura();
  }
  getFactura(){
    this._factura.get({where:{id: this.id}, populate: 'idContrato'}).subscribe((res:any)=>{
      this.data = res.data[0];
      //console.log(this.data);
      if(!this.data) this.router.navigate(['/dashboard/home']);
    }, error=>{console.error(error); this.router.navigate(['/dashboard/home']);});
  }
  imprimir(){
    window.print()
  }


}
