import {  url,required } from "@rxweb/reactive-form-validators"
export class WebSiteInfoModel {

    @url() 
    @required()
    facebookLink: string;
    

}