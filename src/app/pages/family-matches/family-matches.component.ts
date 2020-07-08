import { Component, OnInit} from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-family-matches',
  templateUrl: './family-matches.component.html',
  styleUrls: ['./family-matches.component.scss']
})
export class FamilyMatchesComponent implements OnInit {


  user: string;
  locations: string;
  image: string;
  getelfprofileMatch: any;
  id: any;
  elf_id: any;
  overlay: boolean = false;
  sidebar: boolean = false;
  public elfmatchdata: any = []
  public elfdata: any;
  public loading = false;
  filterFamily: FormGroup;
  flagPopup: boolean = false;
  unmatch: FormGroup;

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
  recordsCheck: boolean = false;
  browseFamily: any;
  familyInfo: any = [];
  filter: boolean = false;
  flagName: any;
  user_id: any;
  count:number=0;
  elfForm: FormGroup;
  unmatched: boolean = false;
  userid: any;
  removeFilters: any;

  public stateData = [
    'Anywhere',
    "Alabama",
    "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
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


  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    
  }

  

  ngOnInit() {

    this.loading = true;
    this.getelfprofilematch()
    this.getelfProfile();

    this.filterFamily = this.fb.group({
      familyPreferences: [null],
      organization: [null],
      location: [null]
    });

    this.elfForm = this.fb.group({
      flag_reason: [null],
      flag_additional_info: [null],
    });

    this.unmatch = this.fb.group({
      unmatch_reason: [null, [Validators.required]]
    })

  }


  getdata: any;
  elfData: any;
  elf_profile_id: any



  getelfProfile() {
    this.httpservice.getelfData().subscribe(response => {
      this.loading = false;
      this.getdata = response;
      // console.log(response)
      this.elfData = this.getdata.data.elf_profile
      this.image = this.elfData.photo;
      this.user = this.elfData.user_name;
      this.locations = this.elfData.state;
      this.elf_id = this.elfData.id;
      // console.log(this.elfData.id)
      // console.log("getdataElf", this.elfData)
      localStorage.setItem('id', this.elfData.id);
    })
  }

  getelfprofilematch() {
    this.loading = true;
    let id;
    this.id = localStorage.getItem('id');
    // console.log(this.id)
    // console.log(localStorage.getItem(('id')))
    this.httpservice.elfprofileMatch(this.id).subscribe(response => {
      this.loading = false;
      this.elfmatchdata = response.data.family_profiles;
      this.elfdata = response.data;
      // console.log("data", this.elfmatchdata)
    })
  }

  closeFilterSidebar() {
    this.overlay = false;
    this.sidebar = false;
  }

  matchFilter() {
    this.overlay = true;
    this.sidebar = true;
  }

  openflag(data) {
    this.flagPopup = true;
    this.flagName = data.name
    this.user_id = data.user_id;
  }

  closeflag() {
    this.flagPopup = false;
  }



  newMatchedFlagData(formData) {
    formData.user_id = this.user_id;
    this.httpservice.addFlagToElf(formData).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Flag added successfully',
        showConfirmButton: false,
        timer: 1000
      })
      this.flagPopup = false;
      this.getelfprofilematch();
    })
  }

  applyChanges(obj) {
    this.loading=true;
    this.filter = true;
    this.count=3;
    let filter_params = { family_prefernces: obj.familyPreferences, organization: obj.organization, location: obj.location };
    for(var counts in filter_params){ if(filter_params[counts]==null){this.count--;}}
    var id=localStorage.getItem('id');
    this.httpservice.elfMatches(filter_params,id).subscribe(response => {
      this.loading=false;
      if (response.message == 'No records found') {
        this.recordsCheck = true;
        this.overlay = false;
        this.sidebar = false;
        this.elfmatchdata = [];
      } else {
        this.recordsCheck = false;
        this.browseFamily = response;
        this.overlay = false;
        this.sidebar = false;
        this.elfmatchdata = this.browseFamily.data.family_profiles;
      }
    })
  }


  unmatching(formdata) {
    formdata.family_profile_id = this.userid;
    this.httpservice.addUnMatched(formdata).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'unmatched successfully',
        showConfirmButton: false,
        timer: 1200
      })
      this.unmatched = false;
      this.flagPopup = false;
      this.getelfprofilematch();
    })
  }

  openflagUnMatched(data) {
    this.userid = data.id;
    this.unmatched = true;
    this.flagName = data.name
  }
  closeUnmatchFamilyPopup() {
    this.unmatched = false;
  }

  removeFilter(value) {
    this.removeFilters = this.filterFamily.value;
   // this.removeFilters = { familyPreferences: this.familyPreferences, organization: this.organization, location: this.location };
    for (var key in this.removeFilters) {
      if(value.constructor==Array && key=='organization'){
        this.removeFilters['organization']= null;
        this.filterFamily.controls['organization'].reset();
        setTimeout(() => {
          this.filterFamily.controls['organization'].reset();
        }, 10);
      }
      if (this.removeFilters[key] == value) { 
        this.removeFilters[key] = null; this.filterFamily.controls[key].reset(); 
      }
    }
    this.applyChanges(this.removeFilters);
  }

  

}
