import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.component.html',
  styleUrls: ['./choose-location.component.scss']
})
export class ChooseLocationComponent implements OnInit {
  nameRegEx = "^[a-zA-Z0-9-,]+(\s{0,1}[a-zA-Z0-9-, ])*$";
  cityRegEx = "^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$";
  postalRegEx = "^[0-9-,]+(\s{0,1}[0-9-, ])*$";
  stateDefault:any;
  constructor() { }
  public stateData = [
    
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    " California",
    " Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    " Georgia",
    " Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    " Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    " Maryland",
    "Massachusett",
    "Michigan",
    " Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    " New Jersey",
    " New Mexico",
    " New York",
    "North Carolina",
    " North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    " Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    " West Virginia",
    "Wisconsin",
    " Wyoming"

  ];


  ngOnInit() {

    if(localStorage.getItem('postalCode')==null){
  
    }
    else{
      this.Previous()
    }

  }



  location = new FormGroup({
    addressLine1: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.nameRegEx)]),
    addressLine2: new FormControl('', ),
    city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.cityRegEx)]),
    locations: new FormControl('',Validators.required),
    postalCode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(this.postalRegEx)])),
  });
  onSubmit() {
   // console.log(this.location.value);
    localStorage.setItem('addressLine1', this.location.get("addressLine1").value);
    localStorage.setItem('addressLine2', this.location.get("addressLine2").value);
    localStorage.setItem('city', this.location.get("city").value);
    localStorage.setItem('locationsFamily', this.location.get("locations").value);
    localStorage.setItem('postalCode', this.location.get("postalCode").value);
  }
  Previous(){
    this.location.controls['addressLine1'].patchValue(localStorage.getItem('addressLine1'))
    this.location.controls['addressLine2'].patchValue(localStorage.getItem('addressLine2'))
    this.location.controls['locations'].patchValue(localStorage.getItem('locationsFamily'))
    this.location.controls['postalCode'].patchValue(localStorage.getItem('postalCode'))
    this.location.controls['city'].patchValue(localStorage.getItem('city'))
  }
}
