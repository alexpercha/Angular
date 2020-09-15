import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';




const pagesRoutes: Routes = [
    { path: '', component: PagesComponent, canActivate: [AuthGuard] ,
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule)}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );


