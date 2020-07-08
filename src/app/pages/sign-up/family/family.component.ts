import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

  passwordVisible = false;
  isFocused = false;
  submitted = false
  signupDataFamily: any;
  nameRegEx = "^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$";


  changeVisibility(input: HTMLInputElement) {
    if (input.type === 'password') {
      input.type = 'text';
      this.passwordVisible = true;
    } else if (input.type === 'text') {
      input.type = 'password';
      this.passwordVisible = false;
    }
  }


  familySignup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,,Validators.minLength(6),Validators.maxLength(16),Validators.pattern('^(?!.* )(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$')]),
    acceptTerms: new FormControl('', Validators.requiredTrue)

  });

  constructor(private httpservice: HttpService, private router: Router) { }

  ngOnInit() {
    this. Previous();
  }

  get name() {
    return this.familySignup.get('name')
  }

  Previous(){
    if(sessionStorage.getItem('familyName')!=null){
    this.familySignup.controls['name'].patchValue(sessionStorage.getItem('familyName'))
    }
    if(sessionStorage.getItem('familyEmail')!=null){
    this.familySignup.controls['email'].patchValue(sessionStorage.getItem('familyEmail'))
    }
    if(sessionStorage.getItem('familyPassword')!=null){
    this.familySignup.controls['password'].patchValue(sessionStorage.getItem('familyPassword'))
    }
    if(sessionStorage.getItem('familyTerms')=="true"){
    this.familySignup.controls['acceptTerms'].patchValue(true);
    }
  }

  storeData(){
    sessionStorage.setItem('familyName', this.familySignup.get("name").value);
    sessionStorage.setItem('familyEmail', this.familySignup.get("email").value);
    sessionStorage.setItem('familyPassword', this.familySignup.get("password").value);
    sessionStorage.setItem('familyTerms', this.familySignup.get("acceptTerms").value);
  }

  onSubmit(data) {
    delete data['acceptTerms'];
    data['password_confirmation'] = this.familySignup.get('password').value;
    data['role'] = "family";
    //console.log("data", data)
    this.httpservice.Signupfamily(data).subscribe(response => {
      this.signupDataFamily = response
      //console.log("family", this.signupDataFamily)
      if (this.signupDataFamily['statusCode'] == 200) {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You Have Been Successfully Registered!',
          showConfirmButton: false,
          timer: 1000
        })

        this.router.navigate(['/signup/family/verify']);

      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Invalid credentials',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
  }


}

