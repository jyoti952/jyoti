import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flagged-users',
  templateUrl: './flagged-users.component.html',
  styleUrls: ['./flagged-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlaggedUsersComponent implements OnInit {

  p: number = 1;
  loading:boolean=false;
  flaggedProfile:any=[];
  admindata:any
  user_ID: any;
  user_NAME: any;

  constructor(private fb:FormBuilder,private httpservice:HttpService,private router:Router) { }

  ngOnInit() {
    this.getFlaggedUsers();
    // this.admin_conversations()
  }

  // openFlaggedPopup() {
  //   const body = document.getElementsByTagName('body')[0];
  //   const html = document.getElementsByTagName('html')[0];
  //   body.classList.add('flagged-user-popup-open'); html.classList.add('flagged-user-popup-open');
  // }
  
  getFlaggedUsers(){
    this.loading=true;
    this.httpservice.getFlaggedData().subscribe(response => {
    this.loading = false;
    this.flaggedProfile=response.data.flagged_users_profile;
 
    })
  }
  elfProfiles(arg0: string, elfProfiles: any) {
    throw new Error("Method not implemented.");
  }

  

  removeFlag(user){

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do u want unflag the user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unflag it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {  
       let obj={'user_id':user.user_id}
       this.httpservice.unFlagUser(obj).subscribe(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User has been unflagged successfully',
          showConfirmButton: false,
          timer: 2000,
        })
        this.getFlaggedUsers();
       })
      } else  {
        Swal.fire(
          'Cancelled',
        )
      }
    })
   
  }


    

  gotoConversation(families){
      this.router.navigate(['/admin/conversations', families.id])
      this.user_ID=families.user_id
      this.user_NAME=families.user_name
      
     localStorage.setItem('adminuser',  this.user_ID);
     localStorage.setItem('adminusername',  this.user_NAME);
    } 
   
  
}
