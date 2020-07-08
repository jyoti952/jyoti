import { Component, HostListener, OnInit, ElementRef,ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Ng2Cable, Broadcaster } from 'ng2-cable';
import { Subscription } from 'rxjs';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;
import { environment } from '../../../environments/environment';
import { getLyThemeStyleUndefinedError } from '@alyle/ui';

// import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  @ViewChild('search',{static: false}) searchRef: ElementRef;

  chatRequest = false;
  messageRequest = false;
  id: any;
  browseFamilyById: any;
  familyInfobyId: any = {};
  organisation: any
  elf_id: any;
  public loading = false;
  public subscriptionlist:any = []
  role: any;
  family: any;
  activatedRoute: any;
  getelfprofileMatch: any;
  public elfmatchdata: any = []
  public elfdata = {};
  familydata: any;
  image: any = {};
  name: any = {}
  userId: any;
  msgdata: any;
  subscription: Subscription;
  profile_detail:boolean=false;
  userphotodata: any

  toggled: boolean = false;

  onlineStatus: boolean = false;

  Messageform = new FormGroup({
    meassage: new FormControl('')
  });


  conversationslist: any;
  listdata = [];
  objectData: any;
  arrayObj: any;
  userdata: void;
  userphoto: any;
  iduser: any;
  messages = [];
  current_user_id: any;
  conversationdata: any;
  user_id: any;
  messagedata: any;
  userids: any;
  user_role: any;
  admindata = [];
  received_message = false
  userIdfamily: string;
  container: any;
  userid: any;
  flagPopup: boolean = false;
  flagName: any;
  elfForm: FormGroup;
  listdataget: any;
  unmatched: boolean = false;
  unmatches: FormGroup;
  family_id: any;
  getFlagData:any;
  serviceUrl2 = environment.serviceUrl2;
  senders_id: string;
  users_id: string;
  messageSend: boolean = false;
  count: number ;
  constructor(private httpservice: HttpService, private route: ActivatedRoute, private router: Router, private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster, private elementRef: ElementRef, private fb: FormBuilder) {
    this.count = 1;
    
    parseInt(this.userId = localStorage.getItem('elfuser'))
    if (localStorage.getItem('famId') == undefined) {
      parseInt(this.userIdfamily = localStorage.getItem('userids'))
    } else {
      parseInt(this.userIdfamily = localStorage.getItem('famId'))
    }
  }


  chatRequestAccpet() {
    this.chatRequest = !this.chatRequest;
  }

  openLetterProfileViewPopup() {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    body.classList.add('letter-profile-view-cpopup-open'); html.classList.add('letter-profile-view-popup-open');
  }
  ngOnInit() {

    this.loading = true
    this.getelfprofilematch();
    this.getelfProfile();
    
    this.conversations_list();
    this.route.paramMap.subscribe((params: ParamMap) => {
      var id = parseInt(params.get('id'));
      if (!isNaN(id)) {

        this.getbrowseFamilyId(id);
      }
      this.family_id = parseInt(params.get('id'));
    });

    this.elfForm = this.fb.group({
      flag_reason: ['',Validators.required],
      flag_additional_info: ['',Validators.required],
    });

    this.unmatches = this.fb.group({
      unmatch_reason: ['',Validators.required]
    })
    setTimeout(() => {
      this.subscribeAdminChat();
    }, 500);
  }


  subscribeChat(family_user_id){
    if(this.subscriptionlist.indexOf(family_user_id) !== -1) {
      return;
    }else{
      this.ng2cable.subscribe(this.serviceUrl2+'cable', 'ChatChannel', { family_user_id: family_user_id, elf_user_id: this.userId});

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
            setTimeout(() => {
              this.container = document.getElementById("msgContainer");
              this.container.scrollTo(0, this.container.scrollHeight)
            }, 1000);
          }
        );
      }
      this.subscriptionlist.push(family_user_id);

    }
  }


  subscribeAdminChat(){
    this.ng2cable.subscribe(this.serviceUrl2+'cable', 'AdminChatChannel', { user_id: this.userId});

    this.broadcaster.on<string>('AdminChatChannel').subscribe(
      message => {
        this.msgdata = message;
        if(document.getElementsByClassName("chat-box")[0].getAttribute("data-id") == this.msgdata.sender_id.toString() || document.getElementsByClassName("chat-box")[0].getAttribute("data-id") == this.msgdata.recipient_id.toString()){
          setTimeout(() => {
            this.container = document.getElementById("msgContainer");
            this.container.scrollTo(0, this.container.scrollHeight)
          }, 1000);
          this.messageSend = false;

          this.received_message = true;
          this.msgdata = message

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

  user: any;

  getbrowseFamilyId(id) {
    this.httpservice.getbrowseFamilyById(id).subscribe(response => {
      this.loading = false
      this.browseFamilyById = response;
      this.familyInfobyId = this.browseFamilyById.data.family_profile
      console.log(this.familyInfobyId)
      //console.log("familybyidd", this.familyInfobyId)
      //console.log('browseFamilyById', this.browseFamilyById)
    })

  }

  copycommand() {
    var a = $('#wishlist').text();
    var t = a.split(" ").join('');
    $('#wishlist').append('<input value=' + t + '>')
    $('input').select();
    document.execCommand('copy');
    $('#wishlist > input').remove()
  }





  //==============================chat with famliy and elf==========================//
  familyAndElfmeassge() {
    this.messageSend = true;
    this.loading = true;
    this.msgdata = this.Messageform.value.meassage
    parseInt(this.users_id = localStorage.getItem('elfuser'))
    parseInt(this.id = localStorage.getItem('Ids'))
    if (this.imageInput) {
      this.httpservice.sendmessageElf({"elf_user_id":this.users_id,"family_user_id":this.id,"message":this.msgdata,"attachment":this.imagefile}).subscribe(response => {
        this.loading = false;
        //this.Messageform.reset()
        this.messageRequest = true
        this.imageInput = false;
        this.imagefile = '';
        this.container = document.getElementById("msgContainer");
        this.container.scrollTop = this.container.scrollHeight;
      })

    }
    else{
      this.httpservice.sendmessageElf({"elf_user_id":this.users_id,"family_user_id":this.id,"message":this.msgdata}).subscribe(response => {
        this.loading = false;
        //this.Messageform.reset()
        this.messageRequest = true
        this.container = document.getElementById("msgContainer");
        this.container.scrollTop = this.container.scrollHeight;
      })
    }

  }


  getdata: any;
  elfData: any;
  user_name: any;
  state: any;
  is_anonymous: boolean;
  anonymous: any;
  profile_bio: any;
  family_preference: any;
  username: any = {}
  statename: any = {}
  elf_email: any;
  img: any = {}
  sequence: number;
  show: boolean = false;
  usernamedata: any;
  getDataFlag: any;
  getDataIsflagged:any;

  getelfProfile() {
    this.httpservice.getelfData().subscribe(response => {
      this.loading = false;
      this.getdata = response;
      this.elfData = this.getdata.data.elf_profile
      this.image = this.elfData.photo;
      this.username = this.elfData.user_name;
      this.statename = this.elfData.state;
      this.elf_id = this.elfData.id;
      this.user_id = this.elfData.user_id

      console.log(this.user_id)
      localStorage.setItem('elfuser', this.elfData.user_id)
      console.log(this.elf_id)
      localStorage.setItem('use_id', this.elfData.id);
      console.log(localStorage.setItem('use_id', this.elfData.id))
    })
  }

  //=================elf matches==========//

  getelfprofilematch() {
    let id;
    // const arrayObj = any;
    // const objectData = any;

    this.id = localStorage.getItem('id')
    this.httpservice.elfprofileMatch(this.id).subscribe(response => {
      this.loading = false;
      this.elfmatchdata = response.data.family_profiles;
      for (let index = 0; index < this.elfmatchdata.length; index++) {
        this.arrayObj = this.elfmatchdata[index];
        this.arrayObj.filter((family) => {
          if (family.id === id) {
            this.objectData = family;
          }
        });
      }
    })

  }

  //==============================conversations list with famliy and elf==========================//

  // get all messages
  UserMessages() {
    this.loading = true;
    this.current_user_id = parseInt(this.userId = localStorage.getItem('elfuser'));
    this.httpservice.ConversationsElf().subscribe(response => {
      this.loading = false;
      this.conversationslist = response.data.messages;
      this.getDataIsflagged = response.data.is_flagged;
      this.sequence = 0;
      this.messages = [];
      this.conversationslist.forEach(element => {
        if (element.sender_id == this.current_user_id) {
          element["side"] = "right"
        } else {
          element["side"] = "left"
        }
        this.messages.push(element)
      });
    })
  }


  // admin chat with family or family
  sendmeassgeAdmin() {
    this.loading = true;
    this.messageSend = true;
    this.msgdata = this.Messageform.value.meassage
    parseInt(this.senders_id = localStorage.getItem('elfuser'))
    parseInt(this.id = localStorage.getItem('userids'))
    if (this.imageInput) {
      this.httpservice.sendMessagetelfToadmin({"user_id":this.senders_id,"sender_id":this.senders_id,"recipient_id":this.id,"attachment":this.imagefile}).subscribe(response => {
        this.messagedata = response;
        this.Messageform.reset();
        this.messageRequest = true;
        this.imageInput = false;
        this.imagefile = '';
        console.log(this.messagedata);
        //this.UserMessages();
        this.loading = false;
        this.container = document.getElementById("msgContainer");
        this.container.scrollTop = this.container.scrollHeight;
        document.addEventListener('keypress', (ev) => {
          console.log(ev);
          if (ev.keyCode === 13) {
            console.log('send image');

          }
        })
      })
    } else {
      this.httpservice.sendMessagetelfToadmin({"user_id":this.senders_id,"sender_id":this.senders_id,"recipient_id":this.id,"message":this.msgdata}).subscribe(response => {
        this.messagedata = response;
        this.Messageform.reset();
        this.messageRequest = true;
        console.log(this.messagedata);
        //this.UserMessages();
        this.loading = false;
        this.container = document.getElementById("msgContainer");
        this.container.scrollTop = this.container.scrollHeight;
      })
    }
  }

  //==============================conversations list ==========================//
  // all conversation list
  conversations_list() {
    this.httpservice.ConversationslistElfandFamily().subscribe(response => {
      this.listdataget = [];
      this.admindata = [];
      this.listdata = [];
      this.listdataget = response.data.conversations
      // this.admindata = response.data.admins
      for (let k = 0; k < this.listdataget.length; k++) {
        this.user_role = response.data.conversations[k].user_role;
        if (["elf", "family"].includes(this.user_role)) {
          this.listdata.push(this.listdataget[k])
        }
        else if (this.user_role == 'admin') {
          this.admindata.push(this.listdataget[k])
          console.log(this.admindata)
        }
      }
      this.route.queryParams.subscribe(params => {
        console.log(params);
        if (params.id) {
            for (var i = 0; i < response.data.conversations.length; i++) {
              if (params.id == response.data.conversations[i].user_id) {
                this.goToconverstastion(response.data.conversations[i]);
              }
            }
        } else {
          if (this.listdata.length > 0) {
            this.goToconverstastion(this.listdata[0]);
            this.show = true;
          } else if  (this.admindata.length > 0) {
            this.goToconverstastion(this.admindata[0]);
            this.show = false;
          }
        }
      });
       if (this.count <= 1) {
         this.count++;
       }
    })
  }

  openMatchedProfile(family) {
    this.router.navigate(['/conversations', family.id]);
    this.iduser = family.user_id
    this.show = true;
    localStorage.setItem('userids', this.iduser)
    setTimeout(() => {
      this.subscribeChat(family.user_id)
    }, 500)
    
    this.UserMessages()
    this.usernamedata = family.name
    this.userphotodata = family.photo
    localStorage.setItem('Ids', this.iduser)
    console.log(localStorage.setItem('Ids', this.iduser))
    this.userdata = family.name
    this.userphoto = family.phot
    this.getDataFlag = family;
    this.familyInfobyId=family;
  }


  goToconverstastion(list) {

    this.userids = list.user_id;
    this.iduser = list.user_id
    console.log(this.userids);
    localStorage.setItem('userids', this.userids);
    setTimeout(() => {
      this.subscribeChat(list.user_id)
    }, 500)
    
    this.UserMessages();
    localStorage.setItem('Ids', this.userids);
    this.usernamedata = list.user_name;
    this.user_role = list.user_role;
    this.userphotodata = list.photo;
    console.log(this.user_role);
    this.show = true;
    this.getDataFlag = list;
    this.familyInfobyId=list;
    this.onlineStatus = list.user_online;
    console.log(this.getDataFlag)
  }

  goToconverstastions(data) {
    // this.profile_detail = false;
    console.log(data);
    // this.router.navigate(['/conversations', data.user_id]);
    this.userids = data.user_id;
    this.iduser = data.user_id
    localStorage.setItem('userids', this.userids);
    this.UserMessages();
    this.usernamedata = data.username;
    this.userphotodata = data.photo;
    this.show = false;
    this.user_role = data.user_role;
    this.onlineStatus = data.user_online;
    this.getDataFlag = data;
    this.familyInfobyId = data;
    console.log(this.familyInfobyId);
  }


  newMatchedFlagData(formData) {
    formData.user_id = this.user_id;
    this.httpservice.addFlagToElf(formData).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Flag added successfully',
        showConfirmButton: false,
        timer: 1000
      })
      this.flagPopup = false;
      this.elfForm.reset();
      this.openMatchedProfile(this.getDataFlag)
      // this.router.navigate(['/conversations']);
    })
  }

  openflag() {
    if (this.getDataFlag.user_name=='MiracleAdmin') {
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
      this.flagName = this.getDataFlag.name
      this.user_id = this.getDataFlag.user_id;
    }
  }

  closeflag() {
    this.flagPopup = false;
  }

  closeUnmatchFamilyPopup() {
    this.unmatched = false;
  }

  unmatch() {
    this.unmatched = true;
    this.userid = this.familyInfobyId.id
  }

  unmatching(formdata) {
    formdata.family_profile_id = this.userid;
    this.httpservice.addUnMatched(formdata).subscribe(response => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'unmatched successfully',
        showConfirmButton: false,
        timer: 1200
      })
      this.unmatched = false;
      this.flagPopup = false;
      this.router.navigate(['/conversations']);
    })
  }

  openProfileDetail(){
    this.profile_detail=!this.profile_detail;
  }


  handleSelection(event) {
    console.log(event.char);
    if (this.msgdata) {
      this.msgdata += event.char;
    } else {
      this.msgdata= event.char;
    }
  }
  KeyPress(ev) {
    console.log(ev);
  }

  imageInput: any;
  image_name: any;
  getFiles(event) {
    console.log(event);
    this.searchRef.nativeElement.focus();
    this.imageInput = true;
    this.image_name = event.target.files[0].name;
    const filed: File = event.target.files[0];
    // var reader = new FileReader();
    // reader.onload = this._handleReaderLoaded.bind(this);
    // reader.readAsBinaryString(this.files[0])
    this.handleInputChange(filed);
  }


  imagefile: any;
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
