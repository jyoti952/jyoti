import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-match-families-profile-view',
  templateUrl: './match-families-profile-view.component.html',
  styleUrls: ['./match-families-profile-view.component.scss']
})
export class MatchFamiliesProfileViewComponent implements OnInit {

  public loading = false;
  familyId: any;
  user_id: any;
  showProfile:boolean=false;

  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {

      var id = parseInt(params.get('id'));
      this.familyId = parseInt(params.get('id'))

      //console.log('id', this.route)

      if (!isNaN(id)) {

        this.getmatchedfamilybyid(id);
      }

    });

  }


  approvedFamilys: any = {};
  approvedFamilysbyId: any = {};

  async getmatchedfamilybyid(id) {
    await this.httpservice.approvedfamilydatabyid(id).subscribe(response => {
      this.loading = false;
      this.approvedFamilys = response;
      this.approvedFamilysbyId = this.approvedFamilys.data.family_profile
      this.user_id = this.approvedFamilys.data.family_profile.user_id;
      //console.log("matchedfamilys", this.approvedFamilysbyId)
    })
  }

  LetterProfileViewPopup() {
   this.showProfile=!this.showProfile;
  }

  // closeProfileDetailSidebar() {
  //   const body = document.getElementsByTagName('body')[0];
  //   const html = document.getElementsByTagName('html')[0];
  //   body.classList.remove('profile-detail-sidebar-open'); html.classList.remove('profile-detail-sidebar-open');
  // }




  removeFamily() {
    let obj = { "user_id": this.user_id }
    this.httpservice.removeFamily(obj).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Family blocked successfully',
        showConfirmButton: false,
        timer: 1000,
      })
      this.router.navigateByUrl('/admin/matched-families');
    })
  }





}
