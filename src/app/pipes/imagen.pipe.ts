import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): any {

    let url = URL_SERVICIOS + '/imagenes/usuarios/';

    if(!img){
      return url + 'no-img.jpg';
    }else{
      return url + img;
    }

  }

}
