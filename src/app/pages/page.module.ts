import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';

// MODULOS
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './page.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/graficas/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './matenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './matenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './matenimiento/medicos/medicos.component';
import { ModalImagenComponent } from '../components/modal-imagen/modal-imagen.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicoComponent } from './matenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Grafica1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        PerfilComponent,
        UsuariosComponent,
        HospitalesComponent,
        MedicosComponent,
        ModalImagenComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Grafica1Component,
        ProgressComponent,
        IncrementadorComponent,
        ModalImagenComponent
    ],
    imports: [
        SharedModule,
        BrowserModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        ReactiveFormsModule,
        PipesModule
    ]
})

export class PageModule {}

