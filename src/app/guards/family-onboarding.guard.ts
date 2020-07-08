import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpObservableService } from '../services/http-observable.service';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyOnboardingGuard implements CanActivate {
  constructor(
    private AdminService: AdminService,
    private routerNavigate: Router
  ) { }

  canActivate(): boolean {
    if (!this.AdminService.isAuthenticate()) {
      this.routerNavigate.navigate(['/login/admin']);
    return false;
    }
    return true;
    }

  
  
}