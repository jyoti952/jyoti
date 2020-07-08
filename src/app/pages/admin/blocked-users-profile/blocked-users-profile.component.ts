import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blocked-users-profile',
  templateUrl: './blocked-users-profile.component.html',
  styleUrls: ['./blocked-users-profile.component.scss']
})
export class BlockedUsersProfileComponent implements OnInit {

  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }

  block_id:any;
  getdata:any;
  boys:any;
  girls:any;
  blockeduser:any;


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.block_id=parseInt(params.get('id'))
    });
        this.getblockedUsers(this.block_id);
  }

  // openLetterProfileViewPopup() {
  //   const body = document.getElementsByTagName('body')[0];
  //   const html = document.getElementsByTagName('html')[0];
  //   body.classList.add('letter-profile-view-popup-open'); html.classList.add('letter-profile-view-popup-open');
  // }

  getblockedUsers(id) {
    this.httpservice.getBlockedbyid(id).subscribe(response => {
      this.getdata = response;
      this.blockeduser = this.getdata.data.user_profile;
      this.boys=this.blockeduser.number_of_boys;
      this.girls=this.blockeduser.number_of_girls;
    });
  }



}
