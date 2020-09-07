import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private ocultarModal = true;
  public img: string;
  public uid: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter();

  constructor() { }

  get retornarModal() {
    return this.ocultarModal;
  }

  abrirModal(usuario: Usuario) {
    this.ocultarModal = false;
    this.img = usuario.imagenUrl;
    this.uid = usuario.uid;
  }

  cerrarModal() {
    this.ocultarModal = true;
  }



}
