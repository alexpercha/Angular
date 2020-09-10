import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, delay } from 'rxjs/operators';
import { Medico } from '../models/medico.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedicos() {

    const url = `${ base_url }/medicos`;
    return this.http.get( url, this.headers )
    .pipe(
      map( (resp: {ok: string, medicos: Medico[]}) => {
        return resp.medicos;
      })
    );
  }

  cargarMedicosId(id: string) {

    const url = `${ base_url }/medicos/${id}`;
    return this.http.get( url, this.headers )
    .pipe(
      delay(100),
      map( (resp: {ok: string, medicos: Medico}) => {
        console.log('consulta medico:', resp );
        return resp.medicos;
      })
    );
  }

  crearMedico( medico: { nombre: string, hospital: string} ) {

    console.log(medico);
    const url = `${ base_url }/medicos`;
    return this.http.post( url, medico , this.headers );
  }

  actualizarMedico( medico: Medico, uid: string ) {

    const url = `${ base_url }/medicos/${medico.uid}/${uid}`;
    return this.http.put( url, medico , this.headers );
  }

  eliminarMedico( uid: string ) {

    const url = `${ base_url }/medicos/${uid}`;
    return this.http.delete( url, this.headers );
  }
}
