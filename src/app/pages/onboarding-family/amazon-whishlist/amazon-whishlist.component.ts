import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { WebSiteInfoModel } from './amazon-whishlist.model.model'

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-amazon-whishlist',
  templateUrl: './amazon-whishlist.component.html',
  styleUrls: ['./amazon-whishlist.component.scss']
})
export class AmazonWhishlistComponent implements OnInit {
  nameRegEx = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";
  constructor(private formBuilder: RxFormBuilder,private fb:FormBuilder) { }

  ngOnInit() {
    let webSiteInfoModel = new WebSiteInfoModel();
    this.amazonWhishlist = this.formBuilder.formGroup(webSiteInfoModel);

    if(localStorage.getItem('amazonLink')==null){
  
    }
    else{
      this.Previous()
    }
  }
  message:any;
   amazonWhishlist = this.fb.group({
      amazonLink:['',[ Validators.required]]
          });


  onSubmit(){
//console.log(this.amazonWhishlist.value);
localStorage.setItem('amazonLink', this.amazonWhishlist.get("amazonLink").value)
  }

  Previous(){
    this.amazonWhishlist.controls['amazonLink'].patchValue(localStorage.getItem('amazonLink'))
  }
  // onpageload(data){
  //   if (data.amazonLink != "" && data.amazonLink != null)
  //   {
  //     window.open(data.amazonLink,'_blank')
  //    return true
  //   }
  // }
}
