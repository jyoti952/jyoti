import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matched'
})
export class MatchedPipe implements PipeTransform {
  

  transform(approvedFamilies: any, searchValue: string): any {
    if(!searchValue) {
      return approvedFamilies;
    }
     else {
       
      return approvedFamilies.filter(

        function (x) {
          if(x.name){
          return x.name.toLowerCase().startsWith(searchValue.toLowerCase());
          }


          
        }
    
      )
      
      
    }
  }


}