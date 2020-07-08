import { Component, OnInit } from '@angular/core';
import Player from '@vimeo/player';

@Component({
  selector: 'app-origin-story',
  templateUrl: './origin-story.component.html',
  styleUrls: ['./origin-story.component.scss']
})
export class OriginStoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('video-popup-open');
    html.classList.remove('video-popup-open');
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
