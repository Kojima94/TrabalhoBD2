import { AuthService } from './login/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> {
      if (sessionStorage.getItem('documento')) {
        return true;
      } else {
        this.router.navigate(['']);
        this.snackBar.open('Opa, cadê o seu token? Faça login novamente!', 'Ok', {
          duration: 10000
        });
      }
  }

  constructor(private auth: AuthService, private router: Router, public snackBar: MatSnackBar) { }
}
