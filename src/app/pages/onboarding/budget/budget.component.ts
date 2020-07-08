import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  constructor() { }

  checked: boolean = false;

  ngOnInit() {
    if(localStorage.getItem('budget')==null){
  
    }
    else{
      this.Previous()
    }

  }

  budgetPref = new FormGroup({
    budget: new FormControl(''),

  });

  onSubmit() {
   // console.log(this.budgetPref.value)
    localStorage.setItem('budget', this.budgetPref.get("budget").value)
  }

  check(chk) {
    this.checked = true;
   // console.log(chk);
  }

  Previous(){
    this.budgetPref.controls['budget'].patchValue(localStorage.getItem('budget'))
        
  }

}
