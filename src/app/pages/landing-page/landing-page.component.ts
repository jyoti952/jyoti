import { Component, OnInit, HostListener } from '@angular/core';
import Player from '@vimeo/player';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  
  user:any;
  role:any;
  thank_you:boolean=true;
  constructor() { }
  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('video-popup-open');
    html.classList.remove('video-popup-open');

    if(localStorage.getItem('userinformation')!=null){
      this.user=localStorage.getItem("name")
    }
  }

  
  @HostListener('window:scroll')
  checkScroll() {
    // window.onbeforeunload = function () { window.scrollTo(0, 0); }
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // console.log('[scroll]', scrollPosition);
    this.role=localStorage.getItem("role");
    if(localStorage.getItem('userinformation')!=null){
      this.user=localStorage.getItem("name")
    }
    this.user=localStorage.getItem("name");
  }

  openVideoPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.add('video-popup-open');
    html.classList.add('video-popup-open');

    const player = new Player('video_wrapper', {
      id: 18125043,
    });
    player.play();
  }

  gotoBottom() {
    const scrollBottom = window.innerHeight - window.scrollY;
    window.scrollBy({
      top: scrollBottom,
      left: 0,
      behavior: 'smooth',
    });
   }


}
