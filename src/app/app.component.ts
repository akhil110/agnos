import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComboModel } from './models/combo.model';
import { ItemModel } from './models/item.model';
import { DataService } from './service/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public comboItems!: Array<ComboModel>;
  public menuItems!: Array<ItemModel>;
  public totItems: number = 0;
  public halfItems: number = 0;
  public chkChecked: number = 0;
  public disable: boolean = false;
  public finalObj: any = {};
  private itemArr: Array<number> = [];
  private comboItemArr: Array<any> = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.comboItems = this.dataService.comboOffer;
    this.menuItems = this.dataService.items;
    this.totItems = this.menuItems.length;
    this.halfItems = this.totItems / 2;
  }

  getSelectedItem(event: any) {
    const itemId = +event.target.defaultValue;
    this.comboItemArr = [];
    if (event.target.checked) {
      this.itemArr.push(itemId);
      this.chkChecked += 1;
    } else {
      const index = this.itemArr.indexOf(itemId);
      if (index > -1) {
        this.itemArr.splice(index, 1);
        this.chkChecked -= 1;
      }
    }
  }

  calcBill() {
    if (this.itemArr.length > 0) {
      this.disable = true;
      this.getCombos();
    }
  }

  getCombos() {
    this.comboItemArr = [];
    if (this.itemArr.length > 1) {
      this.dataService.comboOffer.map((combo: any) => {
        if (this.dataService.intersection(this.itemArr, combo.items).length === combo.items.length) {
          this.comboItemArr.push(combo.items);
          this.filterComboOffers();
        } else {
          this.filterComboOffers();
        }
      });
    } else {
      this.calcAmt();
    }
  }

  filterComboOffers() {
    if (this.comboItemArr.length > 0) {
      for(let i = 0; i < this.comboItemArr.length; i++) {
        if (this.dataService.intersection(this.itemArr, this.comboItemArr[i]).length > 0) {
          if (this.dataService.intersection(this.itemArr, this.comboItemArr[i]).length === this.comboItemArr[i].length) {
            for (let j = 0; j < this.comboItemArr[i].length; j++) {
              const index = this.itemArr.indexOf(this.comboItemArr[i][j]);
              if (index > -1) {
                this.itemArr.splice(index, 1);
              }
            }
          } else {
            this.comboItemArr[i] = [];
          }
        }
      }
    }
    this.calcAmt();
  }

  calcAmt() {
    let tmpArr: any = [];
    let tmpObj: any = {};
    let amt: number = 0;
    let totAmt: number = 0;
    if (this.itemArr.length > 0) {
      this.itemArr.map((item: any) => {
        tmpObj = this.dataService.getItemDetail(item);
        amt = (((tmpObj.price * tmpObj.tax) / 100) + tmpObj.price).toFixed(2);
        totAmt += +amt;
        tmpArr.push({name: tmpObj.name, price: tmpObj.price, tax: tmpObj.tax, amt});
      });
      this.finalObj.item = tmpArr;
      tmpArr = [];
      amt = 0;
    }
  
    if (this.comboItemArr.length > 0) {
      let comboArr: any = [];
      let comboObj: any = {}
      let comboAmt: number = 0;
      this.comboItemArr.map((combo: any) => {
        if (combo.length > 0) {
          combo.map((item: any) => {
            tmpObj = this.dataService.getItemDetail(item);
            amt = (((tmpObj.price * tmpObj.tax) / 100) + tmpObj.price).toFixed(2);
            comboAmt += +amt;
            tmpArr.push({name: tmpObj.name, price: tmpObj.price, tax: tmpObj.tax, amt});
          });
          comboObj.discount = +this.dataService.getComboOffer(combo).discount;
          comboObj.amt = (comboAmt - ((comboAmt * comboObj.discount) / 100)).toFixed(2);
          totAmt += +comboObj.amt;
          comboObj.items = tmpArr;
          comboArr.push(comboObj);
          comboObj = {};
          tmpArr = [];
        }
      });
      this.finalObj.combos = comboArr;
      comboArr = [];
    }
    this.finalObj.totAmt = totAmt.toFixed(2);
  }

  resetForm() {
    this.disable = false;
    const checkboxes: any = document.getElementsByName('chk');
    for (let checkbox of checkboxes) {
      checkbox.checked = false;
    }
    this.chkChecked = 0;
    this.itemArr = [];
    this.comboItemArr = [];
    this.finalObj = {};
  }
}
