import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-family-signedup-letter-view-popup',
  templateUrl: './family-signedup-letter-view-popup.component.html',
  styleUrls: ['./family-signedup-letter-view-popup.component.scss']
})
export class FamilySignedupLetterViewPopupComponent implements OnInit {

  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe((params: ParamMap) => {

      var id = parseInt(params.get('id'));

     // console.log('id', this.route)

      if (!isNaN(id)) {

        this.getnewfamilysbyid(id);
      }

    });

  }


  newsignedupFamilys:any;
  newFamilysbyId:any;
  santa_letter:any;
  name:any;
  state:any;
  photo:any;
  getnewfamilysbyid(id) {

    this.httpservice.getnewfamilydatabyid(id).subscribe(response => {
      this.newsignedupFamilys = response;
      this.newFamilysbyId = this.newsignedupFamilys.data.family_profile
      this.santa_letter=this.newFamilysbyId.santa_letter;
      this.photo=this.newFamilysbyId.photo;
      this.state=this.newFamilysbyId.state;
       this.name=this.newFamilysbyId.name;
     // console.log("newFamilysbyId", this.newFamilysbyId)
     
    })

  

  }

  closeLetterProfileViewPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.remove('letter-profile-view-popup-open'); html.classList.remove('letter-profile-view-popup-open');
  }


}
