import { Injectable, Output, EventEmitter, ɵConsole } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpUrl } from './httpUrl.component';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpObservableService {

  userdata: any;
  userData: any;

  @Output() logindata: EventEmitter<boolean> = new EventEmitter();


  constructor(private http: HttpClient,private router:Router) { }

  public isAuthenticate(): boolean {
    //method return true or false based on login credential
    const userData = localStorage.getItem('userData');

    if (userData && userData.length > 0) {
      return true;
    }
    else {
      return false;
    }

  }

  public loginAction(postData) {
    const body = new HttpParams()
      .set('email', postData.email)
      .set('password', postData.password);
    this.http.post(HttpUrl.loginBoth, postData).subscribe(
      (res) => {
        if(res['success']==false){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'wrong credentials',
            showConfirmButton: false,
            timer: 1000
          })
        }
       // console.log(res);
        this.userdata = res;
       // console.log(this.userdata)
       if(this.userdata.errors !=null){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'invalid cridentials',
          showConfirmButton: false,
          timer: 1000
        })
      }
        localStorage.setItem('logindata',JSON.stringify(this.userdata));
        localStorage.setItem('userinformation', JSON.stringify(this.userdata))
        localStorage.setItem('email', res['data']['profile'].email);
        localStorage.setItem('role', res['data']['profile'].role);
        localStorage.setItem('userData', res['data'].token);
        localStorage.setItem('name', res['data']['profile'].name);
        localStorage.setItem('existing_family_user', res['data'].existing_family_user);
        localStorage.setItem('family_profile_status', res['data'].family_profile_status);
        this.logindata.emit();
        if (localStorage.getItem('existing_family_user') == "true" && localStorage.getItem('family_profile_status') != "Approved") {
            this.router.navigate(['/onboarding/family/thank-you']);
           }
        });
    return true;
  }

  public async logOutAction() {
    //session/local storage clear
    await localStorage.removeItem('userData');
    await sessionStorage.clear();
    await localStorage.clear();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout Successfully',
      showConfirmButton: false,
      timer: 1000
    })
    return true;
  }

  public async getUserdata() {
    const userData = localStorage.getItem('userData');
    return JSON.parse(userData)
  }
}
