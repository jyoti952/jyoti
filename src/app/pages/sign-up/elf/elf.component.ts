import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-elf',
  templateUrl: './elf.component.html',
  styleUrls: ['./elf.component.scss']
})
export class ElfComponent implements OnInit {
  passwordVisible = false;
  isFocused = false;
  elfDataFamily: any;
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

  elfSignup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(16),Validators.pattern('^(?!.* )(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$')])),
    acceptTerms: new FormControl('', Validators.requiredTrue)
  });

  constructor(private httpservice: HttpService, private router: Router) { }

  ngOnInit() {
    this.Previous()
  }

  get name() {
    return this.elfSignup.get('name')
  }


 Previous(){
  if(sessionStorage.getItem('elfName')!=null){
  this.elfSignup.controls['name'].patchValue(sessionStorage.getItem('elfName'))
  }
  if(sessionStorage.getItem('elfEmail')!=null){
  this.elfSignup.controls['email'].patchValue(sessionStorage.getItem('elfEmail'))
  }
  if(sessionStorage.getItem('elfPassword')!=null){
  this.elfSignup.controls['password'].patchValue(sessionStorage.getItem('elfPassword'))
  }
  if(sessionStorage.getItem('elfTerms')=="true"){
  this.elfSignup.controls['acceptTerms'].patchValue(true);
  }
}


  storeData(){
    sessionStorage.setItem('elfName', this.elfSignup.get("name").value);
    sessionStorage.setItem('elfEmail', this.elfSignup.get("email").value);
    sessionStorage.setItem('elfPassword', this.elfSignup.get("password").value);
    sessionStorage.setItem('elfTerms', this.elfSignup.get("acceptTerms").value);
  }
  onSubmit(data) {
    delete data['acceptTerms'];
    data['password_confirmation'] = this.elfSignup.get('password').value;
    data['role'] = "elf";
    //console.log("data", data)

    this.httpservice.Signupelf(data).subscribe(response => {
      this.elfDataFamily = response
      //console.log("elf", this.elfDataFamily)
      if (this.elfDataFamily['statusCode'] == 200) {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You Have Been Successfully Registered!',
          showConfirmButton: false,
          timer: 1000
        })
        this.router.navigate(['/signup/elf/verify']);
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
