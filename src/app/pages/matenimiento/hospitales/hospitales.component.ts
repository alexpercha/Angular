import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.models';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public cargando = true;
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedaService: BusquedasService) {

  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe( img => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
    .subscribe( resp => {
      this.hospitales = resp;
      this.cargando = false;
    });
  }

  guardarCambio( hospital: Hospital) {

    this.hospitalService.actualizarHospital( hospital.nombre, hospital.uid)
    .subscribe( resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
    });
  }

  eliminarHospital( hospital: Hospital) {

    this.hospitalService.eliminarHospital(hospital.uid)
    .subscribe( resp => {
      this.cargarHospitales();
      Swal.fire('Eliminado', hospital.nombre, 'success');
    });
  }

  async crearHospital() {
    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingres el nobre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hopital',
      showCancelButton: true,
      inputValidator: (valor) => {
        if (!valor) {
          return 'El nombre es obligatirio!';
        }
      }
    });

    if (value) {
      this.hospitalService.crearHospital(value)
      .subscribe( (resp: any) => {
        this.hospitales.push(resp.hospital);
      });
      Swal.fire(`Hospital: ${value} creado`);
    }
  }

  cambiarImagen(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital.uid, hospital.img);
  }

  BuscarHospital( valor: string) {
    this.cargando = true;

    if ( valor.length === 0) {
      this.hospitales = this.hospitalesTemp;
      this.cargando = false;
      return;
    }

    this.busquedaService.buscarTexto( 'hospitales', valor)
    .subscribe( resp => {
      this.hospitales = resp;
      this.cargando = false;
    });
  }


}
