import { Component, OnInit,HostListener} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { SendService } from 'src/app/services/send.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-reset-family',
  templateUrl: './reset-family.component.html',
  styleUrls: ['./reset-family.component.scss']
})
export class ResetFamilyComponent implements OnInit {
  tokenValueFamily: any;
  message: any;
  passwordRegEx = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}'
  resetData: any;
  emailValueFamily: any;
  constructor(private httpservice: HttpService, private auth: AuthService, private router: Router, private send: SendService, private cookieService: CookieService) { }
  public token: Subscription;
  public email: Subscription;
  ngOnInit() {
    //console.log(localStorage.getItem('email'));

    //console.log('email',this.email)
    //console.log(localStorage.getItem('token'));
    //console.log('token',this.token)

    this.email = this.send.emailFamilyMessage.subscribe(res => {
      this.emailValueFamily = res
      // //console.log('resetEmail', this.emailValueFamily)
    });

    this.token = this.send.tokenFamilyMessage.subscribe(message => {
      this.tokenValueFamily = message
      // //console.log('resetToken', this.tokenValueFamily)
    });
  }
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
  get password_cofirmation() {
    return this.forgetPassword.get('password_cofirmation')
  }
  get getError() {
    return this.forgetPassword.get('getError')
  }

  
  forgetPassword = new FormGroup({
    password: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(16),Validators.pattern('^(?!.* )(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$')])),
    password_cofirmation: new FormControl('', [Validators.required]),

  }, this.pwdMatchValidator)

  pwdMatchValidator(forgetPassword: FormGroup) {
    return forgetPassword.get('password').value === forgetPassword.get('password_cofirmation').value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    let obj = {}
    obj['password'] = this.forgetPassword.get('password').value;
    obj['email']=localStorage.getItem('email')
    obj['token']=localStorage.getItem('token')

  //  if(this.emailValueFamily !='defaultmsg' && this.tokenValueFamily != 'defaultmsg'){
  //     obj['email'] = this.emailValueFamily;
  //     obj['oketn'] = this.tokenValueFamily
  //   }
     //console.log(obj)
    this.httpservice.resetPassword(obj).subscribe(Response => {
      this.resetData = Response;
      // console.log("reset data", this.resetData)
    
      if(this.resetData['statusCode']==200){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your password has been changed successfully',
          showConfirmButton: false,
          timer: 1000
        })
        this.router.navigate(['/login/family']);
      }
      else{
        alert('invalid data')
      }
    })
    this.forgetPassword.reset();
  }

}

