import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public registerSubmit = false;
  public registerForm = this.fb.group({
    nombre: ['test 101', Validators.required ],
    email: ['test101@gmail.com', [Validators.required, Validators.email] ],
    pass: ['123', [Validators.required, Validators.min(1)]],
    pass2: ['123', Validators.required],
    terminos: [ true , Validators.required]
  }, {
    validators: this.validatorsPass('pass', 'pass2')
  });

  constructor( public fb: FormBuilder,
               public usuarioService: UsuarioService,
               public router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.registerSubmit = true;
    console.log(this.registerForm.status);

    if ( this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe((resp) => {
        this.router.navigateByUrl('/dashboard');
      }, (error) => {
        Swal.fire( 'Error', error.error.msg, 'error');
      });
  }

  validarCampo(campo: string): boolean {

    if ( this.registerForm.get(campo).invalid && this.registerSubmit ) {
      return true;
    } else {
      return false;
    }
  }

  validarPass() {
    const pass1 = this.registerForm.get('pass').value;
    const pass2 = this.registerForm.get('pass2').value;

    if ( this.registerSubmit && (pass1 !== pass2  || this.registerForm.get('pass').invalid )) {
      return true;
    } else {
      return false;
    }
  }

  validatorsPass( pass1: string, pass2: string) {

    return (formGroup: FormGroup) => {

      const passControl1 = formGroup.get(pass1);
      const passControl2 = formGroup.get(pass2);

      if ( passControl1.value === passControl2.value ) {
        passControl2.setErrors(null);
      } else {
        passControl2.setErrors({ noEsIgual: true});
      }
    };

  }

  usoTerminos(campo: string ): boolean {
    return !this.registerForm.get(campo).value && this.registerSubmit;

  }

}
