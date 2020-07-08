import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
import { OrderPipe } from 'ngx-order-pipe';
import { Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-family-signed-up',
  templateUrl: './family-signed-up.component.html',
  styleUrls: ['./family-signed-up.component.scss']
})
export class FamilySignedUpComponent implements OnInit {

  p: number = 1;
  public loading = false;
  overlay:boolean=false;
  sidebar:boolean=false;
  filterFamily:FormGroup;
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
  count:number=0;
  removeFilters:any;
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

  constructor(private httpservice: HttpService, private orderPipe: OrderPipe, private router: Router,private fb:FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.getnewFamily();
    this.filterFamily = this.fb.group({
      familyPreferences: [null],
      organization: [null],
      location: [null]
     });
  }

  getdata: any;
  signedUpFamilies: any = [];
  order: any;
  getnewFamily() {
    this.httpservice.getnewfamilydata().subscribe(response => {
      this.loading = false;
      this.getdata = response;
      this.signedUpFamilies = this.getdata.data.family_profiles;
      console.log(this.signedUpFamilies)
      // console.log("signedUpFamilies", this.signedUpFamilies)
      // console.log(this.orderPipe.transform(this.signedUpFamilies,));
    })
  }

  getnewfamilysbyid(families) {
    this.router.navigate(['/admin/family-signed-up/profile', families.id]);
  }

  approveFamily(families) {
    let obj = {}
    obj['family_id'] = families.id,
    obj['status'] = "Approved"

    this.httpservice.approvefamily(obj).subscribe(response => {
      this.getdata = response;
      //console.log(this.getdata)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Approve family successfully',
        showConfirmButton: false,
        timer: 1000,
      })
      this.loading = false;
      this.getnewFamily();
    })

    this.loading = false;
    this.getnewFamily();

  }

  declineFamily(families) {
    let obj = {}
    obj['family_id'] = families.id,
    obj['status'] = "Declined"
    this.httpservice.declinefamily(obj).subscribe(response => {
      this.getdata = response;
      //console.log("Declined",obj)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'declined family successfully',
        showConfirmButton: false,
        timer: 1000
      })
      this.loading = false;
      this.getnewFamily();
    })
    this.loading = false;
    this.getnewFamily();
  }

  applyChanges(obj){
    this.loading=true;
    this.filter=true;
    this.count=3;
    let filter_params={family_prefernces:obj.familyPreferences,organization:obj.organization,location:obj.location};
    for(var counts in filter_params){ if(filter_params[counts]==null){this.count--;}}
    this.httpservice.filterFamilySignup(filter_params).subscribe(response => { 
    if(response.success == false){
     this.loading=false;
     this.recordsCheck=true;  
     this.overlay=false;
     this.sidebar=false;
     this.signedUpFamilies=response.data;
    } else {
    this.loading=false;
    this.recordsCheck=false; 
    this.browseFamily = response;
    this.overlay=false;
    this.sidebar=false;
    this.signedUpFamilies = this.browseFamily.data.family_profiles;
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
