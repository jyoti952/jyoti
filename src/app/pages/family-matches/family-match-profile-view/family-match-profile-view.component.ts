import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';




@Component({
  selector: 'app-family-match-profile-view',
  templateUrl: './family-match-profile-view.component.html',
  styleUrls: ['./family-match-profile-view.component.scss']
})
export class FamilyMatchProfileViewComponent implements OnInit {

  id: any;
  elf_id: any;
  getelfprofileMatch: any;
  public elfmatchdata:any = []
  public elfdata : any;
  public loading = false;
  role:any;
  family: any;
  activatedRoute: any;
  data: any;
  santaLetter:any;
  users:any;
  location:any;
  popup:boolean=false;
  profile:any;



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

  conversationsList = [
    {
      img: 'assets/images/user07.png',
      username: 'Melany',
      time: '2:31 PM',
      chat: 'It\'s still sending.',
      status: true,
    },
    {
      img: 'assets/images/user08.png',
      username: 'Katelynn',
      time: '29 Jul',
      chat: 'I will upload the letter.',
      status: false,
    },
    {
      img: 'assets/images/user09.png',
      username: 'Marta',
      time: '29 Jul',
      chat: 'Lorem Ipsum is simply',
      status: true,
    },
  ];

  browseFamilyById: any;
  familyInfobyId: any;
  familyData: any;
  getdata: any;
  elfdatas:any;
  images:any;
  locations:any;
  
  constructor(private httpservice: HttpService,private route: ActivatedRoute, private router: Router) { 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {    
    this.getelfprofilematch()
    this.getelfProfile()
    this.route.paramMap.subscribe((params: ParamMap) => {
      var id = parseInt(params.get('id'));
      //console.log('id', this.route)
      if (!isNaN(id)) {
        this.getbrowseFamilyId(id);
        this.getSelectedProfile(id)
      }
    });
  }



  openLetterProfileViewPopup() {
   this.popup=true;
  }

  closeProfileDetailSidebar() {
    this.popup=false;
  }

  closeLetterProfileViewPopup(){
    this.popup=false;
  }

//=================family matches==========//

getelfprofilematch(){
  let id;
  this.id = localStorage.getItem('id')
 // console.log(this.id)
 // console.log(localStorage.getItem(('id')))
  this.httpservice.elfprofileMatch(this.id).subscribe(response => {
    this.loading = false;
    this.elfmatchdata = response.data.family_profiles;
    this.elfdata = response.data
   // console.log(this.elfdata)
    //console.log("data", this.elfmatchdata)
  })
}

user: any;

getbrowseFamilyId(id) {
  this.httpservice.getbrowseFamilyById(id).subscribe(response => {
    this.loading = false
    this.browseFamilyById = response;
    this.familyInfobyId = this.browseFamilyById.data.family_profile;
    //console.log("familybyidd", this.familyInfobyId)
    //console.log('browseFamilyById', this.browseFamilyById)
  })
}

getSelectedProfile(id){
  this.httpservice.getSelectedfamilyProfile(id).subscribe(response => {
  // console.log(response)
    this.familyData = response.data.family_profile;
    this.profile=this.familyData.photo;
    this.users=this.familyData.user_name
    this.location=this.familyData.city;
    localStorage.setItem('data', this.familyData);
  })
}

getelfProfile() {
  this.httpservice.getelfData().subscribe(response => {
    this.getdata = response;
    this.elfdatas = this.getdata.data.elf_profile
    this.images = this.elfdatas.photo;
    this.user = this.elfdatas.user_name;
    this.locations = this.elfdatas.state;
  
  
  })
}


}

  

