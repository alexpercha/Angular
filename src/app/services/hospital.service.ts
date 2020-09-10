import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales() {

    const url = `${ base_url }/hospitales`;
    return this.http.get( url, this.headers )
    .pipe(
      map( (resp: {ok: string, hospitales: Hospital[]}) => {
        return resp.hospitales;
      })
    );
  }

  crearHospital( nombre: string ) {

    const url = `${ base_url }/hospitales`;
    return this.http.post( url, {nombre} , this.headers );
  }

  actualizarHospital( nombre: string, uid: string ) {

    const url = `${ base_url }/hospitales/${uid}`;
    return this.http.put( url, {nombre} , this.headers );
  }

  eliminarHospital( uid: string ) {

    const url = `${ base_url }/hospitales/${uid}`;
    return this.http.delete( url, this.headers );
  }

}
