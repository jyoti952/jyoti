/**
* Http Service
* allow you to define code that's accessible and reusable throughout multiple components in all modules
* @package HttpService
* @subpackage app\services\httpservice
* @author Miracle On 22nd Street, Nagaraju M.
*/


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpUrl } from './httpUrl.component';
import { HttpObservableService } from './http-observable.service';
import { Observable } from 'rxjs';
import { SendService } from './send.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  data: string;
  users_id: string;
  msgdata: string;
  id: string;
  senders_id: string;
  users_ids: string;
  newusers_id: string;
  admin_id: string;

  serviceUrl = environment.serviceUrl;




  constructor(private http: HttpClient, private dataClient: HttpObservableService, private send: SendService) { }

  santaId = +localStorage.getItem('santaid')
  familyphotoId = +localStorage.getItem('photoid')
  elfPhotoId = +localStorage.getItem('elfPhotoId')
  sender_id = +localStorage.getItem('sender_id')
  user_id = +localStorage.getItem('sender_id')

  public Signupfamily(PostDatafamily): Observable<any> {
    return this.http.post<any>(HttpUrl.signupFamily, PostDatafamily);
  }

  public Signupelf(PostDataelf): Observable<any> {
    return this.http.post<any>(HttpUrl.signupElf, PostDataelf);
  }
  public forgotElf(forgotElf): Observable<any> {
    return this.http.post<any>(HttpUrl.forgotPassword, forgotElf);
  }

  public forgotFamily(forgotFamily): Observable<any> {
    return this.http.post<any>(HttpUrl.forgotPassword, forgotFamily);
  }
  public resetPassword(reset): Observable<any> {
    return this.http.post<any>(HttpUrl.resetPassword, reset);
  }
  public onboardingElf(elfOnboarding): Observable<any> {
    return this.http.post<any>(HttpUrl.onboardingElf, elfOnboarding);
  }
  public onboardingFamily(familyOnboarding): Observable<any> {
    return this.http.post<any>(HttpUrl.onboardingFamily, familyOnboarding);
  }
  public getbrowseFamily() {
    return this.http.get<any>(HttpUrl.browseFamily);
  }

  public filterbrowseFamily(obj) {
    let parmas = new HttpParams().set("family_preferences", obj.family_prefernces).set("organisation", obj.organization).set("location", obj.location);
    return this.http.get<any>(HttpUrl.browseFamily, { params: parmas });
  }

  public filterFamilySignup(obj) {
    let parmas = new HttpParams().set("family_preferences", obj.family_prefernces).set("organisation", obj.organization).set("location", obj.location);
    return this.http.get<any>(HttpUrl.newfamilyList, { params: parmas });
  }

  public filterFamilys(obj) {
    let parmas = new HttpParams().set("family_preferences", obj.family_prefernces).set("organisation", obj.organization).set("location", obj.location);
    return this.http.get<any>(HttpUrl.approvedFamilys, { params: parmas });
  }

  public filterelfprofilesinAdmin(obj) {
    let parmas = new HttpParams().set("family_preferences", obj.family_prefernces).set("organisation", obj.organization).set("location", obj.location);
    return this.http.get<any>(HttpUrl.elfprofilesinAdmin, { params: parmas });
  }

  public elfMatches(obj, id) {
    let parmas = new HttpParams().set("family_preferences", obj.family_prefernces).set("organisation", obj.organization).set("location", obj.location);
    return this.http.get<any>(HttpUrl.elfmatches + '?elf_profile_id' + '=' + id, { params: parmas });
  }

  public getbrowseFamilyById(id: number) {
    return this.http.get<any>(HttpUrl.browseFamilyById + '/' + id);
  }
  public matchFamily(matchFamily): Observable<any> {
    return this.http.post<any>(HttpUrl.matchwithFamily, matchFamily);
  }
  public getelfData(): Observable<any> {
    return this.http.get<any>(HttpUrl.elfGetdata);
  }
  public getfamilyData(): Observable<any> {
    return this.http.get<any>(HttpUrl.familyGetdata);
  }

  public getelfDatabyid(id: number): Observable<any> {
    return this.http.get<any>(HttpUrl.elfGetdata + '/' + id);
  }

  public getBlockedbyid(id): Observable<any> {
    return this.http.get<any>(HttpUrl.blockeddata + '?user_id=' + id);
  }

  public elfprofileMatch(id): Observable<any> {

    return this.http.get<any>(HttpUrl.elfprofileMatchdata + '?elf_profile_id' + '=' + id);
  }


  public elfprofileonlyMatch(id): Observable<any> {

    return this.http.get<any>(HttpUrl.elfprofileMatchdata + '?elf_profile_id' + '=' + id);
  }
  public familyprofileMatch(id): Observable<any> {
    return this.http.get<any>(HttpUrl.familyprofileMatchdata + '?family_profile_id' + '=' + id);
  }

  public updateElf(value, id): Observable<any> {
    return this.http.put<any>(HttpUrl.updateElfProfile + '/' + id, value);
  }

  public update(id: number) {
    return this.http.get<any>(HttpUrl.browseFamilyById + '/' + id);
  }

  public updateFamily(value, id): Observable<any> {
    return this.http.put<any>(HttpUrl.updateFamilyProfile + '/' + id, value);
  }
  // public serchbyState(searchValue: any): Observable<any> {
  //   return this.http.get<any>(HttpUrl.searchdata + 'filter_param=state' + '&' + 'filter_value=' + searchValue);
  // }

  public logoutElf(data: any): Observable<any> {
    return this.http.delete<any>(HttpUrl.logoutElf, data);

  }

  public getnewfamilydata(): Observable<any> {
    return this.http.get<any>(HttpUrl.newfamilyList);
  }
  public getmatcheddata(): Observable<any> {
    return this.http.get<any>(HttpUrl.matchedlist);
  }

  public getnewfamilydatabyid(id: number): Observable<any> {
    return this.http.get<any>(HttpUrl.newfamilyListbyid + '/' + id);
  }

  public getelfprofilesinAdmin(): Observable<any> {
    return this.http.get<any>(HttpUrl.elfprofilesinAdmin);
  }

  public approvedfamilydata(): Observable<any> {
    return this.http.get<any>(HttpUrl.approvedFamilys);
  }

  public approvedfamilydatabyid(id: number): Observable<any> {
    return this.http.get<any>(HttpUrl.approvedFamilysbyid + '/' + id);
  }

  public declinedfamilydata(): Observable<any> {
    return this.http.get<any>(HttpUrl.declinedFamilys);
  }
  public matchedfamilydata(): Observable<any> {
    return this.http.get<any>(HttpUrl.matchedfamily);
  }

  public approvefamily(approved): Observable<any> {
    return this.http.post<any>(HttpUrl.approvedFam, approved);
  }

  public declinefamily(decline): Observable<any> {
    return this.http.post<any>(HttpUrl.declineFam, decline);
  }

  public Elfphoto(elf): Observable<any> {
    return this.http.post<any>(HttpUrl.elfPic, elf);
  }
  public getElfphoto(): Observable<any> {
    return this.http.get<any>(HttpUrl.getelfPic + this.elfPhotoId);
  }

  public santaLetterurl(s): Observable<any> {
    return this.http.post<any>(HttpUrl.santa, s);
  }


  public Familyphoto(fam): Observable<any> {
    return this.http.post<any>(HttpUrl.familyPhoto, fam);
  }

  public getSanta(santaid): Observable<any> {
    const santaphotoId = santaid;

    return this.http.get<any>(HttpUrl.getSantaid + santaphotoId);
  }

  public getFamilyphoto(photoid): Observable<any> {
    const familyphotoIds = photoid
    return this.http.get<any>(HttpUrl.getfamilyphotoid + familyphotoIds);
  }

  public getSelectedfamilyProfile(id): Observable<any> {
    return this.http.get<any>(HttpUrl.getSelectedProfile + '/' + id);
  }

  public contactDetails(contact): Observable<any> {
    return this.http.post<any>(HttpUrl.contactDetails, contact);
  }

  public userAnalyticsgetdata(value): Observable<any> {
    return this.http.get<any>(HttpUrl.useranylytics + '?query=' + value);
  }

  public adminConversationsdata(): Observable<any> {
    return this.http.get<any>(HttpUrl.adminconversastion);
  }

  public sendMessageAdmin(data) {
    return this.http.post<any>(HttpUrl.sendmessage,data);
  }

  public familytoadmin(data) {
    return this.http.post<any>(HttpUrl.sendmessage,data);
  }

  public sendMessagetelfToadmin(data) {

    return this.http.post<any>(HttpUrl.sendmessage ,data);
  }



  public ConversationsdwithAdmin(id): Observable<any> {


    parseInt(this.users_id = localStorage.getItem('adminuser'))



    return this.http.get<any>(HttpUrl.conversastionWithAdmin + '?user_id' + '=' + id);
  }



  public sendmessageFamily(data) {
    parseInt(this.users_id = localStorage.getItem('elfidadmin'))
    console.log(parseInt(this.users_id))
    parseInt(this.id = localStorage.getItem('famId'))
    console.log(parseInt(this.id))
    this.msgdata = localStorage.getItem('message')
    console.log(this.msgdata)
    return this.http.post<any>(HttpUrl.FamilyAndElfConverstion,data)
  }

  public ConversationsdwithfamilyElfadmin(): Observable<any> {
    parseInt(this.users_id = localStorage.getItem('elfidadmin'))
    console.log(parseInt(this.users_id))
    return this.http.get<any>(HttpUrl.SendMessageFamily + '?user_id' + '=' + this.users_id);
  }


  public ConversationsdwithfamilyElf(): Observable<any> {
    if (localStorage.getItem('elfidadmin') == '0') {
      parseInt(this.users_id = localStorage.getItem('userids'))
    } else {
      parseInt(this.users_id = localStorage.getItem('elfidadmin'))
    }
    console.log(parseInt(this.users_id))
    return this.http.get<any>(HttpUrl.SendMessageFamily + '?user_id' + '=' + this.users_id);
  }

  public ConversationsElf(): Observable<any> {
    parseInt(this.users_ids = localStorage.getItem('userids'))
    console.log(parseInt(this.users_ids))
    return this.http.get<any>(HttpUrl.SendMessageFamily + '?user_id' + '=' + this.users_ids);
  }

  public sendmessageElf(data) {
    return this.http.post<any>(HttpUrl.FamilyAndElfConverstion,data);
  }

  public ConversationslistElfandFamily(): Observable<any> {
    return this.http.get<any>(HttpUrl.ElfandFamilyConverstionlist);
  }

  public removeFamily(remove): Observable<any> {
    return this.http.put<any>(HttpUrl.removeFamily, remove);
  }

  public getBlockeUsers() {
    return this.http.get<any>(HttpUrl.blocked_users);
  }

  public addFlagToElf(obj): Observable<any> {
    return this.http.post<any>(HttpUrl.addFlagElf, obj);
  }

  public getFlaggedData(): Observable<any> {
    return this.http.get<any>(HttpUrl.flaggedList);
  }

  public unFlagUser(obj): Observable<any> {
    return this.http.put<any>(HttpUrl.unFlagUser, obj);
  }

  public addUnMatched(obj): Observable<any> {
    return this.http.post<any>(HttpUrl.unMatchUser, obj);
  }

  public addUnMatchedElf(obj): Observable<any> {
    return this.http.post<any>(HttpUrl.unMatchElfUser, obj);
  }


}



