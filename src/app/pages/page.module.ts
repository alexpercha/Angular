import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';

// MODULOS
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './page.routes';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Grafica1Component,
        ProgressComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Grafica1Component,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PageModule {}

