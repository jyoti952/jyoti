import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchbyname'
})
export class SearchbynamePipe implements PipeTransform {
  

  transform(elfProfiles: any, searchValue: string): any {
    if(!searchValue) {
      return elfProfiles;
    }
     else {
       
      return elfProfiles.filter(

        function (x) {
          if(x.user_name){
          return x.user_name.toLowerCase().startsWith(searchValue.toLowerCase());
          }


          
        }
    
      )
      
      
    }
  }


}



