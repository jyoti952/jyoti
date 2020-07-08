import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ElfOnboardingGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private routerNavigate: Router
  ) { }
  roleNavigation:any;
  canActivate(): boolean {
    if (this.authService.isAuthenticate()) {
      this.roleNavigation = sessionStorage.getItem('role');

      if (this.roleNavigation == 'elf' && this.roleNavigation != 'family') {
 
        this.routerNavigate.navigate(['/login/elf']);

        return false;
      }
     
    }
    return true;
  

  }
}
