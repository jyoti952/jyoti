import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Ng2Cable, Broadcaster } from 'ng2-cable';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {
  @ViewChild('search',{static: false}) searchRef: ElementRef;
  messageSend: boolean = false;
  imagefile: any;
  image_name: any;
  imageInput: boolean = false;
  chatRequest = false;
  container:any
  Messageform = new FormGroup({
    meassage: new FormControl('')
  });
  messageRequest = false;
  onlineStatus: boolean = false;
  role: any;
  getdata: any;
  elf_id: any;
  familydatas: any;
  family_id: any;
  data: any;
  messagedata: any;
  msgdata: any;
  id: any;
  newfamily: any;
  admindata: any;
  approvedFamilysbyuserId: any;
  name: any;
  photo: any;
  conversationdata: any;
  messages = [];
  current_user_id: number;
  sequence: number;
  userids: any;
  username: any;
  adminprofile: any;
  received_message = false;
  miracle_admin:any
  flaggedProfile: any;
  params_data:any
  flag_user_name: any;
  flag_data:boolean
  elfProfiles: any;
  familyname: any;
  user_ID:any
  users_id: string;
  elf_name: string;
  searchValue:any;
  user_getid: number;
  serviceUrl2 = environment.serviceUrl2;
  loading: boolean = false;
  subscriptionCount: number = 0;
  msgsent: boolean = false;
  flagPopup:boolean=false;
  flagForm:FormGroup;
  flagName:any;
  getFlagData:any;
  flagUserId:any;
  flagCheck:boolean;
  getFlagId:any;
  toggled: boolean = false;
  adminid: string;

  constructor(
    private httpservice: HttpService, private route: ActivatedRoute, private router: Router,private ng2cable: Ng2Cable,
    private broadcaster: Broadcaster,private elementRef:ElementRef,private fb:FormBuilder
  ) {
    var user_id = parseInt(localStorage.getItem('adminuser'));
    setTimeout(()=>{ user_id = parseInt(localStorage.getItem('adminuser'))}, 2000);
    {
      this.route.queryParams.subscribe(params => {
        console.log('family id from the queryparams', params);
        if (params.id) {
          this.converstastion_with_admin(params.id);
          this.userids = params.id;
        } else {

        }
      });
      setTimeout(() => {
        this.subscribeAdmin();
      }, 500)
    }
  }

  subscribeAdmin(){
    var user_id = parseInt(localStorage.getItem('adminuser'));
    this.ng2cable.subscribe(this.serviceUrl2 +'cable', 'AdminChatChannel', { user_id: user_id});
      this.broadcaster.on<string>('AdminChatChannel').subscribe(
        message => {
          if (this.messageSend) {
            this.messageSend = false;
            this.subscriptionCount++;
            this.container = document.getElementById("adminContainer");
            this.container.scrollTop =  this.container.scrollHeight;
            this.received_message = true;
            this.msgdata = message;
            localStorage.setItem('msg',this.msgdata);
            if (this.msgdata.recipient_id == this.current_user_id){
              var image = '';
              if (this.msgdata.sender_image != 'admin image'){
                image = this.msgdata.sender_image
              }else{
                image = "admin image"
              }
              this.msgdata.sender_image = image;
              this.msgdata.body = this.msgdata.message;
              this.msgdata.attachment = this.msgdata.attachment;
              this.msgdata.side = 'left';

              for (var i = 0; i < this.messages.length; i++) {
                if  ((this.msgdata.body === this.messages[i].body) && (this.msgdata.created_at === this.messages[i].created_at) &&(this.msgdata.attachment === this.messages[i].attachment)) {
                  break;
                }
              }
              this.messages.push(this.msgdata);
              this.msgdata = '';

            }else{
              if (this.msgdata.sender_image != 'admin image'){
                image = this.msgdata.sender_image
              }else{
                image = "admin image"
              }
              this.msgdata.sender_image = image;
              this.msgdata.body = this.msgdata.message;
              this.msgdata.side = 'right';
              this.msgdata.attachment = this.msgdata.attachment
              for (var i = 0; i < this.messages.length; i++) {
                if  ((this.msgdata.body === this.messages[i].body) && (this.msgdata.created_at === this.messages[i].created_at) && (this.msgdata.attachment === this.messages[i].attachment)) {
                  break;
                }
              }
              this.messages.push(this.msgdata);
              this.msgdata = '';

            }
            this.msgsent = false;
            //this.admin_conversations();
          } else {
            this.subscriptionCount++;
            this.msgdata = message;
            if (this.msgdata.sender_id == this.userids) {
              this.container = document.getElementById("adminContainer");
              this.container.scrollTop =  this.container.scrollHeight;
              this.received_message = true;

              localStorage.setItem('msg',this.msgdata);
              if (this.msgdata.recipient_id == this.current_user_id){
                var image = '';
                if (this.msgdata.sender_image != 'admin image'){
                  image = this.msgdata.sender_image
                }else{
                  image = "admin image"
                }
                this.msgdata.sender_image = image;
                this.msgdata.body = this.msgdata.message;
                this.msgdata.attachment = this.msgdata.attachment;
                this.msgdata.side = 'left';
                for (var i = 0; i < this.messages.length; i++) {
                  if  ((this.msgdata.body === this.messages[i].body) && (this.msgdata.created_at === this.messages[i].created_at) &&(this.msgdata.attachment === this.messages[i].attachment)) {
                    break;
                  }
                }
                this.messages.push(this.msgdata);
                this.msgdata = '';

              }else{
                if (this.msgdata.sender_image != 'admin image'){
                  image = this.msgdata.sender_image
                }else{
                  image = "admin image"
                }
                this.msgdata.sender_image = image;
                this.msgdata.body = this.msgdata.message;
                this.msgdata.side = 'right';
                this.msgdata.attachment = this.msgdata.attachment
                for (var i = 0; i < this.messages.length; i++) {
                  if  ((this.msgdata.body === this.messages[i].body) && (this.msgdata.created_at === this.messages[i].created_at) && (this.msgdata.attachment === this.messages[i].attachment)) {
                    break;
                  }
                }
                this.messages.push(this.msgdata);
                this.msgdata = '';

              }
              this.msgsent = false;
            } else {
              this.msgdata = '';
            }
          }
          for (let i = 0; i < this.messages.length; i++) {
            let count = 0;
            for (let j = 0; j < this.messages.length; j++) {
              if (this.messages[i].body == this.messages[j].body && this.messages[i].created_at == this.messages[j].created_at) {
                if (count > 0) {
                  this.messages.splice(j, 1);
                  count = 0;
                } else {
                  count++;
                }
              }
            }
          }
        }, error => {
        }
      );

  }


  test() {
    var user_id = parseInt(localStorage.getItem('adminuser'));
    this.ng2cable.subscribe(this.serviceUrl2 +'cable', 'AdminChatChannel', { user_id: user_id});
    this.broadcaster.on<string>('AdminChatChannel').subscribe(
      message => {
        if (this.messageSend) {
          this.messageSend = false;
          console.log(message);
          this.subscriptionCount++;
          setTimeout(() => {
            this.container = document.getElementById("adminContainer");
            this.container.scrollTo(0, this.container.scrollHeight)
          }, 1000);
          this.received_message = true;
          this.msgdata = message;
          localStorage.setItem('msg',this.msgdata);

          if (this.msgdata.recipient_id == this.current_user_id){
            var image = '';
            if (this.msgdata.sender_image != 'admin image'){
              image = this.msgdata.sender_image
            }else{
              image = "admin image"
            }
            this.msgdata.sender_image = image;
            this.msgdata.body = this.msgdata.message;
            this.msgdata.attachment = this.msgdata.attachment;
            this.msgdata.side = 'left';

            for (var i = 0; i < this.messages.length; i++) {
              if  ((this.msgdata.body === this.messages[i].body) && (this.msgdata.created_at === this.messages[i].created_at) &&(this.msgdata.attachment === this.messages[i].attachment)) {
                break;
              }
            }
            this.messages.push(this.msgdata);
            this.msgdata = '';

          }else{
            if (this.msgdata.sender_image != 'admin image'){
              image = this.msgdata.sender_image
            }else{
              image = "admin image"
            }
            this.msgdata.sender_image = image;
            this.msgdata.body = this.msgdata.message;
            this.msgdata.side = 'right';

            this.msgdata.attachment = this.msgdata.attachment
            for (var i = 0; i < this.messages.length; i++) {
              if  ((this.msgdata.body === this.messages[i].body) && (this.msgdata.created_at === this.messages[i].created_at) && (this.msgdata.attachment === this.messages[i].attachment)) {
                break;
              }
            }
            this.messages.push(this.msgdata);
            this.msgdata = '';

          }
          this.msgsent = false;
          //this.admin_conversations();
        } else {
          this.subscriptionCount++;
          this.msgdata = message;
          if (this.msgdata.sender_id == this.userids) {
            setTimeout(() => {
              this.container = document.getElementById("adminContainer");
              this.container.scrollTo(0, this.container.scrollHeight)
            }, 1000);
            this.received_message = true;

            localStorage.setItem('msg',this.msgdata);
            if (this.msgdata.recipient_id == this.current_user_id){
              var image = '';
              if (this.msgdata.sender_image != 'admin image'){
                image = this.msgdata.sender_image
              }else{
                image = "admin image"
              }
              this.msgdata.sender_image = image;
              this.msgdata.body = this.msgdata.message;
              this.msgdata.attachment = this.msgdata.attachment;
              this.msgdata.side = 'left';
              for (var i = 0; i < this.messages.length; i++) {
                if  ((this.msgdata.body === this.messages[i].body) && (this.msgdata.created_at === this.messages[i].created_at) &&(this.msgdata.attachment === this.messages[i].attachment)) {
                  break;
                }
              }
              this.messages.push(this.msgdata);
              this.msgdata = '';

            }else{
              if (this.msgdata.sender_image != 'admin image'){
                image = this.msgdata.sender_image
              }else{
                image = "admin image"
              }
              this.msgdata.sender_image = image;
              this.msgdata.body = this.msgdata.message;
              this.msgdata.side = 'right';

              this.msgdata.attachment = this.msgdata.attachment
              for (var i = 0; i < this.messages.length; i++) {
                if  ((this.msgdata.body === this.messages[i].body) && (this.msgdata.created_at === this.messages[i].created_at) && (this.msgdata.attachment === this.messages[i].attachment)) {
                  break;
                }
              }
              this.messages.push(this.msgdata);
              this.msgdata = '';
            }
            this.msgsent = false;
          } else {
            this.msgdata = '';
          }
        }
        for (let i = 0; i < this.messages.length; i++) {
          let count = 0;
          for (let j = 0; j < this.messages.length; j++) {
            if (this.messages[i].body == this.messages[j].body && this.messages[i].created_at == this.messages[j].created_at) {
              if (count > 0) {
                this.messages.splice(j, 1);
                count = 0;
              } else {
                count++;
              }
            }
          }
        }
      }, error => {
      }
    );
  }


  ngOnInit() {
    // this.getelfProfile();
    this.getnewFamily();
    this.admin_detail();
    this.admin_conversations();

    // this.getFlaggedUsers()
    // this.getelfprofiles();

    this.route.paramMap.subscribe((params: ParamMap) => {
      var id = parseInt(params.get('id'));
      this.params_data=parseInt(params.get('id'))
      console.log('id', this.route)
      // this.chatRequestAdmin(this.params_data);
      this.getmatchedfamilybyid(id)
    });
    this.name=localStorage.getItem('adminusername')
    this.user_getid = parseInt(localStorage.getItem('adminuser'));

    this.converstastion_with_admin(this.user_getid)
    this.flagForm = this.fb.group({
      flag_reason: ['',Validators.required],
      flag_additional_info: ['',Validators.required]
    });

  }

  admin_conversations(){
    //this.test();
    this.httpservice.adminConversationsdata().subscribe(response => {
      this.admindata = [];
      this.route.queryParams.subscribe(params => {
        console.log('family id from the queryparams', params);
        if (params.id) {
          this.converstastion_with_admin(params.id)
        } else {
          this.converstastion_with_admin(response.data.conversations[0].user_id)
        }
      });
      this.admindata = response.data.conversations;
    })
  }

// ===============================conversastion with admin====================================//
// get all msg api
  converstastion_with_admin(id){
    this.conversationdata = [];
    this.loading = true;
    this.getFlagId=id;
    this.current_user_id = parseInt(this.data = localStorage.getItem('sender_id'))
    this.httpservice.ConversationsdwithAdmin(id).subscribe(response => {
      this.container = document.getElementById("adminContainer");
      this.loading = false;
      console.log('response from the get chat api', response);
      // setTimeout(() => {
      //   this.converstastion_with_admin(this.users_id)
      // }, 1000);
      this.container.scrollTop =  this.container.scrollHeight;
      if (response.data.message === 'no messages') {
        this.conversationdata = [];
      } else {
        this.conversationdata = response.data.messages;
        this.name=response.data.user_name;
        this.photo=response.data.user_image;
        this.flagUserId=response.data.user_id;
        this.flagCheck=response.data.is_flagged;
      }
      this.messages = [];
      this.sequence = 0;
      for (let i =0 ; i < this.conversationdata.length; i++) {
        if (this.conversationdata[i].sender_id == this.current_user_id ){
          this.conversationdata[i]["side"] = "right"
        }else{
          this.conversationdata[i]["side"] = "left"
        }
        this.messages.push(this.conversationdata[i]);
      }
    })
  }

  getFlaggedUsers(){
    this.httpservice.getFlaggedData().subscribe(response => {
      this.flaggedProfile=response.data.flagged_users_profile;
      console.log(this.flaggedProfile);
      for(let k=0;k< this.flaggedProfile.length;k++){
        if(this.flaggedProfile[k]["id"] == this.params_data){
          this.name=this.flaggedProfile[k].user_name;
          this.user_ID=this.flaggedProfile[k].user_id;
          localStorage.setItem('adminuser',  this.user_ID);
        }
      }
    })
  }
  getelfprofiles() {
    this.httpservice.getelfprofilesinAdmin().subscribe(response => {
      // this.loading = false;
      this.getdata = response;
      this.elfProfiles = this.getdata.data.elf_profiles;
      console.log( this.elfProfiles);
      for(let k=0;k< this.elfProfiles.length;k++){
        if( this.elfProfiles[k]["id"] == this.params_data){
          this.name= this.elfProfiles[k].user_name;
          this.user_ID=this.flaggedProfile[k].user_id;
          localStorage.setItem('adminuser',  this.user_ID);
          // console.log(this.flaggedProfile[k])
          // localStorage.setItem('adminuser',  this.user_ID);
        }
      }
    })
  }


  chatRequestAccpet() {
    this.chatRequest = !this.chatRequest;
    parseInt(this.data = localStorage.getItem('family'));
    console.log(parseInt(this.data))
  }

  chatRequestAdmin(){
    //this.test();
    this.messageSend = true;
    this.subscriptionCount = 0;
    this.loading = true;
    this.msgsent = true;
    parseInt(this.adminid = localStorage.getItem('sender_id'));
    parseInt(this.users_id = localStorage.getItem('adminuser'));
    this.msgdata = this.Messageform.value.meassage;
    console.log(this.msgdata);

    if (this.imageInput) {
      const temp = {
        "user_id":this.users_id,
        "sender_id":this.adminid,
        "recipient_id":this.users_id,
        "attachment":this.imagefile
      };
      this.httpservice.sendMessageAdmin(temp).subscribe(response =>{
        // this.messages.push(response.data);
        this.messagedata = response;
        this.messageRequest = true;
        this.imageInput = false;
        this.msgdata = '';
        this.Messageform.reset();
        this.imagefile = ''
        //this.admin_conversations();
        this.container = document.getElementById("adminContainer");
        this.container.scrollTop =  this.container.scrollHeight;
        this.loading = false;
      })
    } else {
      const temp = {
        "user_id": this.users_id,
        "sender_id": this.adminid,
        "recipient_id": this.users_id,
        "message": this.msgdata
      };
      this.httpservice.sendMessageAdmin(temp).subscribe(response =>{
        console.log('response from send message api: ', response);
        // this.messages.push(response.data);
        this.messagedata = response;
        this.messageRequest = true;
        this.msgdata = '';
        this.Messageform.reset();
        //this.admin_conversations();
        this.container = document.getElementById("adminContainer");
        this.container.scrollTop =  this.container.scrollHeight;
        this.loading = false;
      })
    }
  }


  user_id:any;
  approvedFamilys:any;
  approvedFamilysbyId:any;
  async getmatchedfamilybyid(id) {
    await this.httpservice.approvedfamilydatabyid(id).subscribe(response => {
      this.approvedFamilys = response;
      console.log(this.approvedFamilys);
      this.name = this.approvedFamilys.data.family_profile.name;
      this.photo = this.approvedFamilys.data.family_profile.photo;
      console.log(this.photo);
      this.approvedFamilysbyId = this.approvedFamilys.data.family_profile.id;
      this.approvedFamilysbyuserId = this.approvedFamilys.data.family_profile.user_id;
      localStorage.setItem('adminuser', this.approvedFamilysbyuserId);
      console.log(this.approvedFamilysbyuserId);
      this.converstastion_with_admin(this.approvedFamilysbyuserId);
      console.log(this.approvedFamilysbyId);
      localStorage.setItem('id',this.approvedFamilysbyId);
      localStorage.setItem('family',this.approvedFamilysbyuserId)
    });
  }

// ===============================admin-detail====================================//
  admin_detail(){
    var user_information = localStorage.getItem('userinformation');
    this.id = JSON.parse(user_information).data.profile["id"];
    localStorage.setItem('sender_id',this.id);
  }


// ===============================elf_id====================================//
  getelfProfile(){
    this.httpservice.getelfData().subscribe(response => {
      this.getdata = response;
      console.log("dataofelf",this.getdata);
      this.elf_id = this.getdata.id;
      localStorage.setItem('id', this.getdata.id);
      console.log(localStorage.setItem('id', this.getdata.id))
    })
  }

  clickonimage(user) {
    this.router.navigate(['/browse-family/profile', user.id,user.user_id]);
  }
// ===============================family_id====================================//

  getnewFamily() {
    this.httpservice.getnewfamilydata().subscribe(response => {
      this.getdata = response;
      this.newfamily = this.getdata.data.family_profiles;
      console.log(this.newfamily)
    })
  }

  goToconverstastion(user){
    this.router.navigate(['/admin/conversations', user.id], {queryParams: {id: user.user_id }});
    // location.reload();
    this.flag_data = false;
    this.getFlagData=user;
    this.userids = user.user_id;
    this.username = user.name;
    this.flagName=user.user_name;
    this.converstastion_with_admin(user.user_id);
    localStorage.setItem('adminuser', this.userids);
    setTimeout(()=>{
      this.test();
    }, 500)
    
    this.onlineStatus = user.user_online;
  }

  familyFlagData(formData){
    formData.user_id=this.flagUserId;
    this.httpservice.addFlagToElf(formData).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Flag added successfully',
        showConfirmButton: false,
        timer: 1000
      })
      this.flagForm.reset();
      this.flagPopup=false;
      this.converstastion_with_admin(this.getFlagId)
      this.goToconverstastion(this.getFlagData);
    })
  }


  removeFlag(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do u want unflag the user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unflag it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let obj={'user_id':this.flagUserId}
        this.httpservice.unFlagUser(obj).subscribe(response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User has been unflagged successfully',
            showConfirmButton: false,
            timer: 2000,
          })
          this.converstastion_with_admin(this.getFlagId);
          this.goToconverstastion(this.getFlagData);
        })
      } else  {
        Swal.fire(
          'Cancelled',
        )
      }
    })
  }

  flaggedPopup(){
    this.flagPopup=!this.flagPopup;
  }

  handleSelection(event) {
    console.log(event.char);
    if (this.msgdata) {
      this.msgdata += event.char;
    } else {
      this.msgdata= event.char;
    }
  }


  getFiles(event) {
    this.searchRef.nativeElement.focus();
    this.imageInput = true;
    this.image_name = event.target.files[0].name;
    const filed: File = event.target.files[0];
    // var reader = new FileReader();
    // reader.onload = this._handleReaderLoaded.bind(this);
    // reader.readAsBinaryString(this.files[0]);
    this.handleInputChange(filed);
  }



  handleInputChange(filed) {
    var file = filed;
    // var pattern = /image-*/;
    var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }



  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    // console.log(base64result);
    this.imagefile="data:image/jpeg;base64,"+base64result;
    console.log(this.imagefile);
    // this will generate base 64 image
  }

  removeImage() {
    this.imagefile = '';
  }

}
