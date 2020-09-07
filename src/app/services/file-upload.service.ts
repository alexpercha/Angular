import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public baseurl = environment.base_url;

  constructor() { }


  async actualizarFoto(archivo: File, tipo: string, uid: string) {


    try {

      const url = `${this.baseurl}/upload/${tipo}/${uid}`;
      const fromData = new FormData();
      fromData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: fromData
      }
      );
      const data = await resp.json();

      console.log(data);
      if ( data.ok ) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }


    } catch (error) {
      console.log(error);
      console.log('entro a este error');
      return false;
    }
  }
}
