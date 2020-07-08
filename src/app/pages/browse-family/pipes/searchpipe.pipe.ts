import { Pipe, PipeTransform } from '@angular/core';
import { state } from '@angular/animations';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

 
  transform(items: any, filter: any,defaultFilter: boolean): any {
    // if(!searchValue) {
    //   return familyInfo;
    // }
    //  else {
    //   return familyInfo.filter(
    //     function (x) {
    //       return x.state.toLowerCase().startsWith(searchValue.toLowerCase());
          
    //     }
    
    //   )
    // }


    if (!filter){
      return items;
    }

    if (!Array.isArray(items)){
      return items;
    }

    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item =>
            filterKeys.reduce((x, keyName) =>
                (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
      }
      else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
          });
        });
      }
    }
  }

  }




