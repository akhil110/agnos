import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { ComboModel } from '../models/combo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items!: Array<ItemModel>;
  public comboOffer!: Array<ComboModel>;

  constructor() {
    this.items = [
      {id: 1, name: 'Black Coffee', price: 15, tax: 2},
      {id: 2, name: 'Cold Coffee', price: 12, tax: 1.75},
      {id: 3, name: 'Tea', price: 8, tax: 0.5},
      {id: 4, name: 'Juice', price: 10, tax: 1.25},
      {id: 5, name: 'Cold Drink', price: 7, tax: 0.85},
      {id: 6, name: 'Mango Shake', price: 12, tax: 2.05},
      {id: 7, name: 'Pineapple Shake', price: 18, tax: 2.15},
      {id: 8, name: 'Milk', price: 5, tax: 0.9},
      {id: 9, name: 'Mocktail', price: 20, tax: 1.5},
      {id: 10, name: 'Salad', price: 24, tax: 3},
      {id: 11, name: 'Bread', price: 5, tax: 0.45},
      {id: 12, name: 'Fries', price: 8, tax: 0.55},
      {id: 13, name: 'Sandwich', price: 18, tax: 1.5},
      {id: 14, name: 'Chips', price: 3, tax: 0.75},
      {id: 15, name: 'Pizza', price: 17, tax: 1.85},
      {id: 16, name: 'Burger', price: 7, tax: 0.25},
      {id: 17, name: 'Momos', price: 14, tax: 0.35},
      {id: 18, name: 'Taco', price: 10, tax: 0.75},
      {id: 19, name: 'Ice Creame', price: 8, tax: 0.80},
      {id: 20, name: 'Pop Corn', price: 5, tax: 0.65}
    ];

    this.comboOffer = [
      {items: [3, 11], discount: 3},
      {items: [4, 11], discount: 2.5},
      {items: [1, 14, 13], discount: 7},
      {items: [5, 20], discount: 4},
      {items: [6, 10], discount: 5},
      {items: [9, 17, 18], discount: 8},
      {items: [2, 19], discount: 6},
      {items: [7, 12], discount: 8},
      {items: [5, 15, 14], discount: 10},
      {items: [3, 14, 20], discount: 7.5},
      {items: [8, 10, 11], discount: 10},
      {items: [1, 15, 18], discount: 12}
    ];
  }

  intersection(first: any, second: any) {
    first = new Set(first);
    second = new Set(second);
    return [...first].filter(item => second.has(item));
  }

  getItemDetail(id: number): ItemModel | undefined {
    return this.items.find(item => item.id === id);
  }

  getComboOffer(arr: Array<number>): any {
    return this.comboOffer.find(combo => JSON.stringify(combo.items) === JSON.stringify(arr));
  }


}
