import { Component, OnInit } from '@angular/core';
import { BrowseFamilyComponent } from '../browse-family.component';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  stateDefault :any
  public organisationsData = [
    { Name: 'No Affiliation' },
    { Name: 'Adoption is Love Fund' },
    { Name: 'Miracle Families' },
    { Name: 'New Alternatives' },
    { Name: 'NYC Together' },
    { Name: 'Original 22nd Street Letters' },
    { Name: 'Poverty Alleviation Charity' },
  ];
  public organisationsFields = { text: 'Name' };
  public organisationsWaterMark = 'Select organisation ';
  // public sorting: string = 'Ascending'; 
  public organisationsDefault = ['No Affiliation'];
  
  searchValue:any;

  public stateData = [
    'Anywhere',
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    " California",
    " Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    " Georgia",
    " Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    " Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    " Maryland",
    "Massachusett",
    "Michigan",
    " Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    " New Jersey",
    " New Mexico",
    " New York",
    "North Carolina",
    " North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    " Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    " West Virginia",
    "Wisconsin",
    " Wyoming"

  ];
  loading: boolean;
  browseFamily: any;
  familyInfo: any;

  constructor(
    private broserComp:BrowseFamilyComponent,
    private httpservice: HttpService,
  ) { }

  ngOnInit() {
  }


  closeFilterSidebar() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('filter-sidebar-open'); html.classList.remove('filter-sidebar-open');
  }


  applyChanges(searchValue){

    //     this.httpservice.serchbyState(searchValue).subscribe(response => {
    //   this.loading = false
    //   this.browseFamily = response;
    //  this.broserComp.familyInfo=this.browseFamily.data.family_profiles
    //   this.familyInfo = this.browseFamily.data.family_profiles
  
    // })

  }

}
