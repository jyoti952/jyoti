import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpService } from 'src/app/services/http.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-match-family-popup',
  templateUrl: './match-family-popup.component.html',
  styleUrls: ['./match-family-popup.component.scss']
})
export class MatchFamilyPopupComponent implements OnInit {
  public loading = false;
  constructor(private httpservice:HttpService,private route: ActivatedRoute, private router: Router) { }
  closeMatchFamilyPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('family-match-popup-open'); html.classList.remove('family-match-popup-open');
  }
  closeProfileDetailSidebar() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('profile-detail-sidebar-open'); html.classList.remove('profile-detail-sidebar-open');
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.closeMatchFamilyPopup();
    }
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=>{
    
      var id = parseInt(params.get('id'));
    
     // console.log('id',this.route)
      if(!isNaN(id)){
    
      
      this.getbrowseFamilyId(id);
      }

      
    });
    this.getelfProfile();
  }
  
  id:any;
  familyInfobyId:any;
  browseFamilyById:any;
  photo:any;
  name:any;
  getbrowseFamilyId(id) {
    this.httpservice.getbrowseFamilyById(id).subscribe(response => {
      this.browseFamilyById = response;
      this.familyInfobyId = this.browseFamilyById.data.family_profile
    this.photo=this.familyInfobyId.photo;
   // this.name=this.familyInfobyId.name;
    this.name=this.familyInfobyId.name;
     // console.log("familybyidd", this.familyInfobyId)
 
    })

  }
  getdata: any;
  elfData: any;
  image:any;
  elf_id:any;
  getelfProfile() {
    this.httpservice.getelfData().subscribe(response => {
      this.getdata = response;
      this.elfData = this.getdata.data.elf_profile
      this.image = this.elfData.photo;
     // this.elf_id = this.elfData.user_id;
      this.elf_id = this.elfData.id;
     // console.log("getdataElf", this.elfData)

    })
  }



  matchFamily: any;
  matchwithFamily() {
    this.loading=true;
    let data = {}
    data['elf_profile_id'] = this.elf_id;
    data['family_profile_id'] = this.familyInfobyId.id;

    this.httpservice.matchFamily(data).subscribe(response => {
      this.loading=false;
      this.matchFamily = response;
     // console.log(this.matchFamily);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: ' ElfFamilyMatch has been created successfully',
        showConfirmButton: false,
        timer: 1000
      })
      this.router.navigate(['/browse-family']);
    })
  }

}
