import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register.interface';
import { LoginForm } from '../interfaces/login.interface';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';


declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.usuario.uid || '';
  }

  googleInit() {

    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '672307044771-lmmrnoc36n8kt89abl8fi6ui42rtaemu.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  crearUsuario( fromData: RegisterForm ) {
    return this.http.post(`${ base_url }/usuarios`, fromData)
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token', resp.token);
              })
            );

  }

  loginUsuario( fromData: LoginForm ) {
    return this.http.post(`${ base_url }/login`, fromData)
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token', resp.token);
              })
            );
  }

  loginGoole( token: string ) {
    return this.http.post(`${ base_url }/login/google`, {token})
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token', resp.token);
              })
            );
  }

  validationToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        console.log(resp);
        const { email, google, img = '', nombre, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img , google, role, uid );
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => of(false))
    );
  }

  logOut() {
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  actualizarperfil( data: {nombre: string, email: string}) {
    return this.http.put(`${ base_url }/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

}
