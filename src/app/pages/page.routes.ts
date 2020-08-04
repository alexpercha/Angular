import { Route, RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';



const pagesRoutes: Routes = [
    { path: '', component: PagesComponent, children: [
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'dashboard'}  },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'progress'} },
        { path: 'grafica1', component: Grafica1Component, data: { titulo: 'grafica1'} },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'promesas'} },
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'rxjs'} },
        { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'account-settings'} },
        { path: '', pathMatch: 'full', redirectTo: '/dashboard'}
    ]}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
