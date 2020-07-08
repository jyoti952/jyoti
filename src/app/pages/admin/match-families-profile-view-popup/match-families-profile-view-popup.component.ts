import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-match-families-profile-view-popup',
  templateUrl: './match-families-profile-view-popup.component.html',
  styleUrls: ['./match-families-profile-view-popup.component.scss']
})
export class MatchFamiliesProfileViewPopupComponent implements OnInit {

  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

   this.route.paramMap.subscribe((params: ParamMap) => {
    var id = parseInt(params.get('id'));
    //console.log('id', this.route)
    if (!isNaN(id)) {
      this.getmatchedfamilybyid(id);
    }

  });

}


approvedFamilys:any;
approvedFamilysbyId:any;
name:any;
santa_letter:any;
photo:any;
state:any;
getmatchedfamilybyid(id) {

  this.httpservice.approvedfamilydatabyid(id).subscribe(response => {
  
    this.approvedFamilys = response;
    this.approvedFamilysbyId = this.approvedFamilys.data.family_profile
    this.santa_letter=this.approvedFamilysbyId.santa_letter;

    this.name=this.approvedFamilysbyId.name;
    this.photo=this.approvedFamilysbyId.photo;
    this.state=this.approvedFamilysbyId.state;
    //console.log("matchedfamilys", this.approvedFamilysbyId)
   
  })

}
  closeLetterProfileViewPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('letter-profile-view-popup-open'); html.classList.remove('letter-profile-view-popup-open');
  }

}
