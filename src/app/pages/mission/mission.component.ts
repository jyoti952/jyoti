import { Component, OnInit } from '@angular/core';
import Player from '@vimeo/player';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  constructor() { }
  user:any;
  ngOnInit() {

    this.user=localStorage.getItem("name");
    if(localStorage.getItem('userinformation')!=null){
      this.user=localStorage.getItem("name")
    }
  
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

}
