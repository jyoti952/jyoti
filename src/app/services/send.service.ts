

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SendService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private defaultElfEmail = new BehaviorSubject('defaultmsg');
  emailElfMessage = this.defaultElfEmail.asObservable();


  private defaultElfToken = new BehaviorSubject('defaultmsg');
  tokenElfMessage = this.defaultElfToken.asObservable();


  private defaultFamilyEmail = new BehaviorSubject('defaultmsg');
  emailFamilyMessage = this.defaultFamilyEmail.asObservable();

  private defaultFamilyToken = new BehaviorSubject('defaultmsg');
  tokenFamilyMessage = this.defaultFamilyToken.asObservable();
  

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  forgotEmail(emailvalueElf: string) {
    this.defaultElfEmail.next(emailvalueElf)
  }
  resetToken(resToken: string) {
    this.defaultElfToken.next(resToken)
  }

  forgotEmailFamily(emailvalue: string) {
    this.defaultFamilyEmail.next(emailvalue)
  }
  resetTokenFamily(res: string) {
    this.defaultFamilyToken.next(res)
  }



}
