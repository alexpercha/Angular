import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public usuarios: Usuario[];
  public usuariosTemp: Usuario[];
  public totalRegistros: number;
  public desde = 0;
  public cargando = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService) {
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe( img => this.cargarUsuarios() );
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( (resp) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.usuariosTemp = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina( valor: number) {

    this.desde += valor;

    if ( this.desde < 0) {
      this.desde = 0;
    } else if ( this.desde >= this.totalRegistros) {
      this.desde -=  valor;
    }

    this.cargarUsuarios();

  }

  BuscarUsuario( valor: string) {
    this.cargando = true;

    if ( valor.length === 0) {
      this.usuarios = this.usuariosTemp;
      this.cargando = false;
      return;
    }

    this.busquedaService.buscarTexto( 'usuarios', valor)
    .subscribe( (resp: Usuario[]) => {
      this.usuarios = resp;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario) {

    Swal.fire({
      title: 'Esta seguro?',
      text: 'No podroa revertir esto!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(usuario)
        .subscribe( (resp: any) => {
          this.usuarioService.cargarUsuarios();
          Swal.fire(
            'Deleted!', `${resp.msg} - ${ usuario.nombre}`
          );
        }, error => {
          Swal.fire(
            'Deleted!', `${error.error.msg}`
          );
        });
      }
    });
  }

  guardarUsuario( usuario: Usuario) {
    this.usuarioService.actualizarRole( usuario).subscribe( resp => {
      console.log(resp);
    });
  }

  cambiarImagen(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
