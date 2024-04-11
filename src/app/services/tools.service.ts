import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import Swal from 'sweetalert2'
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  loading:any;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  async presentToast(mensaje:string, type='completado') {
    this.snackBar.open(mensaje, type, {duration: 5000});
  }
  codigo(){
    return (Date.now().toString(20).substr(2, 3) + Math.random().toString(20).substr(2, 3)).toUpperCase();
  }

  openSnack(message: string, type: string, config: any) {
    if (config) {
      this.snackBar.open(message, type, config);
    } else {
      this.snackBar.open(message, type, {duration: 5000});
    }
  }
  basic(text:string){
    Swal.fire(text)
  }
  basicIcons(text:any){
    Swal.fire(
      text.header,
      text.subheader,
      text.icon || 'question'
    );
  }
  error(text:any){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text.mensaje,
      footer: text.footer || '<a href>Why do I have this issue?</a>'
    });
  }
  tooast(text:any){
    Swal.fire({
      position: text.position || 'top-end',
      icon: text.icon || 'success',
      title: text.title || 'Your work has been saved',
      showConfirmButton: text.show || false,
      timer: 1500
    });
  }
  confirm(text:any){
    return Swal.fire({
      title: text.title || 'Are you sure?',
      text:  text.detalle || "You won't be able to revert this!",
      icon:  text.icon || 'warning',
      showCancelButton: true,
      confirmButtonColor: text.confirColor || '#3085d6',
      cancelButtonColor: text.cancelColor || '#d33',
      confirmButtonText: text.confir || 'Yes, delete it!'
    });
  }
  ProcessTime(text:any){
    let timerInterval
    Swal.fire({
      title:  text.title || 'Auto close alert!',
      html: '...',
      timer: text.tiempo || 3000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
          }
        }, 1000)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  alertInput( opciones ){
    return new Promise( resolve => {
      Swal.fire({
        title: opciones.title || 'Input',
        input: opciones.input || 'text',
        inputValue: opciones.value || '',
        inputPlaceholder: opciones.placeholder || "",
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: opciones.confirme || 'Siguiente',
        showLoaderOnConfirm: true,
        preConfirm: ( txt ) => {
          return txt;
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        resolve( result ) ;
      })
    });
  }

  processPhoto( data ){
    Swal.fire({
      imageUrl: data.photo || 'https://placeholder.pics/svg/300x1500',
      imageHeight: 500,
      imageAlt: data.title || 'A tall image'
    })
  }

  openFotoAlert( foto:string ){
    Swal.fire({
      title: '',
      text: '',
      imageUrl: foto,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: '',
    })
  }

  transSlug( text:string="" ){
    return _.deburr( ( text.toLowerCase() ) );
  }


}
