import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  public base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformarUsuarios(datos: any[]): Usuario[] {
     return datos.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
     );
  }

  buscarTexto(tipo: string, valor: string) {

    const url = `${ this.base_url }/todo/${tipo}/${ valor }`;
    return this.http.get<any[]>( url, this.headers )
    .pipe(
      map( (resp: any) => {
        switch (tipo) {
          case 'usuarios':
            console.log(resp);
            return this.transformarUsuarios(resp.data);
          default:
            return[];
        }
      })
    );
  }



}
