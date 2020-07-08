import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversation'
})
export class ConversationPipe implements PipeTransform {

  transform(admindata: any, searchValue: string): any {

    if(!searchValue) {
      return admindata;
    }
   else
   {
       
    return admindata.filter(

      function (x) {
        if(x.user_name){
        return x.user_name.toLowerCase().startsWith(searchValue.toLowerCase());
        }


        
      }
  
    )
    
    
  }
  }

}
