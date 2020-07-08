import { Component, OnInit,Inject } from '@angular/core';
import { LocationStrategy,DOCUMENT } from '@angular/common';
import { HttpObservableService } from 'src/app/services/http-observable.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-inner-header-nav',
  templateUrl: './inner-header-nav.component.html',
  styleUrls: ['./inner-header-nav.component.scss']
})
export class InnerHeaderNavComponent implements OnInit {

  // innerHeaderNavItems: any;
  role: any;
  public elf:boolean=false;
  public familys:boolean=false;
  innerHeaderNavItems = [
    {
      label: 'Browse Families',
      link: '/browse-family',
      img: 'assets/images/person-grey.svg',
      activeImg: 'assets/images/person-red.svg'
    },
    {
      label: 'My Matches',
      link: '/family-matches',
      img: 'assets/images/heart-grey.svg',
      activeImg: 'assets/images/heart-red.svg'
    },
    {
      label: 'Conversations',
      link: '/conversations',
      img: 'assets/images/chat-grey.svg',
      activeImg: 'assets/images/chat-red.svg'
    }
  ]


  constructor(private location:LocationStrategy,private family: HttpObservableService,@Inject(DOCUMENT) private _document: Document,private authserice:AuthService) { 
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
    history.pushState(null, null, window.location.href);
   });  
   //this.role = localStorage.getItem('role');
   //this._document.defaultView.location.reload();
  }

  // constructor() {
  //   this.role = localStorage.getItem('role');
  //  }
  

  ngOnInit() {

    setTimeout(() => {
      this.role=localStorage.getItem('role');
      }, 200);
  
     this.role=this.authserice.userdata['data']['profile'].role;

  }




}
