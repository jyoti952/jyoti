import { Component, OnInit,ViewEncapsulation,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { SendService } from 'src/app/services/send.service';
import { OrderPipe } from 'ngx-order-pipe';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-browse-family',
  templateUrl: './browse-family.component.html',
  styleUrls: ['./browse-family.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrowseFamilyComponent implements OnInit {


  public loading = false;
  familyInfobyId: any;
  overlay:boolean=false;
  sidebar:boolean=false;
  id: any;
  browseFamily: any;
  familyInfo: any=[];
  user: any;
  locations: any;
  image: any;
  getelfprofileMatch: any;
  public elfmatchdata:any = []
  public elfdata :any;
  p: number = 1;
  order:any;
  recordsCheck:boolean=false;
  stateDefault :any
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
  familyPreferences:any;
  organization:any;
  searchValue:any;
  location:any;
  filterFamily:FormGroup;
  count:number=0;
  public stateData = [
    'Anywhere',
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    " California",
    " Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
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
  listdata: any = [];
  conversationsList: any = [];
  filter:boolean=false;
  removeFilters:any;

  constructor(private httpservice: HttpService, private send: SendService, private http: HttpClient, private route: ActivatedRoute, private router: Router,private orderPipe: OrderPipe,private fb:FormBuilder) {}


  matchedFamiles = [
    {
      img: 'assets/images/user01.png',
      status: true,
    },
    {
      img: 'assets/images/user02.png',
      status: false,
    },
    {
      img: 'assets/images/profile-dp-lg.png',
      status: false,
    },
    {
      img: 'assets/images/user03.png',
      status: false,
    },
    {
      img: 'assets/images/user04.png',
      status: false,
    },
    {
      img: 'assets/images/user05.png',
      status: true,
    },
    {
      img: 'assets/images/user06.png',
      status: false,
    },
  ];


  conversations_list(){
    this.loading = true;
    this.listdata = [];
    this.conversationsList = [];
    this.httpservice.ConversationslistElfandFamily().subscribe(response => {
      this.loading = false;
      console.log(response);
      const data: any = response;
      for (let i = 0; i < data.data.conversations.length; i++) {
        if (data.data.conversations[i].user_role == 'admin') {
          this.conversationsList.push(data.data.conversations[i]);
        } else {
          this.listdata.push(data.data.conversations[i]);
        }
      }
      console.log(this.listdata);
      console.log(this.conversationsList);
     /*this.listdata = response.data.conversations
     this.conversationsList = response.data.admins*/
    })
  }

  toggleShortlisted(refMatch) {
    refMatch.shortlisted = !refMatch.shortlisted;
  }

  openMatchFamilyPopup(user) {
    this.router.navigate(['/browse-family/profile', user.id]);
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.add('family-match-popup-open'); html.classList.add('family-match-popup-open');
  }


  getdata: any;
  elfData: any;
  getelfProfile() {
    this.httpservice.getelfData().subscribe(response => {
      setTimeout(()=>{
        this.loading = false;
       }, 3000);
      this.getdata = response;
      this.elfData = this.getdata.data.elf_profile
      this.image = this.elfData.photo;
      this.user = this.elfData.user_name;
      this.locations = this.elfData.state;
      this.elf_id = this.elfData.user_id;
      this.elf_id = this.elfData.id;
      //console.log("getdataElf", this.elfData)
      localStorage.setItem('id', this.elf_id);
    })
  }

  openFilterSidebar() {
    // const body = document.getElementsByTagName('body')[0];
    // // const html = document.getElementsByTagName('html')[0];
    // body.classList.add('filter-sidebar-open');
    // // html.classList.add('filter-sidebar-open');
     this.overlay=true;
     this.sidebar=true;

  }

  closeFilterSidebar(){
     this.overlay=false;
     this.sidebar=false;
  }

  getbrowseFamilyId(user) {
    this.router.navigate(['/browse-family/profile', user.id]);
  }

  getbrowseFamily() {
    this.httpservice.getbrowseFamily().subscribe(response => {
      setTimeout(()=>{
        this.loading = false;
    }, 3000);
      this.browseFamily = response;
     // console.log(this.browseFamily);
      this.familyInfo = this.browseFamily.data.family_profiles
     // console.log(this.familyInfo);
      this.state = this.familyInfo.state
      //console.log("family browse", this.browseFamily)
      //console.log("family", this.familyInfo)
    })
  }

  state: any;
  elf_id: any;
  matchFamily: any;
  matchwithFamily() {
    let data = {}
    data['elf_profile_id'] = this.elf_id;
    data['family_profile_id'] = this.familyInfobyId.id;
    this.httpservice.matchFamily(data).subscribe(response => {
      this.loading = false
      this.matchFamily = response;
      //console.log(this.matchFamily)
    })
  }

  searchValues: any;
  onSearchChange(searchValue: string): void {
    //console.log("searchValue", searchValue);
    // this.searchValue = elf_profile_id
  }

  // serchbyState: any;
  // searchFilter(searchValue) {
  //   this.httpservice.serchbyState(searchValue).subscribe(response => {
  //     this.loading = false
  //     this.browseFamily = response;
  //     this.familyInfo = this.browseFamily.data.family_profiles
  //     //console.log("searchData", this.familyInfo)
  //   })
  // }

  getelfprofilematch(){
    let id;
    this.id = localStorage.getItem('id')
    //console.log(this.id)
    //console.log(localStorage.getItem(('id')))
    this.httpservice.elfprofileMatch(this.id).subscribe(response => {
      // location.reload();
      this.loading = false;
      this.elfmatchdata = response.data.family_profiles;
      this.elfdata = response.data
      console.log(this.elfdata)
      //console.log("data", this.elfmatchdata)
    })
  }

  applyChanges(obj){
    this.filter=true;
    this.count=3;
    let filter_params={family_prefernces:obj.familyPreferences,organization:obj.organization,location:obj.location};
    for(var counts in filter_params){ if(filter_params[counts]==null){this.count--;}}
    this.httpservice.filterbrowseFamily(filter_params).subscribe(response => {
    if(response.message == "No records found"){
     this.recordsCheck=true;
     this.overlay=false;
     this.sidebar=false;
     this.familyInfo=[];
    } else {
    this.recordsCheck=false;
    this.browseFamily = response;
    this.overlay=false;
    this.sidebar=false;
    this.familyInfo = this.browseFamily.data.family_profiles;
    }
    })
  }



  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(0);
    };

    this.loading = true;
    this.getbrowseFamily();
    this.getelfprofilematch();

    this.getelfProfile();

    //this.matchwithFamily();
    //this.searchFilter(this.searchValue);
    this.conversations_list()
    this.filterFamily = this.fb.group({
      familyPreferences: [null],
      organization: [null],
      location: [null]
    });

    setTimeout(() => {
      this.getelfprofilematch();
    }, 1000);

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

  /***
   * function for goto conversation
   */
  gotoConversation(data) {
    console.log(data);
    this.router.navigate(['/conversations'], {queryParams: {id: data.user_id}});
  }
}
