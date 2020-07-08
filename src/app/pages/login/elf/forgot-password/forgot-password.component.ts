import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { SendService } from 'src/app/services/send.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotRes: any;


  forgetPasswordElf = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.pattern('^[A-za-z0-9-_:~|();,./?+=\!@#$%^&*]+@[A-za-z0-9-_:~|();,./?+=\!@#$%^&*]+\\.[cominorgccCOMINORGCC]{2,4}$')]),
  });

  constructor(private httpservice: HttpService, private send: SendService,private router:Router) { }
  ngOnInit() { }

  get email() {
    return this.forgetPasswordElf.get('email')
  }

  resetPasswordElf() {
    let data = {}
    data['email'] = this.forgetPasswordElf.get('email').value;
    this.httpservice.forgotElf(data).subscribe(res => {
      this.forgotRes = res;
      // debugger
      //console.log(this.forgotRes)
      //console.log(this.forgotRes.data.email)
      //console.log(this.forgotRes.data.reset_digest)
      this.send.forgotEmail(this.forgotRes.data.email)
      this.send.resetToken(this.forgotRes.data.reset_digest)
      localStorage.setItem('email', this.forgotRes.data.email);
      //console.log(this.forgotRes.data.email)
      localStorage.setItem('token',this.forgotRes.data.reset_digest)
      //console.log(this.forgotRes.data.reset_digest)
      
      if (this.forgotRes['errors'] ==null) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Reset password link has been sent to your registered email id. Kindly check the Email Account',
          showConfirmButton: false,
          timer: 1500
        })
  
      
      
      }
      else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Not a valid email address',
          showConfirmButton: false,
          timer: 1500
        })
      }
     
    })
    this.forgetPasswordElf.reset();
  }

}
