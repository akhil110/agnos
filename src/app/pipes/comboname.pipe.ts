import { Pipe, PipeTransform } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { DataService } from '../service/data-service.service';

@Pipe({
  name: 'comboname'
})
export class CombonamePipe implements PipeTransform {
  constructor(private dataService: DataService) {
  }

  transform(value: Array<number>, ...args: any[]): string {
    let comboNames: string = '';
    let oItem: ItemModel;

    value.map((i: number) => {
      oItem = this.dataService.items.find(item => item.id === i) as ItemModel;
      if (comboNames === '') {
        comboNames = oItem.name;
      } else {
        comboNames += ' + ' + oItem?.name;
      }
    });
    return comboNames
  }
}
