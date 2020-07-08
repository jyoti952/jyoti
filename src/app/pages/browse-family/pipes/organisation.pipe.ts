import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'organisation'
})
export class OrganisationPipe implements PipeTransform {
transform(arr: any[], prop: string, value: string , method:Method): any {
  if (arr) {
    if (!value) {
      return arr
    } else {
      return arr.filter(obj => this.filter(obj[prop],value, method))
    }
  } else {
    return []
  }
}

filter(source :string, target :string, method:Method) : boolean {

  switch(method) {
  
    case "equal"  : return source === target
   
  }
}
}

type Method = "equal"

