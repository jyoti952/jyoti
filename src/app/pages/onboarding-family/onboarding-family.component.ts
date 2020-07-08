import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { SendService } from 'src/app/services/send.service';
@Component({
  selector: 'app-onboarding-family',
  templateUrl: './onboarding-family.component.html',
  styleUrls: ['./onboarding-family.component.scss']
})
export class OnboardingFamilyComponent implements OnInit {
  constructor(private send: SendService) { }
  //nameRegEx = "^[a-zA-Z-,]+(\s{0,1}[a-zA-Z0-9-,.!?&*@$# ])*$"
  nameRegEx = "[a-zA-Z0-9_.,]+.*$"
  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(0);
    };
    if (localStorage.getItem('profile_bioFamily') == null) {

    }
    else {
      this.Previous()
    }
  }

  codeOfConduct = new FormGroup({
    profileBio: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.nameRegEx), Validators.required, Validators.maxLength(1000)]),
    conditions: new FormControl('', [Validators.required])
  });

  onSubmit(event) {
    //console.log(this.codeOfConduct.value)
    this.send.changeMessage(event)
    localStorage.setItem('profile_bioFamily', this.codeOfConduct.get("profileBio").value)
    localStorage.setItem('code_of_conductFamily', this.codeOfConduct.get("conditions").value)
  }

  Previous() {
    this.codeOfConduct.controls['conditions'].patchValue(true);
    this.codeOfConduct.controls['profileBio'].patchValue(localStorage.getItem('profile_bioFamily'))
  }
}
