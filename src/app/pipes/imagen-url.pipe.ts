import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.base_url;

@Pipe({
  name: 'imagenUrl'
})
export class ImagenUrlPipe implements PipeTransform {

  transform(img: string, tipo: string): unknown {

    if (!img) {
      return `${baseUrl}/upload/${tipo}/no-image.jpg`;
    }
    if ( img.includes('https')) {
      return img;
    }
    if ( img ) {
      return `${baseUrl}/upload/${tipo}/${img}`;
    } else {
      return `${baseUrl}/upload/${tipo}/no-image.jpg`;
    }
  }

}
