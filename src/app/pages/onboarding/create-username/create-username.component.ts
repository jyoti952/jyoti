import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { image } from './image';
import { ChangeDetectionStrategy } from '@angular/core';
import { ImgResolution, ImgCropperConfig, ImgCropperEvent } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';
import { LyDialog, LyDialogRef } from '@alyle/ui/dialog';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/services/http.service';
declare var $: any;


// const styles = {
//   actions: {
//     display: 'flex'
//   },
//   cropping: {
//     maxWidth: '100%',
//     height: '400px'
//   },
//   flex: {
//     flex: 1
//   },
//   range: {
//     textAlign: 'center',
//     maxWidth: '400px',
//     margin: '14px'
//   }
// };

@Component({
  selector: 'app-create-username',
  templateUrl: './create-username.component.html',
  styleUrls: ['./create-username.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUsernameComponent implements OnInit {

loadingimg:any=false;
  constructor(private httpservice: HttpService,private sanitizer: DomSanitizer, private theme: LyTheme2, private dialog: LyDialog) { }

  elfPhotoId=+localStorage.getItem('elfPhotoId')
  defaultimage: any;


 // classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  result: string;
  url: any;
  urlone:any='';
  isShown: boolean = false; // hidden by default

  image:any;
 
  edited: boolean = true;
  edited1:any=true
  status: boolean = false;
  show: boolean = false;
  elfPhoto:any;
  loadingComp:any=false

  ngOnInit() {



    // if (localStorage.getItem('image') == null) {
    //  this.edited = true;
    //  this.edited1 = true;


    //   this.default()
    // }
    // else if (this.defaultimage == null) {
    //   if (localStorage.getItem('image') != null) {
    //   this.croppedImage = localStorage.getItem('image')
    //   this.edited = false; 
    //   this.edited1 = false;
   
    //   }
    // }
    this.default()
    if(this.elfPhotoId==0){
      this.loadingComp=true
      this.status=false;
      this.edited=true;
      this.edited1=true

    }


  }




  clickEvent() {
    this.status = !this.status;
  }

 



  onSelectFile(event) {
 
    if (event.target.files && event.target.files[0]) {

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Only Png, Jpeg files are accepted',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }
      var fileSize = event.target.files[0].size / 1024;

      if (fileSize > 10240) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'File size is larze; maximum file size 10 MB',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }

      var reader = new FileReader();

     // this.urlone=event.target.files[0]
 reader.readAsDataURL(event.target.files[0]); // read file as data url



      reader.onload = (event: Event) => {

        // called once readAsDataURL is completed

// this.urlone=reader.result;
$('#blah').attr('src', (<FileReader>event.target).result);


        this.url = reader.result;

        if (this.url != '') {
          localStorage.removeItem("defaultimage");
          this.isShown = !this.isShown;
         // console.log('url', this.url);
          this.showModel();
        }
        else {
         // console.log('defaultimage', this.defaultimage.changingThisBreaksApplicationSecurity);
          localStorage.setItem('defaultimage', this.defaultimage.changingThisBreaksApplicationSecurity)
          localStorage.removeItem("image");

        }

      }
    }
  }




  showModel() {
    $("#myModal").modal();
  }


  toggleShow() {
  //  this.edited = !this.edited;
  this.edited = false;
  this.edited1=false
  $('#image1').attr('src',this.url);
    this.isShown = !this.isShown;

  }

  remove(){

    this.edited = true;
    this.edited1=true
    localStorage.removeItem("image");
    this.url=''
    $('#blah').attr('src','');

    this.status=false;
   // this.default()
  }

  cancelmodal(){
    this.status=false;
  }


  default() {
    this.defaultimage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${image}`);
   // console.log('defaultimage', this.defaultimage.changingThisBreaksApplicationSecurity);
    this.getelfphoto()

    localStorage.setItem('defaultimage', this.defaultimage.changingThisBreaksApplicationSecurity);
    localStorage.removeItem("image");
  }

 

elfphoto(){
  let obj = {}
  if(this.url){
    obj['photo'] = this.url;
  }
  else {
    obj['photo'] = this.defaultimage.changingThisBreaksApplicationSecurity;
  }

  this.httpservice.Elfphoto(obj).subscribe((data: any) => {

    this.elfPhoto = data;
   // console.log("elfPhoto",this.elfPhoto)
    localStorage.setItem('elfPhotoId',this.elfPhoto.data.elf_profile.id)
    
})
}


// getfamilyPhoto(){
//   if(this.photoid==null){
//     this.loading = false;
//   }else{
//     this.loading=true;
//   this.httpservice.getFamilyphoto(this.photoid).subscribe((data: any) => {
   
//     this.getfamily= data;
//     this.loading = false;
//     this.base64Santa=this.getfamily.data.family_profile.photo
//     // console.log("base64familyphoto",this.base64Santa)
//     // console.log("getphoto",this.getfamily)
     
//      this.hide = !this.hide;
     
// })
// }
// }


getelfphoto(){
 
if(this.elfPhotoId){
  this.loadingComp=true
  this.status=false;
      this.edited=false;
      this.edited1=false
  
  this.httpservice.getElfphoto().subscribe((data: any) => {
   
    this.elfPhoto = data;
  

    if(this.defaultimage.changingThisBreaksApplicationSecurity==this.elfPhoto.data.elf_profile.photo){
     // this.edited=false;
      this.status=false;
      this.edited=false;
      this.edited1=false
      $('#image1').attr('src',this.elfPhoto.data.elf_profile.photo);
    }
    else{

      this.edited=false;
      this.edited1=false
     this.image= this.elfPhoto.data.elf_profile.photo;
      $('#image1').attr('src',this.elfPhoto.data.elf_profile.photo);

    }
   

 
   // console.log("elfPhoto",this.elfPhoto)
})
}

 

}


}