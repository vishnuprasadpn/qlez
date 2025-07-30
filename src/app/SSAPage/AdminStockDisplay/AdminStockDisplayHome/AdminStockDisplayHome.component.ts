import { Component } from '@angular/core';

@Component({
  selector: 'admin-stock-display-home',
  templateUrl: './AdminStockDisplayHome.component.html',
  styleUrls: ['./AdminStockDisplayHome.component.css']
})
export class AdminStockDisplayHomeComponent {
  defaultSection:boolean;
  itemDisplay:boolean;
  productDisplay:boolean;

  constructor(){ this.defaultSection = true; }

  goTOProductDisplay(){ 
    this.defaultSection = this.itemDisplay = false;
    this.productDisplay = true;
  }

  goTOItemDisplay(){
    this.defaultSection = this.productDisplay = false;
    this.itemDisplay = true;
  }

}
