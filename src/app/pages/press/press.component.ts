import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})
export class PressComponent implements OnInit {

  pressListing = [
    {
      img: 'assets/images/press14.png',
      text: "'NY Couple Who Help Answer Hundreds of Letters to Santa Reveal How This Year's Notes Are Different",
      link: 'https://people.com/human-interest/ny-couple-answer-letters-to-santa-changes-over-years/',
      tag: 'PEOPLE.com',
    },
    {
      img: 'assets/images/press12.png',
      text: 'Holiday mystery: Letters to Santa arrive at New York City apartment every year',
      link: 'https://abc7ny.com/society/holiday-mystery-why-do-letters-to-santa-arrive-at-nyc-apartment/5747273/',
      tag: 'ABC 7 News',
    },
    {
      img: 'assets/images/press13.png',
      text: 'Inside Edition goes \'Inside\' the Miracle',
      link: 'https://www.insideedition.com/thousands-respond-to-christmas-letters-for-santa-sent-to-new-york-apartment-57513',
      tag: 'Inside Edition',
    },
    {
      img: 'assets/images/press01.png',
      text: 'Coca Cola and Miracle on 22nd Street Team Up for The Season for Giving.',
      link: 'https://www.facebook.com/1081736661993034/videos/484527235289277/',
      tag: 'Facebook',
    },
    {
      img: 'assets/images/press02.png',
      text: 'The Allusionist - Dear Santa',
      link: 'https://www.theallusionist.org/allusionist/dear-santa',
      tag: 'The Allusionist',
    },
    {
      img: 'assets/images/press03.png',
      text: 'Every Christmas This Couple Mistakenly Receives Heartbreaking Letters to Santa',
      link: 'https://www.usmagazine.com/celebrity-news/news/couple-mistakenly-receives-heartbreaking-letters-to-santa/',
      tag: 'US Weekly',
    },
    {
      img: 'assets/images/press04.png',
      text: 'Couple Receives Hundreds Of Mysterious Santa Letters Every Year, Responds To Every Single One',
      // tslint:disable-next-line: max-line-length
      link: 'http://www.huffingtonpost.co.uk/entry/miracle-on-22nd-street-couple-answer-hundreds-of-letters-to-santa_uk_585bb430e4b00768ddce523c',
      tag: 'Huffington Post',
    },
    {
      img: 'assets/images/press05.png',
      text: 'Couple gets nearly 400 mysterious letters to Santa — and fulfills them',
      link: 'https://www.today.com/kindness/miracle-22nd-st-couple-fulfills-mystery-letters-santa-t106384',
      tag: 'Today Show',
    },
    {
      img: 'assets/images/press06.png',
      // tslint:disable-next-line: max-line-length
      text: 'Two New York City men feel a tremendous responsibility to respond properly when they mysteriously receive hundreds of letters addressed to Santa Claus at their Chelsea apartment.',
      link: 'https://www.nytimes.com/video/nyregion/1248069482199/miracle-on-22nd-street.html',
      tag: 'The Allusionist',
    },
    {
      img: 'assets/images/press07.png',
      text: 'Tina Fey\'s Making A Movie Based On This Real-Life Santa Claus Couple',
      link: 'http://www.refinery29.com/2016/12/133931/tina-fey-christmas-movie-miracle-on-22nd-street-santa-claus',
      tag: 'Refinery29',
    },
    {
      img: 'assets/images/press08.png',
      text: 'Santa Letters Sent to Random Couple Get Fulfilled in \'Miracle on 22nd Street\' Mystery',
      link: 'http://abcnews.go.com/Lifestyle/santa-letters-random-couple-fulfilled-miracle-22nd-street/story?id=44343197',
      tag: 'Good Morning America',
    },
    {
      img: 'assets/images/press09.png',
      text: 'An NYC Couple Keeps Getting Letters for Santa, So They Asked Facebook for Help',
      // tslint:disable-next-line: max-line-length
      link: 'https://www.miracleon22ndstreet.com/press-clippings/2017/12/4/vice-an-nyc-couple-keeps-getting-letters-for-santa-so-they-asked-facebook-for-help',
      tag: 'Vice',
    },
    {
      img: 'assets/images/press10.png',
      text: 'A Couple Received Letters Meant For Santa, So They Started Answering Them',
      // tslint:disable-next-line: max-line-length
      link: 'https://www.buzzfeed.com/juliegerstein/a-couple-kept-receiving-xmas-wish-lists-for-santa-so-they-st?utm_term=.anBjwJqVX#.phyXxpe8o',
      tag: 'Buzzfeed',
    },
    {
      img: 'assets/images/press11.png',
      text: 'Miracle on 22nd Street! New York Couple Mistakenly Receives Letters Addressed to Santa — and Turns Them Into Act of Kindness',
      link: 'http://people.com/human-interest/miracle-on-22nd-street-jim-glaub-dylan-parker/',
      tag: 'People Magazine',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
