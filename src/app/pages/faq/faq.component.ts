import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  searchValue:any;

  constructor() { }

  ngOnInit() {
  }

  gotoGeneralFaq() {
    const element = document.getElementById('general_faq');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  gotoElvesFaq() {
    const element = document.getElementById('elves_faq');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  gotoFamilyFaq() {
    const element = document.getElementById('families_faq');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  matchedFamilies = [
    {
     name: 'Where did the letters come from?',
    
    },
    {
      name: 'When is the workshop opening this year?',
     
     },
   
  ];



}
