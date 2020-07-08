import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

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
  selector: 'app-upload-letter',
  templateUrl: './upload-letter.component.html',
  styleUrls: ['./upload-letter.component.scss']
})
export class UploadLetterComponent implements OnInit {

  constructor(private httpservice: HttpService, private router: Router, private sanitizer: DomSanitizer) { }
  public loading = false;
  //classes = this.theme.addStyleSheet(styles);
  cropping:any;
  result: string;
  // myConfig: ImgCropperConfig = {
  //   width: 200, 
  //   height: 200, 
  //   output: ImgResolution.OriginalImage 
  // };

  // onCropped(e: ImgCropperEvent) {
  //   this.croppedImage = e.dataURL;
  //   //console.log('croppedImg: ', this.croppedImage);
  //   localStorage.setItem('uploadImage', this.croppedImage)

  // }


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
          //localStorage.removeItem("webcamImage");
          this.isShown = !this.isShown;
          //console.log('url', this.url);
          //localStorage.setItem('uploadImage',this.url)
          this.showModel();
        }
        else {
          //console.log('webcamImage', this.webcamImage.imageAsDataUrl);
          //localStorage.setItem('webcamImage',this.webcamImage.imageAsDataUrl)
          //localStorage.removeItem("uploadImage");

        }

      }
    }
  }


  webImage: any;

  showModel() {
    $("#myModal").modal();
  }


  toggleShow() {
    this.edited = !this.edited;
    this.isShown = !this.isShown;

  }
  toggle() {
    this.hide = !this.hide
    this.remove();
  }
  removeUploadimage() {
    this.url = "";
    if (this.url = "") {
      localStorage.removeItem("santaid");
    }
    //localStorage.removeItem("uploadImage");
  }
  remove() {
    localStorage.removeItem("santaid");
    //localStorage.removeItem("webcamImage");


  }
  cameraImage: any;

  public webcamImage: WebcamImage = null;
  imageAsDataUrl: any;
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




  uploadImage: string;
  public ngOnInit(): void {





    //   history.pushState(null, null, location.href);
    //   window.onpopstate = function(event) {
    //    history.go(0);
    // };
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    // if (localStorage.getItem('uploadImage') == null)
    // if (this.url == "")
    //  {
    // if (localStorage.getItem('webcamImage') != null) 
    if (this.webcamImage != null) {
      //this.webImage = localStorage.getItem('webcamImage');
      this.webImage = this.webcamImage;
      this.hide = !this.hide

    }

    // }
    // else if (localStorage.getItem('webcamImage') == null)
    else if (this.webcamImage == null) {
      // if (localStorage.getItem('uploadImage') != null) 
      if (this.url != null) {
        //this.uploadImage=localStorage.getItem('uploadImage');
        //this.uploadImage=this.url;
        this.edited = !this.edited;
      }

    }

    //  if(localStorage.getItem('santaid') == null){
    //   this.loading = false;

    //   }
    this.santaid = localStorage.getItem('santaid')
    // this.loading=true;
    this.getsantaLetter();

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
    //console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.webImage = this.webcamImage.imageAsDataUrl;
    //localStorage.setItem('webcamImage',this.webImage)
    //this.url="";
    //localStorage.removeItem("uploadImage");
  }

  public cameraWasSwitched(deviceId: string): void {
    //console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  santa; any;
  santaid: any;
  santaLetter() {
    let obj = {}

    if (this.url != null) {
      this.uploadImage = this.url;

    }
    else if (this.webImage != null) {
      this.uploadImage = this.webImage
    }


    obj['santa_letter'] = this.uploadImage;
    this.httpservice.santaLetterurl(obj).subscribe((data: any) => {

      this.santa = data;
      this.santaid = this.santa.data.family_profile.id
      localStorage.setItem('santaid', this.santaid);
      //console.log("post santa",this.santa)
      //console.log("santaid",this.santaid)
      this.getsantaLetter();
    })

  }

  base64Santa: any;
  getsanta: any;

  getsantaLetter() {


    if (this.santaid == null) {
      this.loading = false;
    } else {
      this.loading = false;
      this.httpservice.getSanta(this.santaid).subscribe((data: any) => {
        //console.log("data",data)
        this.getsanta = data;
        this.loading = false;
        this.base64Santa = this.getsanta.data.family_profile.santa_letter;
        //console.log("base64Santa",this.base64Santa)
        //console.log("getsanta",this.getsanta)
        this.hide = !this.hide;

      })
    }

  }
}