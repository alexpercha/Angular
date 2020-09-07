import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  public usuario: Usuario;
  public formPerfil: FormGroup;
  public archivo: File;
  public  imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileService: FileUploadService) {
      this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.formPerfil = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.email]]
    });
  }

  actualizarPerfil() {
    console.log(this.formPerfil.value);
    this.usuarioService.actualizarperfil(this.formPerfil.value).subscribe( resp => {
      const { nombre, email } = this.formPerfil.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire({
        title: 'Succes',
        text: ' Perfil Actualizado',
        icon: 'success'
      });
    }, (error) => {
      Swal.fire({
        title: 'Error',
        text: error.error.msg,
        icon: 'error'
      });
    });
  }

  cargarArchivo( file: File) {

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = ( resp ) => {
      this.imgTemp = reader.result;
    };

    this.archivo = file;
  }

  guardarImagen() {
    this.fileService.actualizarFoto(this.archivo, 'usuarios', this.usuario.uid)
    .then( img => {
      this.usuario.img = img;
      Swal.fire({
        title: 'Guardado',
        text: 'Se actualizo su foto de perfil',
        icon: 'success'
      });
    }).catch( error => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar la imagen',
        icon: 'error'
      });
    });
  }


}
