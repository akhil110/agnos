import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pairs'
})
export class PairsPipe implements PipeTransform {

  transform(value:any) {
    return value.filter((v: any,i: any) => i%2==0).map((v: any,i: any) => [value[i * 2], value[i * 2 + 1]])
  }

}
