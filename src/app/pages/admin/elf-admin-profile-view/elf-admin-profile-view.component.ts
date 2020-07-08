import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-elf-admin-profile-view',
  templateUrl: './elf-admin-profile-view.component.html',
  styleUrls: ['./elf-admin-profile-view.component.scss']
})
export class ElfAdminProfileViewComponent implements OnInit {

  public loading = false;
  showProfile:boolean;

  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {

      var id = parseInt(params.get('id'));

      //console.log('id', this.route)

      if (!isNaN(id)) {

        this.getelfProfileid(id);
      }

    });
  
  }


  getdata: any;
  elfData: any;
  image: any;
  user: any;
  locations: any;
  elf_id: any;
  organisation: any;
  is_anonymous: boolean;
  anonymous: any;
  profile_bio: any;
  family_preference: any;
  id: any;
  email: any;

  getelfProfileid(id) {

    this.httpservice.getelfDatabyid(id).subscribe(response => {
      this.getdata = response;
      this.loading = false;
      this.elfData = this.getdata.data.elf_profile
      this.email = this.elfData.email
      this.image = this.elfData.photo;
      this.user = this.elfData.user_name;
      this.profile_bio = this.elfData.profile_bio
      this.locations = this.elfData.state;
      this.elf_id = this.elfData.user_id;
      this.id = this.elfData.id
      this.organisation = this.elfData.organisation
      this.is_anonymous = this.elfData.is_anonymous
      this.family_preference = this.elfData.family_preference
      if (this.is_anonymous == true) {
        this.anonymous = "yes"
      }
      else if (this.is_anonymous == false) {
        this.anonymous = "no"
      }
      //console.log("getdataElf", this.elfData)

    })

  }

  LetterProfileViewPopup(){
    this.showProfile=!this.showProfile;
  }

  // openLetterProfileViewPopup() {
  //   const body = document.getElementsByTagName('body')[0];
  //   const html = document.getElementsByTagName('html')[0];
  //   body.classList.add('letter-profile-view-popup-open'); html.classList.add('letter-profile-view-popup-open');
  // }

  // closeProfileDetailSidebar() {
  //   const body = document.getElementsByTagName('body')[0];
  //   const html = document.getElementsByTagName('html')[0];
  //   body.classList.remove('profile-detail-sidebar-open'); html.classList.remove('profile-detail-sidebar-open');
  // }

  
  removeFamily(){
    let obj= {"user_id":this.elf_id}
    this.httpservice.removeFamily(obj).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Elves blocked successfully',
        showConfirmButton: false,
        timer: 1500,
      })
      this.router.navigateByUrl('/admin/elf');
    })
  }

}
