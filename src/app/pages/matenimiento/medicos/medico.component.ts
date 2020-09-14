import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.models';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medico.models';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico = new Medico();
  public imgSubs: Subscription;

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private ActiveRoute: ActivatedRoute,
               private modalImagenService: ModalImagenService) {
  }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
    nombre: ['', Validators.required],
    hospital: ['', Validators.required]
    });

    this.ActiveRoute.params.subscribe( ({ id }) => {
      this.cargarMedicoId(id);
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe(
    hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find( resp => resp.uid === hospitalId);
    });

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( img => this.cargarMedicoId(this.medicoSeleccionado.uid));
  }

  guardarMedico() {

    const { nombre, hospital } = this.medicoForm.value;

    if ( this.medicoSeleccionado) {
      this.medicoService.actualizarMedico(this.medicoSeleccionado, hospital)
      .subscribe( resp => {
        Swal.fire('Actualizado', `${ nombre} actualizado correctamente`, 'success');
      });
    } else {
      this.medicoService.crearMedico( this.medicoForm.value)
      .subscribe( (resp: any) => {
        Swal.fire('Creado', `${ nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/medico/${resp.medico.uid}`);
      });
    }
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
    .pipe(
      delay(100)
    )
    .subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });
  }

  cargarMedicoId(id: string) {

    this.medicoService.cargarMedicosId(id)
      .pipe(
        delay(500)
      )
      .subscribe( resp => {
        const { nombre, hospital: {_id}} = resp;
        this.medicoSeleccionado = resp;
        this.medicoForm.setValue({ nombre, hospital: _id});
      });
  }

  cambiarImagen(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico.uid, medico.img);
  }

}
