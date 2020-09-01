import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItem: any[];
  public usuario: Usuario;

  constructor( private sidebarService: SidebarService,
               private usuarioService: UsuarioService) {
      this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.menuItem = this.sidebarService.menu ;
  }

}
