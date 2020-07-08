import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-family-signedup-details',
  templateUrl: './family-signedup-details.component.html',
  styleUrls: ['./family-signedup-details.component.scss']
})
export class FamilySignedupDetailsComponent implements OnInit {

  public loading = false;
  resphoto: any;
  resname: any;
  resstate: any;
  resprofile_bio: any;
  ressanta_letter: any;
  resnumber_of_boys: any;
  resbudget: any;
  resorganisation: any;
  resamazon_wishlist: any;
  resfacebook_link: any;
  resnonbinary_count :any;

  
  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {

      var id = parseInt(params.get('id'));

      //console.log('id', this.route)

      if (!isNaN(id)) {

        this.getnewfamilysbyid(id);
      }

    });
    this.getnewFamily();
  }


  newsignedupFamilys:any;
  newFamilysbyId:any;
  getnewfamilysbyid(id) {
//console.log("FAMILY");
    this.httpservice.getnewfamilydatabyid(id).subscribe(response => {
     // console.log(response);
      //console.log("FAMILY");
      this.loading = false;
      this.newsignedupFamilys = response;
     
      this.newFamilysbyId = this.newsignedupFamilys.data.family_profile
     this.resphoto= this.newsignedupFamilys.data.family_profile['photo'];
     this.resname= this.newsignedupFamilys.data.family_profile['name'];
     this.resstate= this.newsignedupFamilys.data.family_profile['state'];
     this.resprofile_bio= this.newsignedupFamilys.data.family_profile['profile_bio'];
     this.ressanta_letter= this.newsignedupFamilys.data.family_profile['santa_letter'];
     this.resnumber_of_boys= this.newsignedupFamilys.data.family_profile['number_of_boys'];
     this.resnumber_of_boys= this.newsignedupFamilys.data.family_profile['number_of_girls'];
     this.resbudget= this.newsignedupFamilys.data.family_profile['budget'];
     this.resorganisation= this.newsignedupFamilys.data.family_profile['organisation'];
     this.resamazon_wishlist= this.newsignedupFamilys.data.family_profile['amazon_wishlist'];
     this.resfacebook_link= this.newsignedupFamilys.data.family_profile['facebook_link'];
      //console.log("newFamilysbyId", this.newFamilysbyId['name']);
     
    },err=>{console.log(err);})

  }

  // openLetterProfileViewPopup() {
  //   const body = document.getElementsByTagName('body')[0];
  //   const html = document.getElementsByTagName('html')[0];
  //   body.classList.add('letter-profile-view-popup-open'); html.classList.add('letter-profile-view-popup-open');
  // }

  // closeProfileDetailSidebar() {
  //   const body = document.getElementsByTagName('body')[0];
  //   const html = document.getElementsByTagName('html')[0];
  //   body.classList.remove('profile-detail-sidebar-open'); html.classList.remove('profile-detail-sidebar-open');
  // }

  getdata:any;
  signedUpFamilies:any=[];
  order:any;
  getnewFamily() {
    this.httpservice.getnewfamilydata().subscribe(response => {

      this.getdata = response;
       this.signedUpFamilies = this.getdata.data.family_profiles
  

      //console.log("signedUpFamilies", this.signedUpFamilies)
    
    })
  }
  
  approveFamily(){
    let obj={}
    obj['family_id']=this.newFamilysbyId.id,
    obj['status']="Approved"
    
    this.httpservice.approvefamily(obj).subscribe(response => {
      this.getdata = response;
      //console.log("Approved",obj)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Family Approved',
        showConfirmButton: false,
        timer: 1000,
      })
   
      this.getnewFamily();
    })

    this.getnewFamily();
    
      }
    
      declineFamily(){
        let obj={}
        obj['family_id']=this.newFamilysbyId.id,
        obj['status']="Declined"
      
        this.httpservice.declinefamily(obj).subscribe(response => {
          this.getdata = response;
          //console.log("Declined",obj)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'declined family successfully',
            showConfirmButton: false,
            timer: 1000
          })
     
          this.getnewFamily();
        })
       
        this.getnewFamily();
        
          }

}
