import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value:string,separator:string="-"): string {

  // let  result=value.split("").join(separator)
  //   return result;
  let result=[];
  let valueAfterSplit=value.split('');
 for(let i=0;i<valueAfterSplit.length;i+=4){
   result.push(value.slice(i,i+4));
 }

 return result.join(separator)
  }

}
