import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-anonymous-family',
  templateUrl: './anonymous-family.component.html',
  styleUrls: ['./anonymous-family.component.scss']
})
export class AnonymousFamilyComponent implements OnInit {
  constructor() { }
  public size: { [key: string]: Object; }[] = [
    { Name: '1 Member', Code: '1' },
    { Name: '2 Members', Code: '2' },
    { Name: '3 Members', Code: '3' },
    { Name: '4 Members', Code: '4' },
    { Name: '5 Members', Code: '5' },
    { Name: '6 Members', Code: '6' },
  ];
  // maps the local data column to fields property
  public localFields: Object = { text: 'Name', value: 'Code' };
  // set the placeholder to MultiSelect input element
  public localWaterMark: string = '— Select family size —   ';

  ngOnInit() { 
    if(localStorage.getItem('radio')==null){
  
    }
    else{
      this.Previous()
    }

  }
  nameRegEx = "^[a-zA-Z0-9-,..@#$%&*]+(\s{0,1}[a-zA-Z0-9-,.@#$%&* ])*$";
  anonymousFamily = new FormGroup({
    radio: new FormControl('true'),
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.nameRegEx)]),
  });

  onSubmit() {
    //console.log(this.anonymousFamily.value)
    localStorage.setItem('radio', this.anonymousFamily.get("radio").value)
    localStorage.setItem('userName', this.anonymousFamily.get('userName').value);
  }
  Previous(){
    this.anonymousFamily.controls['radio'].patchValue(localStorage.getItem('radio'))
    this.anonymousFamily.controls['userName'].patchValue(localStorage.getItem('userName'))
  }
}
