import { Component, OnInit, ɵConsole, ElementRef,ViewChild } from '@angular/core';
import { Ng2Cable, Broadcaster } from 'ng2-cable';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'
import { window } from 'rxjs/operators';
// import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { getLyThemeStyleUndefinedError } from '@alyle/ui';


@Component({
  selector: 'app-family-dashboard',
  templateUrl: './family-dashboard.component.html',
  styleUrls: ['./family-dashboard.component.scss'],
})
export class FamilyDashboardComponent implements OnInit {
  @ViewChild('search',{static: false}) searchRef: ElementRef;
  currentDate: any = new Date();
  onlineStatus: boolean = false;
  toggled: boolean = false;
  chatRequest = false;
  // If there no matches make "noFamilyMatchFound" flag 'true'
  noFamilyMatchFound:boolean;
  id: any;
  elf_id: any;
  container:any;
  public familymatchdata:any = []
  public familydata;
  public subscriptionlist:any = []
  //public loading = false;
  role:any;
  family: any;
  activatedRoute: any;
  user: void;
  public data ={}
  familyData: any;
  loading: boolean;
  elfmatchdata: any;
  elfdata: any;
  getdata: any;
  elfData: any;
  familydatas :any;
  userId: any;
  iduser: any;
  totalcount;
  messageRequest = false;
  flagPopup:boolean=false;

  Messageform = new FormGroup({
    meassage: new FormControl('')
  });
  msgdata: any;
  conversationslist: any;
  listdata=[];
  username: any;
  userphoto: any;
  userids: any;
  listdatas: any;
  user_role: any;
  messagedata: any;
  sequence:number;
  conversationdata: any;
  current_user_id: any;
  messages = [];
  show:boolean;
  admindata=[];
  received_message = false
  elfid: string;
  unmatch:FormGroup;
  unmatched:boolean=false;
  photos:any;
  unMatchedData:any;
  userid:any;
  userIdMatch:any;
  admin_id: any;
  listdataget: any;
  show_image:boolean
  get_user:boolean;
  elfForm:FormGroup;
  subscriptionCount: number = 0;
  familyid: any;
  users_id: string;
  senders_id: string;
  setFlagData:any;
  imagefile: any;

  msgrecive:boolean = false;
  match_flag:boolean;
  messageSend: boolean = false;
  count: number;
  getFamilyId(data){
    this.router.navigate(['/family/conversations',data.user_id]);
  }
  serviceUrl2 = environment.serviceUrl2;
  constructor(private httpservice: HttpService,private route: ActivatedRoute, private router: Router,private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster,private elementRef:ElementRef,private fb:FormBuilder)

  {
    this.count = 1;
    this.current_user_id = parseInt(this.data = localStorage.getItem('famId'));
    parseInt(this.userId = localStorage.getItem('famId'));
    parseInt(this.elfid = localStorage.getItem('elfidadmin'));

    this.getfamilyprofileMatch();
  }

  ngOnInit() {
    this.loading = true;
    this.getfamilyProfile();
    this.conversations_list();

    JSON.parse(sessionStorage.getItem('famids'));
    this.route.paramMap.subscribe((params: ParamMap) => {
        var id = parseInt(params.get('id'));
      }
    )
    this.unmatch = this.fb.group({
      unmatch_reason:['',Validators.required]
    })

    setTimeout(() => {
      this.getfamilyprofileMatch();
      this.subscribeAdminChat();
    }, 500);

    this.elfForm=this.fb.group({
      flag_reason:['',Validators.required],
      flag_additional_info:['',Validators.required]
    });
  }

  subscribeChat(elf_user_id){
    if(this.subscriptionlist.indexOf(elf_user_id) !== -1) {
      return;
    }else{
      this.ng2cable.subscribe(this.serviceUrl2+'cable', 'ChatChannel', { family_user_id: this.userId, elf_user_id: elf_user_id});
      if(this.subscriptionlist.length == 0){
        this.broadcaster.on<string>('ChatChannel').subscribe(
          message => {
            this.msgdata = message;
            if(document.getElementsByClassName("chat-box")[0].getAttribute("data-id") == this.msgdata.sender_id.toString() || document.getElementsByClassName("chat-box")[0].getAttribute("data-id") == this.msgdata.recipient_id.toString()){
              this.messageSend  = false;
              this.received_message = true;
              localStorage.setItem('msg', this.msgdata);
              this.msgdata.body = this.msgdata.message;
              if (this.msgdata.sender_id == this.current_user_id) {
                this.msgdata.side = 'right';
              } else {
                this.msgdata.side = 'left';
              }
              this.messages.push(this.msgdata);
              this.msgdata = ""
            }
            this.msgdata = ""
            setTimeout(() => {
              this.container = document.getElementById("chatContainer");
              this.container.scrollTo(0, this.container.scrollHeight)
            }, 1000);
          }
        );
      }
      this.subscriptionlist.push(elf_user_id);
    }
  }


  subscribeAdminChat(){
    this.ng2cable.subscribe(this.serviceUrl2+'cable', 'AdminChatChannel', { user_id: this.userId})
      this.broadcaster.on<string>('AdminChatChannel').subscribe(
      message => {
        this.msgdata = message
        if(document.getElementsByClassName("chat-box")[0].getAttribute("data-id") == this.msgdata.sender_id.toString() || document.getElementsByClassName("chat-box")[0].getAttribute("data-id") == this.msgdata.recipient_id.toString()){

          setTimeout(() => {
            this.container = document.getElementById("chatContainer");
            this.container.scrollTo(0, this.container.scrollHeight)
          }, 1000);
          this.messageSend = false;
          this.subscriptionCount++
          this.received_message = true;
          localStorage.setItem('msg',this.msgdata);
          var image = '';
          if (this.msgdata.sender_image == 'assets/images/admin-profile.png') {
              image = "admin image"
            } else if (this.msgdata.sender_image != 'admin image'){
              image = this.msgdata.sender_image
            }else{
              image = "admin image"
            }
          this.msgdata.sender_image = image;
          this.msgdata.body = this.msgdata.message;

          if (this.msgdata.sender_id == this.current_user_id){
            this.msgdata.side = 'right';
          }else{
            this.msgdata.side = 'left';
          }
          this.messages.push(this.msgdata);
          this.msgdata = ""
        }
        this.msgdata = ""
      }
    );
  }

  chatRequestAccpet() {
    this.chatRequest = !this.chatRequest;
  }
  // openFamilyProfileViewPopup() {
  //   const body = document.getElementsByTagName('body')[0];
  //   const html = document.getElementsByTagName('html')[0];
  //   body.classList.add('family-profile-view-popup-open'); html.classList.add('family-profile-view-popup-open');
  // }
  // openUnmatchFamilyPopup() {
  //   const body = document.getElementsByTagName('body')[0];
  //   const html = document.getElementsByTagName('html')[0];
  //   body.classList.add('unmatch-family-popup-open'); html.classList.add('unmatch-family-popup-open');
  // }



//=================family matches==========//
  total_matches:any;
  getfamilyprofileMatch(){
    let user_id;
    this.loading = true;
    this.familymatchdata = [];
    user_id = JSON.parse(sessionStorage.getItem('famids'));
    this.httpservice.familyprofileMatch(user_id).subscribe(response => {
      this.loading = false;
      this.familymatchdata = response.data.elf_profiles;
      if( this.familymatchdata.length != 0){
        this.noFamilyMatchFound=false;
      }
      else{
        this.noFamilyMatchFound=true;
      }
      this.familymatchdata.forEach(element => {
        localStorage.setItem('usersid',element.user_id)
      });
      this.familydata = response.data.total_matches;
      this.totalcount = response.data.total_conversation;
      if( this.familydata==0){
        this.loading = false;
      }

    })
  }

  // send msg to admin

  chatRequestfamily(id){
    this.messageSend = true;
    this.loading = true;
    this.subscriptionCount++;
    // this.subscriptionFunction();
    this.msgdata = this.Messageform.value.meassage
    console.log(this.msgdata)
    parseInt(this.users_id = localStorage.getItem('famId'))
    console.log(parseInt(this.users_id))
    parseInt(this.admin_id = localStorage.getItem('admin_user_id'))
    console.log(parseInt(this.senders_id));
    if (this.imageInput) {
      this.httpservice.familytoadmin({"user_id":this.users_id,"sender_id":this.users_id,"recipient_id":this.admin_id,"attachment":this.imagefile}).subscribe(response =>{
        console.log(response.data.message);
        this.loading = false;
        this.messagedata = response;
        this.Messageform.reset();
        this.imagefile = '';
        this.imageInput = false;
        console.log(this.messagedata);
        this.UserMessages();
      })
    } else {
      this.httpservice.familytoadmin({"user_id":this.users_id,"sender_id":this.users_id,"recipient_id":this.admin_id,"message":this.msgdata}).subscribe(response =>{
        console.log(response.data.message);
        this.loading = false;
        this.messagedata = response;
        this.Messageform.reset();
        console.log(this.messagedata);
        this.UserMessages();
      })
    }

  }

  getfamilyProfile(){
    this.loading = true;
    this.httpservice.getfamilyData().subscribe(response => {
      this.loading = false;
      this.familydatas = response.data.family_profile;
      this.userId = response.data.family_profile.user_id;
      this.familyid = response.data.family_profile.id
      sessionStorage.setItem('famids',this.familyid)
      localStorage.setItem('famId',this.userId)
      console.log(localStorage.setItem('famId',this.userId))
       this.getfamilyprofileMatch();
    })
  }




//==============================chat with famliy and elf==========================//
  familyAndElfmeassge(){
    this.messageSend = true;
    this.subscriptionCount++;
    this.loading = true;
    this.msgdata = this.Messageform.value.meassage
    console.log(this.msgdata)
    parseInt(this.users_id = localStorage.getItem('elfidadmin'))
    console.log(parseInt(this.users_id))
    parseInt(this.id = localStorage.getItem('famId'))
    console.log(parseInt(this.id))
    if(this.imageInput){
      this.httpservice.sendmessageFamily({"family_user_id":this.id,"elf_user_id":this.users_id,"message":this.msgdata,"attachment":this.imagefile}).subscribe(response=>{
        this.loading = false;
        if (response.data.message === 'No content found.') {
          alert(response.data.message);
        }
        else {
          this.messagedata = response;
          this.Messageform.reset();
        }
        this.Messageform.reset();
        this.imagefile = '';
        console.log(response);
        this.UserMessages();
        this.messageRequest = true
        this.imageInput = false;
      })
    }
    else{
      this.httpservice.sendmessageFamily({"family_user_id":this.id,"elf_user_id":this.users_id,"message":this.msgdata}).subscribe(response=>{
        this.loading = false;
        if (response.data.message === 'No content found.') {
          alert(response.data.message);
        }
        else {
          this.messagedata = response;
          this.Messageform.reset();
        }
        this.Messageform.reset();
        console.log(response);
        this.UserMessages();
        this.messageRequest = true
      })
    }


  }


//==============================conversations list with famliy and elf==========================//
  UserMessages(){
    //this.subscriptionFunction();
    this.loading = true;
    this.current_user_id = parseInt(this.data = localStorage.getItem('famId'));
    this.httpservice.ConversationsdwithfamilyElf().subscribe(response=>{
      if  (response.data.message === 'no messages') {
        this.conversationslist = [];

      } else {

        this.conversationslist = response.data.messages;
      }
      if(response.status== true){
        location.reload();
      }
      this.match_flag=response.data.match_flag;
      this.setFlagData=response.data.is_flagged;
      this.loading = false;
      console.log(this.conversationslist);
      this.sequence = 0;
      this.messages = [];
      this.conversationslist.forEach(element => {
        if (element.sender_id == this.current_user_id ){
          element["side"] = "right"
        }else{
          element["side"] = "left"
        }
        this.messages.push(element);
      });
      console.log(this.messages);
    })
  }

//==============================conversations list ==========================//


// side list
  conversations_list(){
    this.httpservice.ConversationslistElfandFamily().subscribe(response => {
      this.listdataget = [];
      this.admindata = [];
      this.listdataget = response.data.conversations;
      // this.admindata = response.data.admins
      for(let k=0; k<this.listdataget.length;k++){
        this.user_role=response.data.conversations[k].user_role;
        if(["elf","family"].includes(this.user_role)){
          this.listdata.push(this.listdataget[k])
        }
        else if(this.user_role == 'admin'){
          this.admindata.push(this.listdataget[k])
        }
      }
      if (this.count <= 1) {
        this.count++;
      if (this.listdata.length > 0) {
        this.goToconverstastion(this.listdata[0]);
        this.show = true;
      } else if  (this.admindata.length > 0) {
        this.goToconverstastion(this.admindata[0]);
        this.show = false;
      }
      }
    })
  }


  openMatchedProfile(data){
    this.noFamilyMatchFound=false;
    // this.router.navigate(['/family/conversations', data.user_id]);
    // location.reload()
    this.unMatchedData=data;
    this.userIdMatch=this.unMatchedData.id;
    this.userids = data.user_id;
    this.iduser = data.user_id;
    localStorage.setItem('famId', data.user_id);
    localStorage.setItem('userids',this.userids);
    localStorage.setItem('elfidadmin', '0');
    this.username = data.user_name;
    this.userphoto = data.photo;
    this.UserMessages();
    if(this.userphoto == null){
      this.show_image=true
    }
    else{
      this.show_image=false
    }
  }

  /*** for elf and family*/
  goToconverstastion(list){
    setTimeout(() => {
      this.subscribeChat(list.user_id);
    }, 500);
    
    localStorage.setItem('admin_user_id',list.user_id);
    this.show = true;
    localStorage.setItem('elfidadmin',list.user_id);
    localStorage.setItem('userids', list.user_id);
    this.unMatchedData=list;
    this.UserMessages();
    this.userids = list.user_id;
    this.iduser = list.user_id;
    this.username = list.user_name;
    this.userphoto = list.photo;
    this.onlineStatus = list.user_online;
    if(this.userphoto == null){
      this.show_image=true
    }
    else{
      this.show_image=false
    }
    this.user_role = list.user_role;
  }


  /*** for admin chats*/
  goToconverstastions(data){
    this.noFamilyMatchFound=false;
    this.unMatchedData=data;
    this.userids = data.user_id;
    this.iduser = data.user_id;
    localStorage.setItem('elfidadmin',data.user_id);
    localStorage.setItem('userids',this.userids);
    localStorage.setItem('admin_user_id',this.userids);
    this.UserMessages();
    this.username = data.user_name;
    this.userphoto = data.photo;
    this.onlineStatus = data.user_online;
    if(this.userphoto == 'admin image'){
      this.show_image=true
    }
    else{
      this.show_image=false
    }
    this.user_role = data.role;
    this.show = false;
  }

  openUnmatchFamilyPopup(){
    this.unmatched=true;
  }

  closeUnmatchFamilyPopup(){
    this.unmatched=false;
  }


  unmatching(formdata){
    formdata.elf_profile_id=this.userIdMatch;
    this.httpservice.addUnMatchedElf(formdata).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'unmatched successfully',
        showConfirmButton: false,
        timer: 1200
      })
      this.unmatched=false;
      this.openMatchedProfile(this.unMatchedData);
      this.getfamilyprofileMatch();
    })
  }

  openFlagList(){
    if (this.username=='MiracleAdmin') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'You cannot add the flag to admin',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      this.flagPopup = true;
    }
  }


  flaggedPopup(){
    this.flagPopup=false;
  }

  familyFlagData(formData){
    this.loading=true;
    formData.user_id=this.unMatchedData.user_id;
    this.httpservice.addFlagToElf(formData).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Flag added successfully',
        showConfirmButton: false,
        timer: 1000
      })
      this.elfForm.reset();
      this.flagPopup = false;
      this.goToconverstastion(this.unMatchedData);
    })
  }

  handleSelection(event) {
    console.log(event.char);
    if (this.msgdata) {
      this.msgdata += event.char;
    } else {
      this.msgdata= event.char;
    }
  }

  imageInput: any;
  image_name: any;
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
    this.imageInput = false;
  }


}


