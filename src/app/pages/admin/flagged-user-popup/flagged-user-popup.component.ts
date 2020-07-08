import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flagged-user-popup',
  templateUrl: './flagged-user-popup.component.html',
  styleUrls: ['./flagged-user-popup.component.scss']
})
export class FlaggedUserPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeMatchFamilyPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('flagged-user-popup-open'); html.classList.remove('flagged-user-popup-open');
  }

}
