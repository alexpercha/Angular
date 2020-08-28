import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public auth2: any;
  public loginSubmit = false;
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    pass: ['', [Validators.required, Validators.min(1)]],
    recuerdame: [false]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.loginSubmit = true;

    if ( this.loginForm.invalid) {
      return;
    }

    this.usuarioService.loginUsuario(this.loginForm.value)
    .subscribe( (resp) => {
      console.log(resp);
      if ( this.loginForm.get('recuerdame').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('dashboard');
    }, (error) => {
      Swal.fire('Error', error.error.msg, 'error');
    });
  }

  validarCampo(campo: string): boolean {

    if ( this.loginForm.get(campo).invalid && this.loginSubmit ) {
      return true;
    } else {
      return false;
    }
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  async startApp() {
      await this.usuarioService.googleInit();
      this.auth2 = this.usuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));

  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoole(id_token)
          .subscribe( resp => {
            this.ngZone.run( () => {
              this.router.navigateByUrl('dashboard');
            });
          });
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
