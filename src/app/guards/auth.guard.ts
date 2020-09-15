import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {}
  canLoad(route: import('@angular/router').Route,
          segments: import('@angular/router').UrlSegment[]): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    return this.usuarioService.validationToken()
    .pipe(
      tap( auth => {
        if (!auth) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.usuarioService.validationToken()
    .pipe(
      tap( auth => {
        if (!auth) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

}
