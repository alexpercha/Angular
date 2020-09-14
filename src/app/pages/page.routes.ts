import { Route, RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from '../guards/auth.guard';
import { HospitalesComponent } from './matenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './matenimiento/medicos/medicos.component';
import { UsuariosComponent } from './matenimiento/usuarios/usuarios.component';
import { MedicoComponent } from './matenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';



const pagesRoutes: Routes = [
    { path: '', component: PagesComponent, canActivate: [AuthGuard] , children: [
        { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Account-settings'} },
        { path: 'busqueda/:texto', component: BusquedaComponent, data: { titulo: 'Resultados'} },
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
        { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica1'} },
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Matenimiento hospitales'} },
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento medicos'} },
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento medico'} },
        { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil'} },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
        { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: { titulo: 'Mantenimiento usuarios'} },
        { path: '', pathMatch: 'full', redirectTo: '/dashboard'}
    ]}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
