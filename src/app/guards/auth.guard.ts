import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private routerNavigate: Router
  ) { }
  roleNavigation:any;
  
  canActivate(): boolean
//    {
//     if (!this.authService.isAuthenticate()) {
    
 
//       this.routerNavigate.navigate(["/login/elf"]);

//       return false;
    
//   }
// return true;

//    }


    // else {

    //   if (sessionStorage.getItem('role') == 'elf') {
    //     this.routerNavigate.navigate(['/login/elf']);
    //   }
    //   return true;
    // }

    {
          if (!this.authService.isAuthenticate()) {
          
          
            this.routerNavigate.navigate(["/login/elf"]);
           
               
              
      
            return false;
          
        }
//         else{

// if(sessionStorage.getItem('role')=='elf'){
//   this.routerNavigate.navigate(["/login/elf"]);
// }

//           return false;
//         }
        return true;
      
         }
        
  
}

