import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-family-preferences',
  templateUrl: './family-preferences.component.html',
  styleUrls: ['./family-preferences.component.scss']
})
export class FamilyPreferencesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
 
if(localStorage.getItem('familyPreferences')==null){
  
}
else{
  this.Previous()
}
  }
  familyPref = new FormGroup({
    familyPreferences: new FormControl('boy and girl'),
  });

  onSubmit() {
    //console.log(this.familyPref.value)
    localStorage.setItem('familyPreferences', this.familyPref.get("familyPreferences").value)
   if(this.familyPref.get("familyPreferences").value=='boy'){
    localStorage.setItem('budget','$25')
   }
   else if(this.familyPref.get("familyPreferences").value=='girl'){
    localStorage.setItem('budget','$25')
   }
   else if(this.familyPref.get("familyPreferences").value=='boy and girl'){
    localStorage.setItem('budget','$50')
   }

  }
  Previous(){
    this.familyPref.controls['familyPreferences'].patchValue(localStorage.getItem('familyPreferences'))
  }

}
