import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register.interface';
import { LoginForm } from '../interfaces/login.interface';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
  get role(): 'ADMIN_ROLE' | 'USER_ROLE'  {
    return this.usuario.role;
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  guardarLocalStorage(token: string, menu: any) {

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
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
                this.guardarLocalStorage(resp.token, resp.menu);
              })
            );

  }

  loginUsuario( fromData: LoginForm ) {
    return this.http.post(`${ base_url }/login`, fromData)
            .pipe(
              tap( (resp: any) => {
                this.guardarLocalStorage(resp.token, resp.menu);
              })
            );
  }

  loginGoole( token: string ) {
    localStorage.removeItem('menu');
    return this.http.post(`${ base_url }/login/google`, {token})
            .pipe(
              tap( (resp: any) => {
                this.guardarLocalStorage(resp.token, resp.menu);
              })
            );
  }

  validationToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, this.headers).pipe(
      map( (resp: any) => {
        const { email, google, img = '', nombre, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img , google, role, uid );
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError( error => of(false))
    );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  actualizarperfil( data: {nombre: string, email: string}) {
    return this.http.put(`${ base_url }/usuarios/${this.uid}`, data, this.headers);
  }

  actualizarRole( usuario: Usuario) {
    return this.http.put(`${ base_url }/usuarios/${usuario.uid}`, usuario, this.headers);
  }
  cargarUsuarios( desde: number = 0 ) {

    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
            .pipe(
              map( resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
                );
                return {
                  total: resp.total,
                  usuarios
                };
              })
            );
  }

  borrarUsuario( usuario: Usuario) {
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
  }

}
