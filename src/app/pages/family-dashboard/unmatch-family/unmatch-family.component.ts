import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unmatch-family',
  templateUrl: './unmatch-family.component.html',
  styleUrls: ['./unmatch-family.component.scss']
})
export class UnmatchFamilyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  closeUnmatchFamilyPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('unmatch-family-popup-open'); html.classList.remove('unmatch-family-popup-open');
  }

}
