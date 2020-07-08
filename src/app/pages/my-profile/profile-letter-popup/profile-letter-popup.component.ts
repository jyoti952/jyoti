import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { SendService } from 'src/app/services/send.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile-letter-popup',
  templateUrl: './profile-letter-popup.component.html',
  styleUrls: ['./profile-letter-popup.component.scss']
})
export class ProfileLetterPopupComponent implements OnInit {

  constructor(private httpservice: HttpService, private send: SendService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {

      var id = parseInt(params.get('id'));

      //console.log('id', this.route)

      if (!isNaN(id)) {

        this.getelfProfileid(id);
      }

    });
  }

  closeLetterProfileViewPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('letter-profile-view-popup-open'); html.classList.remove('letter-profile-view-popup-open');
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
     // console.log("getdataElf", this.elfData)

    })

  }


}
