import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {
  

    transform(familyInfo: any, searchValue: string): any {
      if(!searchValue) {
        return familyInfo;
      }
       else {
         
        return familyInfo.filter(

          function (x) {
            if(x.name){
            return x.name.toLowerCase().startsWith(searchValue.toLowerCase());
            }


            
          }
      
        )
        
        
      }
    }
  
  
}



