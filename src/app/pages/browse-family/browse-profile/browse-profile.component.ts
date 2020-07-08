import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-browse-profile',
  templateUrl: './browse-profile.component.html',
  styleUrls: ['./browse-profile.component.scss']
})
export class BrowseProfileComponent implements OnInit {
  public loading = false;
  getelfprofileMatch: any;
  
  public elfmatchdata:any = []
  public elfdata:any;

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
  id: any;

  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getelfprofilematch();
    this.loading = true;
    this. getelfProfile();
    this.route.paramMap.subscribe((params: ParamMap) => {

      var id = parseInt(params.get('id'));

      //console.log('id', this.route)

      if (!isNaN(id)) {

        this.getbrowseFamilyId(id);
      }

    });
  }

  getdata: any;
  elfData: any;
  image:any;
  user:any;
  locations:any;
  elf_id:any;
  
  getelfProfile() {
    this.httpservice.getelfData().subscribe(response => {
      this.loading = false;
      this.getdata = response;
      this.elfData = this.getdata.data.elf_profile
      this.image = this.elfData.photo;
      this.user = this.elfData.user_name;
      this.locations = this.elfData.state;
      this.elf_id = this.elfData.user_id;
      //console.log("getdataElf", this.elfData)

    })
  }


 
  browseFamilyById:any;
  familyInfobyId:any;
  
  getbrowseFamilyId(id) {

    this.httpservice.getbrowseFamilyById(id).subscribe(response => {
      this.loading = false;
      this.browseFamilyById = response;
      this.familyInfobyId = this.browseFamilyById.data.family_profile

      //console.log("familybyidd", this.familyInfobyId)
      //console.log('browseFamilyById', this.browseFamilyById)
    })

  }


  getelfprofilematch(){
    let id;
    this.id = localStorage.getItem('id')
    //console.log(this.id)
    //console.log(localStorage.getItem(('id')))
    this.httpservice.elfprofileMatch(this.id).subscribe(response => {
      this.loading = false;
      this.elfmatchdata = response.data.family_profiles;
      this.elfdata = response.data
      //console.log(this.elfdata)
      //console.log("data", this.elfmatchdata)
    })
  }


}
