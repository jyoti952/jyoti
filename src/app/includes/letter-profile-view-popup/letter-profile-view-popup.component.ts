import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-letter-profile-view-popup',
  templateUrl: './letter-profile-view-popup.component.html',
  styleUrls: ['./letter-profile-view-popup.component.scss']
})
export class LetterProfileViewPopupComponent implements OnInit {

  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }
  closeLetterProfileViewPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('letter-profile-view-popup-open'); html.classList.remove('letter-profile-view-popup-open');
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.closeLetterProfileViewPopup();
    }
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {

      var id = parseInt(params.get('id'));

      //console.log('id', this.route)

      if (!isNaN(id)) {

        this.getbrowseFamilyId(id);
      }

    });
  }
  browseFamilyById:any;
  familyInfobyId;any;
  santa_letter:any;
  photo:any;
  name:any;
  state:any;
  getbrowseFamilyId(id) {

    this.httpservice.getbrowseFamilyById(id).subscribe(response => {
      this.browseFamilyById = response;
      this.familyInfobyId = this.browseFamilyById.data.family_profile
      this.santa_letter=this.familyInfobyId.santa_letter;

      this.name=this.familyInfobyId.name;
      this.photo=this.familyInfobyId.photo;
      this.state=this.familyInfobyId.state;
      //console.log("familybyidd", this.familyInfobyId)
      //console.log('browseFamilyById', this.browseFamilyById)
    })

  }

}
