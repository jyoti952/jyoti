import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  adminMenuItems = [
    {
      label: 'Dashboard',
      link: '/admin/dashboard',
      img: 'assets/images/dashboard.svg',
      activeImg: 'assets/images/dashboard-red.svg'
    },
    {
      label: 'Family Signed Up',
      link: '/admin/family-signed-up',
      img: 'assets/images/person-grey.svg',
      activeImg: 'assets/images/person-red.svg'
    },
    {
      label: 'Families',
      link: '/admin/matched-families',
      img: 'assets/images/heart-grey.svg',
      activeImg: 'assets/images/heart-red.svg'
    },
    {
      label: 'Elves',
      link: '/admin/elf',
      img: 'assets/images/gift.svg',
      activeImg: 'assets/images/gift-red.svg'
    },
    {
      label: 'Conversations',
      link: '/admin/conversations/',
      img: 'assets/images/chat-grey.svg',
      activeImg: 'assets/images/chat-red.svg'
    },
    {
      label: 'Flagged',
      link: '/admin/flagged-users',
      img: 'assets/images/flag1.svg',
      activeImg: 'assets/images/flag1-red.svg'
    },
    {
      label: 'Blocked Users',
      link: '/admin/blocked-users',
      img: 'assets/images/blocked-grey.svg',
      activeImg: 'assets/images/blocked-red.svg'
    },
  ]
  name: any;

  constructor() { }

  ngOnInit() {
    this.admin_detail();
  }


admin_detail(){
  console.log( localStorage.getItem('userinformation'));
  var user_information = localStorage.getItem('userinformation')
  console.log(user_information)
  this.name = JSON.parse(user_information).data.profile["name"]
  console.log(this.name)
}

}
