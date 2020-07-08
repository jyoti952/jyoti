import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ImgResolution, ImgCropperConfig, ImgCropperEvent } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';
import { LyDialog, LyDialogRef } from '@alyle/ui/dialog';
declare var $: any;
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { WebSiteInfoModel } from './profile-information.model.model';
import { HttpService } from 'src/app/services/http.service';
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
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  constructor(private httpservice: HttpService, private sanitizer: DomSanitizer, private theme: LyTheme2, private dialog: LyDialog, private formBuilder: RxFormBuilder, private fb: FormBuilder) { }
  nameRegEx = "^[a-zA-Z-,]+(\s{0,1}[a-zA-Z0-9-!@#$%^&*()_+=,?/.:;' ])*$";
  defaultimage: any;
  message: any;
  public loading = false;
  cropping :any;
  // profileInf = this.fb.group({
  //   facebookLink:['',[ Validators.required]]
  //       });


  //   onSubmit(){
  //// console.log(this.profileInf.value);
  // localStorage.setItem('facebookLink', this.profileInf.get("facebookLink").value)
  //   }

  // Previous(){

  //   this.profileInf.controls['facebookLink'].patchValue(localStorage.getItem('facebookLink'))
  // }

  // onpagechange(data){
  //   if (data.facebookLink != "" && data.facebookLink != null)
  //   {
  //     window.open(data.facebookLink,'_blank')
  //    return true
  //   }
  // }


  // classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  result: string;
  // myConfig: ImgCropperConfig = {
  //   width: 200, // Default `250`
  //   height: 200, // Default `200`,
  //   output: ImgResolution.OriginalImage // Default ImgResolution.Default
  // };

  // onCropped(e: ImgCropperEvent) {
  //   this.croppedImage = e.dataURL;
  //  // console.log('croppedImg: ', this.croppedImage);
  //   localStorage.setItem('profileImage', this.croppedImage)

  // }

  webImage: any;
  url: any;
  isShown: boolean = false; // hidden by default
  edited: boolean = false;
  hide: boolean = false;

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

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: Event) => { // called once readAsDataURL is completed
        this.url = reader.result;
        if (this.url != '') {
          //localStorage.removeItem("profileWebcamImage");
          this.isShown = !this.isShown;
          // console.log('url', this.url);
          this.showModel();
        }
        else {
          // console.log('profileWebcamImage', this.webcamImage.imageAsDataUrl);
          //localStorage.setItem('profileWebcamImage',this.webcamImage.imageAsDataUrl)
          //localStorage.removeItem("profileImage");

        }

      }
    }
  }




  showModel() {
    $("#myModal").modal();
  }


  toggleShow() {
    this.edited = !this.edited;
    this.isShown = !this.isShown;
    this.remove();
    //this.hide = !this.hide
  }
  toggle() {
    this.hide = !this.hide;
    this.remove();

  }
  removeProfileimage() {
    //localStorage.removeItem("profileImage");
    this.url = "";
    if(this.url = ""){
      localStorage.removeItem("photoid");
    }
  }
  remove() {
    localStorage.removeItem("photoid");
  }

  public webcamImage: WebcamImage = null;
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;

  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    //let webSiteInfoModel = new WebSiteInfoModel();
    // this.profileInf = this.formBuilder.formGroup(webSiteInfoModel);

    //   history.pushState(null, null, location.href);
    //   window.onpopstate = function(event) {
    //    history.go(0);
    // };
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });


    if (this.webcamImage != null) {
      //this.webImage = localStorage.getItem('webcamImage');
      this.webImage = this.webcamImage;
      this.hide = !this.hide

    }
    else if (this.webcamImage == null) {
      // if (localStorage.getItem('uploadImage') != null) 
      if (this.url != null) {
        //this.uploadImage=localStorage.getItem('uploadImage');
        //this.uploadImage=this.url;
        this.edited = !this.edited;
      }

    }

    //this.loading = true;
     this.photoid = localStorage.getItem('photoid')

    this.getfamilyPhoto();

  }

  public triggerSnapshot(): void {
    this.trigger.next();
    //this.showModelCamera();
  }


  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.webImage = this.webcamImage.imageAsDataUrl
    //localStorage.setItem('profileWebcamImage',this.webImage)
    //localStorage.removeItem("profileImage");
  }

  public cameraWasSwitched(deviceId: string): void {
    // console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  uploadImage: string;
  photo; any;
  photoid: any;
  santaLetter() {
    let obj = {}

    //this.url  webImage
    if (this.url != null) {
      this.uploadImage = this.url;
      this.photoid = localStorage.getItem('photoid')

    }
    else if (this.webImage != null) {
      this.uploadImage = this.webImage
    }


    obj['photo'] = this.uploadImage;
    this.httpservice.Familyphoto(obj).subscribe((data: any) => {
      this.photo = data;
      this.photoid = this.photo.data.family_profile.id
      localStorage.setItem('photoid', this.photoid);
      // console.log("post photo",this.photo)
      // console.log("photoid",this.photoid)
      this.getfamilyPhoto()
    })

  }




  base64Santa: any;
  getfamily: any;

  getfamilyPhoto() {
    if (this.photoid == null) {
      this.loading = false;
      (localStorage.getItem("photoid"));
    } else {
      this.loading = false;
      this.httpservice.getFamilyphoto(this.photoid).subscribe((data: any) => {

        this.getfamily = data;
        this.loading = false;
        this.base64Santa = this.getfamily.data.family_profile.photo
        // console.log("base64familyphoto",this.base64Santa)
        // console.log("getphoto",this.getfamily)

        this.hide = !this.hide;

      })
    }
  }
}