import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-elfs',
  templateUrl: './elfs.component.html',
  styleUrls: ['./elfs.component.scss']

})
export class ElfsComponent implements OnInit {

  public loading = false;
  searchValue: any;
  p: number = 1;
  flagPopup:boolean=false;
  elf:FormGroup;
  elfForm:FormGroup;
  id:any;
  overlay:boolean=false;
  sidebar:boolean=false;
  recordsCheck:boolean=false;
  browseFamily:any;
  names:any;
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
  filter:boolean=false;
  count:number=0;
  public stateData = [
    'Anywhere',
    "Alabama",
    "Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida",
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
  user_ID: any;
  user_NAME: any;
  removeFilters:any;



  constructor(private httpservice: HttpService,private router:Router,private fb:FormBuilder) { }

  ngOnInit() {
    this.loading=true;
    this.getelfprofiles();

    this.elf = this.fb.group({
      familyPreferences: [null],
      organization: [null],
      location: [null]
     });

     this.elfForm = this.fb.group({
      flag_reason: [null],
      flag_additional_info: [null],
     });
  }

  getdata:any = [];
  elfProfiles:any;
  image:any;
  name:any;

  getelfprofiles() {
    this.loading=true;
    this.httpservice.getelfprofilesinAdmin().subscribe(response => {
      this.loading = false;
      this.getdata = response;
      console.log(this.getdata);
       this.elfProfiles = this.getdata.data.elf_profiles;

      //console.log("getdataElf", this.getdata)
      //console.log("elfProfiles", this.elfProfiles)
    })
  }

  elfProfilebyid(families) {
    this.router.navigate(['/admin/elf/profile', families.id]);
  }

  openFlaggedUserPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.add('flagged-user-popup-open'); html.classList.add('flagged-user-popup-open');
  }

  gotoConversation(families){


    this.router.navigate(['/admin/conversations', families.id], {queryParams: {id: families.user_id}});

    this.user_ID=families.user_id;
    this.user_NAME=families.user_name


    localStorage.setItem('adminuser',  this.user_ID);
    localStorage.setItem('adminusername',  this.user_NAME);
  }

  flaggedPopup(families){

   this.flagPopup=!this.flagPopup;
   this.id=families.user_id;
   this.names=families.user_name;
  }

  familyFlagData(formData){
    formData.user_id=this.id;
    this.httpservice.addFlagToElf(formData).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Flag added successfully',
        showConfirmButton: false,
        timer: 1000
      })
      this.elfForm.reset();
      this.getelfprofiles();
      this.flagPopup=false;
    })
  }

  applyChanges(obj){
    this.loading=true;
    this.filter=true;
    this.count=3;
    let filter_params={family_prefernces:obj.familyPreferences,organization:obj.organization,location:obj.location};
    for(var counts in filter_params){ if(filter_params[counts]==null){this.count--;}}
    this.httpservice.filterelfprofilesinAdmin(filter_params).subscribe(response => {
    if(response.success == false){
     this.loading=false;
     this.recordsCheck=true;
     this.overlay=false;
     this.sidebar=false;
     this.elfProfiles=[];
    } else {
    this.loading=false;
    this.recordsCheck=false;
    this.browseFamily = response;
    this.overlay=false;
    this.sidebar=false;
    this.elfProfiles = this.browseFamily.data.elf_profiles;
    }
    })
  }

  openFilterSidebar() {
    this.overlay=true;
    this.sidebar=true;
  }

 closeFilterSidebar(){
    this.overlay=false;
    this.sidebar=false;
  }

 removeFilter(value) {
  this.removeFilters = this.elf.value;
 // this.removeFilters = { familyPreferences: this.familyPreferences, organization: this.organization, location: this.location };
  for (var key in this.removeFilters) {
    if(value.constructor==Array && key=='organization'){
      this.removeFilters['organization']= null;
      this.elf.controls['organization'].reset();
      setTimeout(() => {
        this.elf.controls['organization'].reset();
      }, 10);
    }
    if (this.removeFilters[key] == value) {
      this.removeFilters[key] = null; this.elf.controls[key].reset();
    }
  }
  this.applyChanges(this.removeFilters);
}


}
