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



const pagesRoutes: Routes = [
    { path: '', component: PagesComponent, canActivate: [AuthGuard] , children: [
        { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil'} },
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
        { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica1'} },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
        { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Account-settings'} },
        { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios'} },
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales'} },
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos'} },
        { path: '', pathMatch: 'full', redirectTo: '/dashboard'}
    ]}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
