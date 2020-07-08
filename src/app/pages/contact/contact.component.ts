import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  nameRegEx = "^[a-zA-Z0-9._@#$%^&*-,]+(\s{0,1}[a-zA-Z0-9._@#$%^&*-,])*$";
  contatForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[A-za-z0-9-_:~|();,./?+=\!@#$%^&*]+@[A-za-z0-9-_:~|();,./?+=\!@#$%^&*]+\\.[azA-Z]{2,4}$')]),
    // message: new FormControl('', ),
    // phone_number:new FormControl('', ),

  });
  newcontatForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    last_name: new FormControl('', [Validators.pattern(this.nameRegEx)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+)?\.com$')]),
    message: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)])

  });
  getLetter: boolean = true;
  thanks_msg: boolean = false;
  thanks_contact: boolean = false;
  contactSubmit: boolean = true;

  constructor(private httpservice: HttpService, private router: Router) { }

  ngOnInit() {

  }

  get first_name() {
    return this.contatForm.get('first_name')
  }



  contact: any;

  onSubmit(data) {
    // var mail ="mailto:nikhil.katari@gmail.com?subject=" + data.first_name;
    //console.log("data", data)

    this.httpservice.contactDetails(data).subscribe(response => {
      this.contact = response
      //console.log("contact details", this.contact)
      if (this.contact['statusCode'] == 200) {
        this.getLetter = false;
        this.thanks_msg = true;
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
  onSubmitContact(data) {
    if (data.first_name == "" || data.email == "" || data.message == "") {
      // alert("please fill all mandatory fileds");
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please fill all mandatory fields',
        showConfirmButton: false,
        timer: 1000
      })
    }
    else {
      this.thanks_contact = true;
      this.contactSubmit = false;
      //console.log("data", data)
      this.httpservice.contactDetails(data).subscribe(response => {
        this.contact = response
        console.log("contact details", this.contact)
        if (this.contact['statusCode'] == 200) {
          this.contatForm.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your contact has been created successfully!',
            showConfirmButton: false,
            timer: 1400
          })
          this.getLetter = false;
          this.thanks_msg = true;

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
}