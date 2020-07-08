import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {
  public loading = false;
  elfOnboarding: any;
  clickPrevious: any;

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
  public organisationsWaterMark = 'Select organisation ';
  // public sorting: string = 'Ascending'; 
  public organisationsDefault = ['No Affiliation'];



  constructor(private httpservice: HttpService, private router: Router) {


  }

  // public organisations: FormGroup;


  organisations = new FormGroup({
    organisation: new FormControl(this.organisationsDefault, Validators.required)
  });


  ngOnInit() {
    this.organisations.valueChanges.subscribe(form => { localStorage.setItem('form', JSON.stringify(form)) });
    let formValues = localStorage.getItem('form');
    if (formValues) {
      this.applyFormValues(this.organisations, JSON.parse(formValues));
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


  elfPhoto: any;
  elfPhotoId = +localStorage.getItem('elfPhotoId')
  getelfphoto() {
    if (this.elfPhotoId) {
      this.httpservice.getElfphoto().subscribe((data: any) => {

        this.elfPhoto = this.elfPhoto.data.elf_profile.photo;



        // console.log("elfPhoto",this.elfPhoto)
      })
    }


  }

  onSubmit() {
    //localStorage.setItem('organisation', this.organisations.get("organisation").value)
    this.loading = true;
    let obj = {}
    obj['user_name'] = localStorage.getItem('userName');
    obj['is_anonymous'] = localStorage.getItem('radio');
    obj['family_preference'] = localStorage.getItem('familyPreferences');
    obj['address_line1'] = localStorage.getItem('addressLine1Elf');
    obj['address_line2'] = localStorage.getItem('addressLine2Elf');
    obj['postal_code'] = localStorage.getItem('postalCodeElf');
    obj['city'] = localStorage.getItem('cityElf');
    obj['state'] = localStorage.getItem('locationsElf');
    obj['budget'] = localStorage.getItem('budget');
    obj['organisation'] = this.organisations.get("organisation").value;
    obj['profile_bio'] = localStorage.getItem('profile_bio');
    obj['code_of_conduct'] = localStorage.getItem('code_of_conduct');
    obj['photo'] = this.elfPhoto;

    // if (localStorage.getItem('image') == null) {
    //   delete obj['photo']
    //   obj['photo'] = localStorage.getItem('defaultimage');
    // }

    // else if (localStorage.getItem('defaultimage') == null) {
    //   delete obj['photo']
    //   obj['photo'] = localStorage.getItem('image');
    // }
    // console.log(obj)

    this.httpservice.onboardingElf(obj).subscribe((data: any) => {
      this.loading = false;
      this.elfOnboarding = data;
      //console.log("elfOnboarding", this.elfOnboarding);

      localStorage.setItem('existing_elf_user', this.elfOnboarding.data.elf_profile.existing_elf_user);

      if (this.elfOnboarding['statusCode'] == 200) {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Elf Profile have been created successfully!',
          showConfirmButton: false,
          timer: 1000
        })
        this.router.navigate(['/browse-family']);
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Invalid data',
          showConfirmButton: false,
          timer: 1000
        })
      }
    });

  }
}
