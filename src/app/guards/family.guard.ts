import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpObservableService } from '../services/http-observable.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyGuard implements CanActivate {
  constructor(
    private HttpObservableService: HttpObservableService,
    private routerNavigate: Router
  ) { }
  roleNavigation:any;
  canActivate(): boolean {
    if (!this.HttpObservableService.isAuthenticate()) {
          this.routerNavigate.navigate(["/login/family"]);
    return false;
    
  }
      return true;

  }
}
