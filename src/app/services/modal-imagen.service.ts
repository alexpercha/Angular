import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario.models';
import { ImagenUrlPipe } from '../pipes/imagen-url.pipe';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private ocultarModal = true;
  public tipo: string;
  public img: string;
  public uid: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter();

  constructor() { }

  get retornarModal() {
    return this.ocultarModal;
  }

  abrirModal(tipo: string, uid: string, img: string = 'no-img') {
    this.ocultarModal = false;
    this.uid = uid;
    this.tipo = tipo;

    if (img.includes('http')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
    console.log(this.img);

  }

  cerrarModal() {
    this.ocultarModal = true;
  }



}
