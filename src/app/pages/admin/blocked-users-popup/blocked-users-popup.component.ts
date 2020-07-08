import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blocked-users-popup',
  templateUrl: './blocked-users-popup.component.html',
  styleUrls: ['./blocked-users-popup.component.scss']
})
export class BlockedUsersPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeLetterProfileViewPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('letter-profile-view-popup-open'); html.classList.remove('letter-profile-view-popup-open');
  }

}
