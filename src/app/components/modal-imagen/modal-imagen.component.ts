import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from '../../models/usuario.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


  public imgTemp: any;
  public usuario: Usuario;
  public archivo: File;

  constructor( public modalImagenService: ModalImagenService,
               public fileService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
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

    const uid = this.modalImagenService.uid;

    this.fileService.actualizarFoto(this.archivo, 'usuarios', uid)
    .then( img => {
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch( error => {
      console.log(error);
    });
  }

}
