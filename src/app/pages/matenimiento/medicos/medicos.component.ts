import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.models';
import { Subscription } from 'rxjs';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe( img => this.cargarMedicos());
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
    .subscribe( resp => {
      this.medicos = resp;
      this.cargando = false;
    });
  }

  cambiarImagen(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico.uid, medico.img);
  }

  BuscarMedico( valor: string) {
    this.cargando = true;

    if ( valor.length === 0) {
      this.medicos = this.medicosTemp;
      this.cargando = false;
      return;
    }

    this.busquedaService.buscarTexto( 'medicos', valor)
    .subscribe( resp => {
      this.medicos = resp;
      this.cargando = false;
    });
  }


  eliminarMedico( medico: Medico) {

    Swal.fire({
      title: 'Esta seguro?',
      text: 'No podroa revertir esto!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this.medicoService.eliminarMedico(medico.uid)
        .subscribe( (resp: any) => {
          Swal.fire(
            'Deleted!', `${resp.msg} - ${ medico.nombre}`
            );
          this.cargarMedicos();
        }, error => {
          Swal.fire(
            'Deleted!', `${error.error.msg}`
          );
        });
      }
    });
  }


}
