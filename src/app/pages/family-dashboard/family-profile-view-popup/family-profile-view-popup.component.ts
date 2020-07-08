import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-family-profile-view-popup',
  templateUrl: './family-profile-view-popup.component.html',
  styleUrls: ['./family-profile-view-popup.component.scss']
})
export class FamilyProfileViewPopupComponent implements OnInit {
  ngOnInit() {

  }
  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }
  closeFamilyProfileViewPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('family-profile-view-popup-open'); html.classList.remove('family-profile-view-popup-open');
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.closeFamilyProfileViewPopup();
    }
  }
  

}
