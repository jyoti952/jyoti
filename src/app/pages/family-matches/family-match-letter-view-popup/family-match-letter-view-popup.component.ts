import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-match-letter-view-popup',
  templateUrl: './family-match-letter-view-popup.component.html',
  styleUrls: ['./family-match-letter-view-popup.component.scss']
})
export class FamilyMatchLetterViewPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeLetterProfileViewPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('letter-profile-view-popup-open'); html.classList.remove('letter-profile-view-popup-open');
  }

}
