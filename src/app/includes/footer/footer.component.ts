import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  nameRegEx = "^[a-zA-Z0-9._@#$%^&*-,]+(\s{0,1}[a-zA-Z0-9._@#$%^&*-,])*$";
  contatForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    email: new FormControl('', [Validators.required,Validators.pattern('^[A-za-z0-9-_:~|();,./?+=\!@#$%^&*]+@[A-za-z0-9-_:~|();,./?+=\!@#$%^&*]+\\.[cominorgccCOMINORGCC]{2,4}$')]),
    message: new FormControl('', ),
 
  });

  constructor(private httpservice: HttpService, private router: Router) { }

  ngOnInit() {

  }

  get first_name() {
    return this.contatForm.get('first_name')
  }



  contact:any;

  onSubmit(data) {
  
    //console.log("data", data)

    this.httpservice.contactDetails(data).subscribe(response => {
      this.contact = response
      //console.log("contact details", this.contact)
      if (this.contact['statusCode'] == 200) {
    this.contatForm.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your contact has been created successfully!',
          showConfirmButton: false,
          timer: 1000
        })
        
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