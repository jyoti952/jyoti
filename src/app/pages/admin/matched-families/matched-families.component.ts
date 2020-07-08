import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matched-families',
  templateUrl: './matched-families.component.html',
  styleUrls: ['./matched-families.component.scss']
})
export class MatchedFamiliesComponent implements OnInit {


  public loading = false;
  searchValue :any
  p: number = 1;
  admindata: any;
  flagPopup:boolean=false;
  overlay:boolean=false;
  sidebar:boolean=false;
  matchedFamily:FormGroup;
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
  recordsCheck:boolean=false;
  browseFamily:any;
  familyInfo:any=[];
  filter:boolean=false;
  familySignedUp:any;
  elfForm:FormGroup;
  id:any;
  name:any;
  removeFilters:any;
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

  constructor(private httpservice: HttpService,private router:Router,private orderPipe: OrderPipe,private fb:FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.approvedFamily();
    //this.declinedfamily();
    //this.matchedFamilys();
    this.matchedFamily = this.fb.group({
      familyPreferences: [null],
      organization: [null],
      location: [null]
     });

     this.elfForm = this.fb.group({
      flag_reason: [null],
      flag_additional_info: [null],
     });

  }


  getmatchedprofiles(families) {
    this.router.navigate(['/admin/matched-families/profile', families.id]);
  }


  getdata:any;

 async approvedFamily() {
    await this.httpservice.approvedfamilydata().subscribe(response => {
      this.loading = false;
      this.getdata = response;
       this.approvedFamilies = this.getdata.data.family_profiles;
       this.array.push(this.approvedFamilies)
      console.log("approvedfamilys", this.approvedFamilies)

    })
  }


  array:any=[]
  approvedFamilies:any;
  declinedfamilys:any;
  // declinedfamily(){

  //   this.httpservice.declinedfamilydata().subscribe(response => {
  //     this.loading = false;
  //     this.getdata = response;
  //      this.declinedfamilys = this.getdata.data.family_profiles
  //     this.array.push(this.declinedfamilys)
  //     //console.log("declinedfamilydata", this.declinedfamilys)

  //   })

  // }

  // matchedFamilysdata:any;
  // matchedFamilys(){

  //   this.httpservice.matchedfamilydata().subscribe(response => {
  //     this.loading = false;
  //     this.getdata = response;
  //      this.matchedFamilysdata = this.getdata.data.family_profiles
  //     this.array.push(this.matchedFamilysdata)


  //     //console.log("matched", this.matchedFamilysdata)

  //   })
  // }

  // conversastion(families) {
  //   this.router.navigate(['/admin/conversations', families.id]);
  // }


  getmatcheddata:any;
  matchedProfiles:any;
  order:any;
  // getmatchedFamily() {
  //   this.httpservice.getmatcheddata().subscribe(response => {
  //     this.loading = false;
  //     this.getmatcheddata = response;
  //      this.matchedProfiles = this.getmatcheddata.data.family_profiles
  //       console.log("matcheddata", this.getmatcheddata)
  //     //console.log(this.orderPipe.transform(this.matchedProfiles, this.order));

  //   })

  // }

  gotoConversation(families){
    this.router.navigate(['/admin/conversations', families.id], {queryParams: {id: families.user_id}});
   }

  openFilterSidebar() {
    this.overlay=true;
    this.sidebar=true;
 }

 closeFilterSidebar(){
    this.overlay=false;
    this.sidebar=false;
 }

 flaggedPopup(families){
   this.flagPopup=!this.flagPopup;
   this.id=families.user_id;
   this.name=families.name;
 }

 familyFlagData(formData){
  formData.user_id=this.id;
  this.httpservice.addFlagToElf(formData).subscribe(response => {
    this.loading = false;
    // const family = this.approvedFamilies.findIndex(family => family.id === response.id);
    // this.approvedFamilies.splice(family, 1);
    this.approvedFamily();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Flag added successfully',
      showConfirmButton: false,
      timer: 1000
    })
    this.elfForm.reset();
    this.flagPopup=false;
  })
}


 applyChanges(obj){

  this.loading=true;
  this.filter=true;
  this.count=3;
  let filter_params={family_prefernces:obj.familyPreferences,organization:obj.organization,location:obj.location};
  for(var counts in filter_params){ if(filter_params[counts]==null){this.count--;}}
  this.httpservice.filterFamilys(filter_params).subscribe(response => {
  if(response.success == false){
   this.loading=false;
   this.recordsCheck=true;
   this.overlay=false;
   this.sidebar=false;
   this.approvedFamilies=response.data;
   } else {
  this.loading=false;
  this.recordsCheck=false;
  this.browseFamily = response;
  this.overlay=false;
  this.sidebar=false;
  this.approvedFamilies = this.browseFamily.data.family_profiles;
  }
  })
  
}

removeFilter(value) {
  this.removeFilters = this.matchedFamily.value;
 // this.removeFilters = { familyPreferences: this.familyPreferences, organization: this.organization, location: this.location };
  for (var key in this.removeFilters) {
    if(value.constructor==Array && key=='organization'){
      this.removeFilters['organization']= null;
      this.matchedFamily.controls['organization'].reset();
      setTimeout(() => {
        this.matchedFamily.controls['organization'].reset();
      }, 10);
    }
    if (this.removeFilters[key] == value) {
      this.removeFilters[key] = null; this.matchedFamily.controls[key].reset();
    }
  }
  this.applyChanges(this.removeFilters);
}



}
