import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.models';
import { Medico } from '../../models/medico.models';
import { Hospital } from 'src/app/models/hospital.models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ texto }) => {
      this.BusquedaGlobal( texto );
    });
  }

  BusquedaGlobal( texto: string) {
    this.busquedasService.buscarGlobal( texto )
      .subscribe( (resp: any) => {
        this.usuarios = resp.buscarUsuario;
        this.medicos = resp.buscarMedico;
        this.hospitales = resp.buscarHospitales;

      });
  }

}
