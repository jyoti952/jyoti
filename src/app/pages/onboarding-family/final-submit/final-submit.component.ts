import { Component, OnInit } from '@angular/core';
import { HttpObservableService } from 'src/app/services/http-observable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-submit',
  templateUrl: './final-submit.component.html',
  styleUrls: ['./final-submit.component.scss']
})
export class FinalSubmitComponent implements OnInit {

  constructor(private httpObservableService:HttpObservableService,private routerNavigate:Router) { }

  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function(event) {
     history.go(0);
  };
  }

  logoutAction() {

    localStorage.clear();
    sessionStorage.clear();
    
    if (this.httpObservableService.logOutAction()) {
      this.routerNavigate.navigate(['/login/family'])
    }
  }
}
