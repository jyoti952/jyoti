import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendService } from 'src/app/services/send.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  constructor(private send: SendService) { }

  get profileBio() {
    return this.codeOfConduct.get('profileBio')
  }

  nameRegEx = "[a-zA-Z0-9_.,]+.*$"


  public organisations: { [key: string]: Object; }[] = [
    { Name: 'Miracle on 22nd Street', Code: '1' },
    { Name: 'Consectetur Adipiscing Elit', Code: '2' },
    { Name: 'Bibendum Ultrices', Code: '3' },
    { Name: 'Etiam Accumsan', Code: '4' },
    { Name: 'Lorem Ipsum Dolor', Code: '5' },
    { Name: '53rd street of Canada', Code: '6' },
  ];
  // maps the local data column to fields property
  public localFields: Object = { text: 'Name', value: 'Code' };
  // set the placeholder to MultiSelect input element
  public localWaterMark: string = '— Select organisations —    ';


  ngOnInit() {

    history.pushState(null, null, location.href);
    window.onpopstate = function(event) {
     history.go(0);
  };
  
  if(localStorage.getItem('profile_bio')==null){
  
  }
  else{
    this.Previous()
  }

  }

  
  codeOfConduct = new FormGroup({
    profileBio: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern(this.nameRegEx)]),
    conditions: new FormControl('', [Validators.required])
  });

  onSubmit(event) {
    //console.log('event', this.codeOfConduct.value);
    this.send.changeMessage(event)
    localStorage.setItem('profile_bio', this.codeOfConduct.get("profileBio").value)
    localStorage.setItem('code_of_conduct', this.codeOfConduct.get("conditions").value)
  }



  Previous(){
    this.codeOfConduct.controls['conditions'].patchValue(true);
    this.codeOfConduct.controls['profileBio'].patchValue(localStorage.getItem('profile_bio'))
  }

}
