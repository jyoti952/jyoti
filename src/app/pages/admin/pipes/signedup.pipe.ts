import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signedup'
})
export class SignedupPipe implements PipeTransform {
  

  transform(signedUpFamilies: any, searchValue: string): any {
    if(!searchValue) {
      return signedUpFamilies;
    }
     else {
       
      return signedUpFamilies.filter(

        function (x) {
          if(x.name){
          return x.name.toLowerCase().startsWith(searchValue.toLowerCase());
          }


          
        }
    
      )
      
      
    }
  }


}