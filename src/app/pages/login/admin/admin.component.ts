import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit  {
  passwordVisible = false;
  isRemberMeChecked: boolean;
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  passwordRegEx = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}'
  elfDataLogin: any;
  loginActionActive: any;
  roleNavigation: any;

  changeVisibility(input: HTMLInputElement) {
    if (input.type === 'password') {
      input.type = 'text';
      this.passwordVisible = true;
    } else if (input.type === 'text') {
      input.type = 'password';
      this.passwordVisible = false;
    }
  }

  elfLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z]{1}[a-z0-9._%+-]+@[a-z0-9.-]+\\.[cominorgcc]{2,4}$')]),
    password: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(16),Validators.pattern('^(?!.* )(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$')])),
    isRemberMeChecked: new FormControl('')
  });


  
 

  constructor(private httpservice: HttpService, private auth: AdminService, private router: Router, private cookieService: CookieService,private activatedRoute: ActivatedRoute) { }
  role: string;
  ngOnInit() {
    this.auth.logindata.subscribe(data => {
      this.navigateToDashboard();
    })
    this.getdata()
    this.role = this.activatedRoute.snapshot.paramMap.get(localStorage.getItem('role'))

  }
 

  get email() {
    return this.elfLogin.get('email')
  }

  getdata() {
    if (this.cookieService.get('remember') == "true") {
      this.elfLogin.controls['email'].patchValue(this.cookieService.get('email'))
      this.elfLogin.controls['password'].patchValue(this.cookieService.get('password'))
      this.elfLogin.controls['isRemberMeChecked'].patchValue(this.cookieService.get('remember'))
    }
    else {

    }
  }

  loginElf(formData: any) {
    formData['role'] = "admin";
    this.cookieService.set('email', this.elfLogin.value.email);
    this.cookieService.set('password', this.elfLogin.value.password);
    this.cookieService.set('remember', this.elfLogin.value.isRemberMeChecked);
   

    if (this.cookieService.get('remember') == "true") {
      this.elfLogin.controls['email'].patchValue(this.cookieService.get('email'))
      this.elfLogin.controls['password'].patchValue(this.cookieService.get('password'))
      this.elfLogin.controls['isRemberMeChecked'].patchValue(this.cookieService.get('remember'))

    }
    else {

    }



    //console.log(formData)
    if (this.auth.loginAction(formData)) {
      this.loginActionActive = true;
      this.elfLogin.reset();
    }

  }

  navigateToDashboard() {

    if (this.loginActionActive) {

      this.roleNavigation = localStorage.getItem('role')

      if (this.roleNavigation == 'admin') {

          this.router.navigate(['admin/dashboard']);
        


 

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1000
        })
      }
      else if (this.roleNavigation == 'family') {
       
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Email or password is incorrect!',
          showConfirmButton: false,
          timer: 1000
        })
      }
    }

  }
}

