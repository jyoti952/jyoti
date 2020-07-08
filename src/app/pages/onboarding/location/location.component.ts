import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
nameRegEx = "^[a-zA-Z0-9-,]+(\s{0,1}[a-zA-Z0-9-, ])*$";
  cityRegEx = "^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$";
  postalRegEx = "^[0-9-,]+(\s{0,1}[0-9-, ])*$";
  stateDefault:any;

  constructor() { }
  public stateData = [
    'Select your State',
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

    if(localStorage.getItem('postalCodeElf')==null){
  
    }
    else{
      this.Previous()
    }

  }
  location = new FormGroup({
    addressLine1Elf: new FormControl('', ),
    addressLine2Elf: new FormControl('', ),
    cityElf: new FormControl('', ),
    locationsElf: new FormControl('Select your State',Validators.required),
    postalCodeElf: new FormControl('',),
  });

  onSubmit() {
   // console.log(this.location.value);
    localStorage.setItem('addressLine1Elf', this.location.get("addressLine1Elf").value);
    localStorage.setItem('addressLine2Elf', this.location.get("addressLine2Elf").value);
    localStorage.setItem('cityElf', this.location.get("cityElf").value);
    localStorage.setItem('locationsElf', this.location.get("locationsElf").value);
    localStorage.setItem('postalCodeElf', this.location.get("postalCodeElf").value);
  }
  Previous(){
    this.location.controls['addressLine1Elf'].patchValue(localStorage.getItem('addressLine1Elf'))
    this.location.controls['addressLine2Elf'].patchValue(localStorage.getItem('addressLine2Elf'))
    this.location.controls['cityElf'].patchValue(localStorage.getItem('cityElf'))
  
    this.location.controls['locationsElf'].patchValue(localStorage.getItem('locationsElf'))
    this.location.controls['postalCodeElf'].patchValue(localStorage.getItem('postalCodeElf'))
  
}
}
