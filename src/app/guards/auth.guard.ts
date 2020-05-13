import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      /* const currentUser = this.authService.currentUserValue();
      if (next.data.roles && next.data.roles.indexOf(currentUser.role) === -1) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      } */
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
