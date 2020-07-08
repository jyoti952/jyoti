import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpObservableService } from 'src/app/services/http-observable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  passwordVisible = false;


  familyDataLogin: any;
  loginActionActive = false;
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

  familyLogin = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.pattern('^[A-za-z0-9-_:~|();,./?+=\!@#$%^&*]+@[A-za-z0-9-_:~|();,./?+=\!@#$%^&*]+\\.[cominorgccCOMINORGCC]{2,4}$')]),
    password: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(16),Validators.pattern('^(?!.* )(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$')])),
    isRemberMeChecked: new FormControl('')
  });

  constructor(private httpservice: HttpService,private activatedRoute: ActivatedRoute, private auth: AuthService, private family: HttpObservableService, private router: Router, private cookieService: CookieService) { }
  role:any;
  ngOnInit() {
    this.family.logindata.subscribe(data => {
      this.navigateToDashboard();
    })
    this.getdata();
    this.role = this.activatedRoute.snapshot.paramMap.get(localStorage.getItem('role'))
  }

  get email() {
    return this.familyLogin.get('email')
  }

  getdata() {
    if (this.cookieService.get('remember') == "true") {
      this.familyLogin.controls['email'].patchValue(this.cookieService.get('email'))
      this.familyLogin.controls['password'].patchValue(this.cookieService.get('password'))
      this.familyLogin.controls['isRemberMeChecked'].patchValue(this.cookieService.get('remember'))
    }
    else {

    }
  }

  Loginfamily(formData: any) {
    formData['role'] = "family";
    this.cookieService.set('email', this.familyLogin.value.email);
    this.cookieService.set('password', this.familyLogin.value.password);
    this.cookieService.set('remember', this.familyLogin.value.isRemberMeChecked);

    if (this.cookieService.get('remember') == "true") {
      this.familyLogin.controls['email'].patchValue(this.cookieService.get('email'))
      this.familyLogin.controls['password'].patchValue(this.cookieService.get('password'))
      this.familyLogin.controls['isRemberMeChecked'].patchValue(this.cookieService.get('remember'))
    }
    else {

    }

   // console.log(formData)
    if (this.family.loginAction(formData)) {
      this.loginActionActive = true;
      this.familyLogin.reset();
    }
  }

  navigateToDashboard() {

    if (this.loginActionActive) {

      this.roleNavigation = localStorage.getItem('role')

      if (this.roleNavigation == 'family') {
        if (localStorage.getItem('existing_family_user') == "false") {
          this.router.navigate(['/onboarding/family']);
        }
        else if (localStorage.getItem('existing_family_user') == "true") {
          if(localStorage.getItem('family_profile_status')=="undefined"){
            this.router.navigate(['/onboarding/family/thank-you']);
            }
          if(localStorage.getItem('family_profile_status')=="Approved"){
          this.router.navigate(['/family/conversations']);
          }
          else if(localStorage.getItem('family_profile_status')=="null" || localStorage.getItem('family_profile_status')=='Declined'){
            this.router.navigate(['/onboarding/family']);
            }
          else if(localStorage.getItem('existing_family_user')!="Approved"){
            this.router.navigate(['/onboarding/family/thank-you']);
            }
        } 
   

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1000
        })
        
 
        
      }
      else if (this.roleNavigation == 'elf') {
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