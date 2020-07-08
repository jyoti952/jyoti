import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.scss']
})
export class VideoPopupComponent implements OnInit {

  constructor(
    private hostElement: ElementRef,
  ) { }
  closeVideoPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('video-popup-open'); html.classList.remove('video-popup-open');

    const videoIframe = this.hostElement.nativeElement.querySelector('iframe');
    videoIframe.src = videoIframe.src;

  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if (event.keyCode === 27) {
      this.closeVideoPopup();
    }
  }

  ngOnInit() {
  }

}
