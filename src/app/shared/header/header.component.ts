import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService,
               private router: Router) {
    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {
  }

  logOut() {
    this.usuarioService.logOut();
  }

  buscar( valor: string) {
    if (valor === ' ') {
      return;
    }
    this.router.navigateByUrl(`/busqueda/${valor}`);
  }

}
