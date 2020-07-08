import { Component, OnInit, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showStrip = false;
  user: any;


  dropdownVisible = false;
  //user: string;
  image: string;
  familyinfo: string;
  d1: any;
  res: any;
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;

  }

  constructor(private route: ActivatedRoute, private router: Router, private routerNavigate: Router, private authService: AuthService, private httpservice: HttpService) { }

  getdata: any;
  elfData: Array<any> = [];
  id: any;
  userProfile:any;
  name:any;
  
  getelfProfile() {
    this.httpservice.getelfData().subscribe(response => {
      // if(response.data.elf_profiles.length!=0)
      // {
      //   this.res="gotresp";
      // console.log(response);
      // this.getdata = response;
      // this.d1=this.getdata.data;
      // this.elfData = this.d1.elf_profile;
      // this.image = this.elfData.photo;
      // //this.user = this.elfData.user_name;
      // //this.id = this.elfData.id
      // //console.log("getdata", this.elfData)

      // }
      // if(response.data.elf_profiles.length==0)
      // {
      //   this.res="noresp";
      // }
      // this.httpservice.getelfData().subscribe(response => {
        this.getdata = response;
        this.elfData = this.getdata.data.elf_profile
        if(this.elfData.length!=0){
        this.image = this.getdata.data.elf_profile.photo;
        //this.user = this.elfData.user_name;
        this.id =  this.getdata.data.elf_profile['id'];
        //console.log("getdata", this.elfData)
        }
    })
  }

  getprofileData(){
   
    this.userProfile = JSON.parse(localStorage.getItem('currentimage'));
    this.name = JSON.parse(localStorage.getItem('currentname'))
  }

  myprofile() {
    this.router.navigate(['/my-profile', this.id]);
  }




  ngOnInit() {
    if (window.pageYOffset > 0) {
      const element = document.getElementById('header');
      element.classList.add('sticky');
    } else {
      const element = document.getElementById('header');
      element.classList.remove('sticky');
    }
    this.user = localStorage.getItem("name");
    if (localStorage.getItem('userinformation') != null) {
      this.user = localStorage.getItem("name")
    }
    this.getelfProfile();
    this.getprofileData();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 0) {
      const element = document.getElementById('header');
      element.classList.add('sticky');
    } else {
      const element = document.getElementById('header');
      element.classList.remove('sticky');
    }
  }

  stripHide() {
    const element = document.getElementById('header');
    element.classList.remove('has_strip');
    this.showStrip = false;
  }

  logout: any;
  data: any;

  logoutAction() {

    this.httpservice.logoutElf(this.data).subscribe((data: any) => {
      this.logout = data;
      //console.log(this.logout);

      if (this.logout['statusCode'] == 200) {
        if (localStorage.getItem('role') == 'elf') {
          this.routerNavigate.navigate(['/login/elf'])
        }
        if (localStorage.getItem('role') == 'admin') {
          this.routerNavigate.navigate(['/login/admin'])
        }
        if (localStorage.getItem('role') == 'family') {
          this.routerNavigate.navigate(['/login/family'])
        }

        localStorage.clear();
        sessionStorage.clear();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logout Successful',
          showConfirmButton: false,
          timer: 1000
        })

        return true;

      }

    })

  }


  roleNavigation: any;

  gotodashboard() {

    this.roleNavigation = localStorage.getItem('role')
    this.familyinfo = localStorage.getItem('boyOneAge') || localStorage.getItem('boyOrGirlAge') || localStorage.getItem('girlOneAge');
    if (this.roleNavigation == 'elf') {

      if (localStorage.getItem('existing_elf_user') == "false") {
        this.router.navigate(['/onboarding/elf']);
      }
      if (localStorage.getItem('existing_elf_user') == "true") {
        this.router.navigate(['/browse-family']);
      }
    }
    if (this.roleNavigation == 'family') {

        if (localStorage.getItem('existing_family_user') == "false") {
        this.router.navigate(['/onboarding/family']);
      } 
      
      if (localStorage.getItem('existing_family_user') == "true") {


        if (localStorage.getItem('family_profile_status') == "undefined") {
          this.router.navigate(['/onboarding/family/thank-you']);
        }


        if (localStorage.getItem('family_profile_status') == "Approved") {
          this.router.navigate(['/family/conversations']);
        }
        
        if (localStorage.getItem('family_profile_status') == "null" || localStorage.getItem('family_profile_status') == 'Declined') {

          if (localStorage.getItem('code_of_conductFamily') == "true") {
            this.router.navigate(['/onboarding/family/santa-letter']);
          }
          if ((localStorage.getItem('code_of_conductFamily') == "true") && localStorage.getItem('santaid')) {
            this.router.navigate(['/onboarding/family/profile-information']);
          }
          if ((localStorage.getItem('code_of_conductFamily') == "true") && localStorage.getItem('photoid') && localStorage.getItem('santaid')) {
            this.router.navigate(['/onboarding/family/amazon-wishlist']);
          }
          if ((localStorage.getItem('code_of_conductFamily') == "true") && localStorage.getItem('photoid') && localStorage.getItem('santaid') && localStorage.getItem('amazonLink')) {
            this.router.navigate(['/onboarding/family/family-info']);
          }
          if ((localStorage.getItem('code_of_conductFamily') == "true") && localStorage.getItem('photoid') && localStorage.getItem('amazonLink')
            && this.familyinfo && localStorage.getItem('santaid')) {
            this.router.navigate(['/onboarding/family/location']);
          }
          if ((localStorage.getItem('code_of_conductFamily') == "true") && localStorage.getItem('photoid') && localStorage.getItem('amazonLink')
            && this.familyinfo && localStorage.getItem('postalCode') && localStorage.getItem('santaid')) {
            this.router.navigate(['/onboarding/family/budget-organization']);
          }
          if ((localStorage.getItem('code_of_conductFamily') == "true") && localStorage.getItem('photoid') && localStorage.getItem('amazonLink')
            && this.familyinfo && localStorage.getItem('postalCode') && localStorage.getItem('finalsubmit') && localStorage.getItem('santaid')) {
            this.router.navigate(['/onboarding/family/thank-you']);
          }

        }
      }

     

    }

    else if (this.roleNavigation == 'admin') {

      this.router.navigate(['/admin/dashboard']);
    }
  }

}


