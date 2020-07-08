import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-family-information',
  templateUrl: './family-information.component.html',
  styleUrls: ['./family-information.component.scss']
})
export class FamilyInformationComponent implements OnInit {
  count: number = 0;
  status = true;
  boyOneAge: any
  buttonStatus: boolean = true;
  public counterBoy: number = 0;
  public counterGirl: number = 0;
  public counterBoth: number = 0;
  valueChangeFirstBoy(value: number) {
    this.boyOneAge = value;
    console.log('boyOneAge', this.boyOneAge)
    localStorage.setItem('boyOneAge', this.boyOneAge);
    console.log(localStorage.getItem('boyOneAge'))
  }

  boyTwoAge: any
  valueChangeSecondBoy(value: number) {
    this.boyTwoAge = value;
    console.log('boyTwoAge', this.boyTwoAge)
    localStorage.setItem('boyTwoAge', this.boyTwoAge);
    console.log(localStorage.getItem('boyTwoAge'))
  }

  girlOneAge: any
  valueChangeFirstGirl(value: number) {
    this.girlOneAge = value;
    console.log('girlOneAge', this.girlOneAge)
    localStorage.setItem('girlOneAge', this.girlOneAge);
    console.log(localStorage.getItem('girlOneAge'))
  }


  girlTwoAge: any
  valueChangeSecondGirl(value: number) {
    this.girlTwoAge = value;
    console.log('girlTwoAge', this.girlTwoAge)
    localStorage.setItem('girlTwoAge', this.girlTwoAge);
    console.log(localStorage.getItem('girlTwoAge'))
  }

  boyOrGirlAge: any
  valueChangeBoyOrGirl(value: number) {
    this.boyOrGirlAge = value;
    console.log('boyOrGirlAge', this.boyOrGirlAge)
    localStorage.setItem('boyOrGirlAge', this.boyOrGirlAge);
    console.log(localStorage.getItem('boyOrGirlAge'))
  }

  boy1Value = 0;
  boy1Options: Options = {
    floor: 0,
    ceil: 18,
    showSelectionBar: true,
    translate: (value: number): string => {
      return '';
    },
  };

  boy2Value = 0;
  boy2Options: Options = {
    floor: 0,
    ceil: 18,
    showSelectionBar: true,
    translate: (value: number): string => {
      return '';
    },
  };

  girl1Value = 0;
  girl1Options: Options = {
    floor: 0,
    ceil: 18,
    showSelectionBar: true,
    translate: (value: number): string => {
      return '';
    },
  };

  girl2Value = 0;
  girl2Options: Options = {
    floor: 0,
    ceil: 18,
    showSelectionBar: true,
    translate: (value: number): string => {
      return '';
    },
  };
  boyorgirlValue = 0;
  boyOptions: Options = {
    floor: 0,
    ceil: 18,
    showSelectionBar: true,
    translate: (value: number): string => {
      return '';
    },
  };

  // girlValue = 0;
  // girlOptions: Options = {
  //   floor: 0,
  //   ceil: 18,
  //   showSelectionBar: true,
  //   translate: (value: number): string => {
  //     return '';
  //   },
  // };

  //boy1Age: number;



  constructor() { 

  }

  

  ngOnInit() {
    this.patchValue();

  }

  familyPref = new FormGroup({
    boy1Age: new FormControl(localStorage.getItem('boyOneAge')),
    boy2Age: new FormControl(localStorage.getItem('boyTwoAge')),
    girl1Age: new FormControl(localStorage.getItem('girlOneAge')),
    girl2Age: new FormControl(localStorage.getItem('girlTwoAge')),
    boyorgirlAge: new FormControl(localStorage.getItem('boyOrGirlAge')),


  })

 

  incrementBoy() {
    this.counterBoy += 1;
    console.log('counter+boy, no.of boys', this.counterBoy);
    this.buttonStatus = false;
  }

  decrementBoy() {
    this.counterBoy -= 1;
    console.log('counter-boy, no.of boys', this.counterBoy)
  }
  incrementGirl() {
    this.counterGirl += 1;
    console.log('counter+girl, no.of girls', this.counterGirl);
    this.buttonStatus = false;
  }

  decrementGirl() {
    this.counterGirl -= 1;
    console.log('counter-girl, no.of girls', this.counterGirl)
    this.buttonStatus = false;
  }
  incrementBoth() {
    this.counterBoth += 1;
    console.log('counter+both 1', this.counterBoth);
    this.buttonStatus = false;
  }

  decrementBoth() {
    // this.counterBoth += 1;
    this.counterBoth -= 1;
    console.log('counter-both 0', this.counterBoth);
    this.buttonStatus = false;
  }


  number_of_boys: number
  boyages: any;
  girlages: any;
  totalCount: number;
  budget: any;
  totalBudget: any;
  onSubmit(family) {


    this.boyages = [this.familyPref.get('boy1Age').value, this.familyPref.get('boy2Age').value]
    family['age_of_boys'] = this.boyages.toString();
    family['number_of_boys'] = this.counterBoy,


      this.girlages = [this.familyPref.get('girl1Age').value, this.familyPref.get('girl2Age').value]
    family['age_of_girls'] = this.girlages.toString();
    family['number_of_girls'] = this.counterGirl,


    family['boyorgirlAge'] = this.familyPref.get('boyorgirlAge').value
    family['counterBoth'] = this.counterBoth,
      console.log(family)
    localStorage.setItem('age_of_boys', family['age_of_boys'])
    localStorage.setItem('number_of_boys', family['number_of_boys'])
    localStorage.setItem('age_of_girls', family['age_of_girls'])
    localStorage.setItem('number_of_girls', family['number_of_girls'])
    localStorage.setItem('boyorgirlAge', family['boyorgirlAge'])
    localStorage.setItem('binarycount', family['counterBoth'])

    this.totalCount = this.counterBoy + this.counterGirl + this.counterBoth;
    this.budget = this.totalCount * 25
    this.totalBudget = '$' + this.budget
    localStorage.setItem('budgetFamily', this.totalBudget)


  }








  isShown: boolean
  age: number;
  boyorgirl: number;
  patchValue() {

    this.boyorgirl = +localStorage.getItem('boyorgirlAge')

    if (localStorage.getItem('number_of_boys') == '1') {
      this.incrementBoy();
      localStorage.setItem('boy1Age', this.familyPref.get('boy1Age').value);
      this.age = +localStorage.getItem('boy1Age');
      console.log('age', this.age)
      this.familyPref.controls['boy1Age'].patchValue(localStorage.getItem('boy1Age'))
    }



    if (localStorage.getItem('number_of_boys') == '2') {

      this.incrementBoy();
      this.incrementBoy();
      localStorage.setItem('boy2Age', this.familyPref.get('boy2Age').value);
      this.age = +localStorage.getItem('boy2Age');
      console.log('age', this.age)
      this.familyPref.controls['boy2Age'].patchValue(localStorage.getItem('boy2Age'))
    }

    if (localStorage.getItem('number_of_girls') == '1') {
      this.incrementGirl();
      localStorage.setItem('girl1Age', this.familyPref.get('girl1Age').value);
      this.age = +localStorage.getItem('girl1Age');
      console.log('age', this.age)
      this.familyPref.controls['girl1Age'].patchValue(localStorage.getItem('girl1Age'))
    }

    if (localStorage.getItem('number_of_girls') == '2') {
      this.incrementGirl();
      this.incrementGirl();
      localStorage.setItem('girl2Age', this.familyPref.get('girl2Age').value);
      this.age = +localStorage.getItem('girl2Age');
      console.log('age', this.age)
      this.familyPref.controls['girl2Age'].patchValue(localStorage.getItem('girl2Age'))
    }

    if (localStorage.getItem('binarycount') == '1') {
      this.incrementBoth();
      localStorage.setItem('boyorgirlAge', this.familyPref.get('boyorgirlAge').value);
      this.age = +localStorage.getItem('boyorgirlAge');
      console.log('age', this.age)
      this.familyPref.controls['boyorgirlAge'].patchValue(localStorage.getItem('boyorgirlAge'))
    }


  }



}