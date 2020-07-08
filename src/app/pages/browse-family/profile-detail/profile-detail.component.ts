import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})

export class ProfileDetailComponent implements OnInit {

  public loading = false;
  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }
  id: any;
  browseFamilyById: any;
  familyInfobyId: any = {};
  organisation: any

  closeProfileDetailSidebar() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('profile-detail-sidebar-open'); html.classList.remove('profile-detail-sidebar-open');
  }
  openMatchFamilyPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.add('family-match-popup-open'); html.classList.add('family-match-popup-open');
  }

  openLetterProfileViewPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.add('letter-profile-view-popup-open'); html.classList.add('letter-profile-view-popup-open');
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const MatchFamilyPopupOpen = (!document.getElementsByTagName('body')[0].classList.contains('family-match-popup-open') &&
      !document.getElementsByTagName('html')[0].classList.contains('family-match-popup-open'));
    if (event.keyCode === 27 && MatchFamilyPopupOpen) {
      this.closeProfileDetailSidebar();
    }
  }

  ngOnInit() {
    this.loading = true;
    this.getelfProfile();
    this.route.paramMap.subscribe((params: ParamMap) => {

      var id = parseInt(params.get('id'));

      //console.log('id', this.route)
   
      if (!isNaN(id)) {
    
        this.getbrowseFamilyId(id);
      }

    });

  }




  user: any;

  getbrowseFamilyId(id) {

    this.httpservice.getbrowseFamilyById(id).subscribe(response => {
      this.loading = false;
      this.browseFamilyById = response;
      this.familyInfobyId = this.browseFamilyById.data.family_profile

     // console.log("familybyidd", this.familyInfobyId)
      //console.log('browseFamilyById', this.browseFamilyById)
    })

  }



  getdata: any;
  elfData: any;
  elf_id: any;

  getelfProfile() {
    this.httpservice.getelfData().subscribe(response => {
      this.getdata = response;
      this.elfData = this.getdata.data.elf_profile

      this.elf_id = this.elfData.user_id;
      //console.log("getelfdatabyid", this.elf_id)

    })
  }




  // matchFamily: any;
  // matchwithFamily() {
  //   let data = {}
  //   data['elf_profile_id'] = this.elf_id;
  //   data['family_profile_id'] = this.familyInfobyId.id;

  //   this.httpservice.matchFamily(data).subscribe(response => {
  //     this.matchFamily = response;
  //     console.log(this.matchFamily);
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: ' ElfFamilyMatch has been created successfully',
  //       showConfirmButton: false,
  //       timer: 1000
  //     })
    

     
  //   })
  // }
}
