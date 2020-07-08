import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set('content-type', 'application/json').set('authorization','barra '+ localStorage.getItem('userData')),
     responseType: 'json',
    });

    return next.handle(req)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error

            errorMessage = `Error: ${error.error.message}`;

            
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}Message: ${error.error.errors}`;
           
           
          }

      
          if(errorMessage=="Error Code: 422Message: Email address not found. Please check and try again")
          {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Enter valid email id',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else if(errorMessage=="Error Code: 422Message: Password does not match."){
            {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Please enter the valid password',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }
          else if(errorMessage=="Error Code: 422Message: Email id is not registered with this role. Please signup first."){
            {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Please check the entered credentials',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }
          else if(errorMessage=="Error Code: 422Message: You need to confirm your email before signin"){
            {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Please Verify your email id ',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }
        
          else if(errorMessage=="Error Code: 422Message: [object Object]"){
            {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Your Email has been already registerd, Please Login',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }

          else if(errorMessage=="Error Code: 422Message: Link not valid or expired. Try generating a new link."){
            {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'You are using old email link, Please use new link',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }
          //   else if(errorMessage=="Error Code: 422Message: No records found"){
          //     {
          //       Swal.fire({
          //         position: 'center',
          //         icon: 'error',
          //         title: 'no records found',
          //         showConfirmButton: false,
          //         timer: 1500
          //       })
          //     }


          // }
          
        
    
        //  else if(errorMessage)
        //   {
        //     Swal.fire({
        //       position: 'center',
        //       icon: 'error',
        //       title: 'Invalid Credentials',
        //       showConfirmButton: false,
        //       timer: 1000
        //     })
        //   }


          return throwError(errorMessage);
        })
      );
  }
}
