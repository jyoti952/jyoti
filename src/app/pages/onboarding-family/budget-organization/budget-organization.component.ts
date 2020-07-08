import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-budget-organization',
  templateUrl: './budget-organization.component.html',
  styleUrls: ['./budget-organization.component.scss']
})
export class BudgetOrganizationComponent implements OnInit {
  public loading = false;
  familyOnboarding: any;
  public organisationsData = [
    { Name: 'No Affiliation' },
    { Name: 'Adoption is Love Fund' },
    { Name: 'Miracle Families' },
    { Name: 'New Alternatives' },

    { Name: 'NYC Together' },
    { Name: 'Original 22nd Street Letters' },
    { Name: 'Poverty Alleviation Charity' },

  ];
  public organisationsFields = { text: 'Name' };
  public organisationsWaterMark = 'Select organisations';
  //public sorting: string = 'Ascending'; 
  public organisationsDefault = ['No Affiliation'];
  a: string;

  constructor(private httpservice: HttpService, private router: Router, private formBuilder: RxFormBuilder, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.budgetandOrg.valueChanges.subscribe(form => { localStorage.setItem('form', JSON.stringify(form)) });
    let formValues = localStorage.getItem('form');
    if (formValues) {
      this.applyFormValues(this.budgetandOrg, JSON.parse(formValues));
    }
    this.photoid = localStorage.getItem('photoid');
    this.santaid = localStorage.getItem('santaid');
    this.getfamilyPhoto();

    this.getsantaLetter();
  }


  base64Santa: any;
  getsanta: any;
  santaid: any;
  getsantaLetter() {


    if (this.santaid == null) {

    } else {

      this.httpservice.getSanta(this.santaid).subscribe((data: any) => {
        // console.log("data",data)
        this.getsanta = data;

        this.base64Santa = this.getsanta.data.family_profile.santa_letter;
        // console.log("base64Santa",this.base64Santa)
        // console.log("getsanta",this.getsanta)


      })
    }

  }
  photoid: any;
  base64photo: any;
  getfamily: any;

  getfamilyPhoto() {
    if (this.photoid == null) {

    } else {

      this.httpservice.getFamilyphoto(this.photoid).subscribe((data: any) => {

        this.getfamily = data;

        this.base64photo = this.getfamily.data.family_profile.photo
        // console.log("base64familyphoto",this.base64photo)
        // console.log("getphoto",this.getfamily)



      })
    }
  }

  private applyFormValues(group, formValues) {
    Object.keys(formValues).forEach(key => {
      let formControl = <FormControl>group.controls[key];

      if (formControl instanceof FormGroup) {
        this.applyFormValues(formControl, formValues[key]);
      } else {
        formControl.setValue(formValues[key]);
      }
    });
  }

  budgetandOrg = new FormGroup({
    organisation: new FormControl(this.organisationsDefault, Validators.required),
    budget: new FormControl(''),
    facebookLink: new FormControl(''),
  });


  onpagechange(data) {
    if (data.facebookLink != "" && data.facebookLink != null) {
      window.open(data.facebookLink, '_blank')
      return true
    }
  }

  onSubmit() {
    this.a = localStorage.getItem('finalsubmit')
    this.a = 'false';
    localStorage.setItem('finalsubmit', this.a);
    localStorage.setItem('organisationFamily', this.budgetandOrg.get("organisation").value);
    localStorage.setItem('facebookLink', this.budgetandOrg.get("facebookLink").value)

    this.loading = true;
    let obj = {}
    obj['profile_bio'] = localStorage.getItem('profile_bioFamily');
    obj['code_of_conduct'] = localStorage.getItem('code_of_conductFamily');
    obj['amazon_wishlist'] = localStorage.getItem('amazonLink');
    obj['facebook_link'] = localStorage.getItem('facebookLink');
    obj['address_line1'] = localStorage.getItem('addressLine1');
    obj['address_line2'] = localStorage.getItem('addressLine2');
    obj['postal_code'] = localStorage.getItem('postalCode');
    obj['city'] = localStorage.getItem('city');
    obj['state'] = localStorage.getItem('locationsFamily');
    obj['budget'] = localStorage.getItem('budgetFamily');
    obj['number_of_boys'] = localStorage.getItem('number_of_boys');
    obj['number_of_girls'] = localStorage.getItem('number_of_girls');
    obj['age_of_boys'] = localStorage.getItem('age_of_boys');
    obj['age_of_girls'] = localStorage.getItem('age_of_girls');
    obj['age_of_nonbinary'] = localStorage.getItem('boyorgirlAge');
    obj['nonbinary_count'] = localStorage.getItem('binarycount');
    obj['organisation'] = this.budgetandOrg.get("organisation").value;
    obj['name'] = localStorage.getItem('name');
    obj['photo'] = this.base64photo;
    obj['santa_letter'] = this.base64Santa;
    // if (localStorage.getItem('profileImage') == null) {
    //   delete obj['photo']
    //   obj['photo'] = localStorage.getItem('profileWebcamImage');
    // }

    // else if (localStorage.getItem('profileWebcamImage') == null) {
    //   delete obj['photo']
    //   obj['photo'] = localStorage.getItem('profileImage');
    // }


    // obj['santa_letter'] = localStorage.getItem('uploadImage');

    // if (localStorage.getItem('uploadImage') == null) {
    //   delete obj['santa_letter']
    //   obj['santa_letter'] = localStorage.getItem('webcamImage');
    // }

    // else if (localStorage.getItem('webcamImage') == null) {
    //   delete obj['santa_letter']
    //   obj['santa_letter'] = localStorage.getItem('uploadImage');
    // }


    // console.log(obj)


    this.httpservice.onboardingFamily(obj).subscribe((data: any) => {
      this.loading = false;
      this.familyOnboarding = data;

      //console.log("familyOnboarding", this.familyOnboarding.data.family_profile.existing_family_user);
      localStorage.setItem('existing_family_user', this.familyOnboarding.data.family_profile.existing_family_user);
      localStorage.setItem('family_profile_status', this.familyOnboarding.data.family_profile.family_profile_status);

      if (this.familyOnboarding['statusCode'] = 200) {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Family Profile have been created successfully!',
          showConfirmButton: false,
          timer: 1000
        })
        this.router.navigate(['/onboarding/family/thank-you']);
      }

    });
  }
}

