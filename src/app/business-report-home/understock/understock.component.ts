import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AppMainService } from '../../app.mainService';

@Component({
  selector: 'app-understock',
  templateUrl: './understock.component.html',
  styleUrls: ['./understock.component.css']
})

export class UnderstockComponent {
  loading:boolean;
  noResponseError:boolean;
  Otype:any;
  Oby:any;

  count:any;

  understockUI: any;
  individualArrayWithEachItemCode: void;
  arrayForFSUI: any;
  USArray: [{}];
  itemCode: string[];
  tempUSArray: any;
  itemArray:[{}];
  FSPTableStatus:boolean;
  
  constructor(private appService: AppMainService,private router: Router,) {
    this.FSPTableStatus;
    this.USArray=[{ "count":null,"item_code":null }];
    this.appService.currentPageHeading="Understock Report ";
    this.count = 0;
  }

  ngDoCheck() {
    this.tempUSArray = this.appService.getusDt();
    
    this.count = this.count +1;
    if(this.count>8){
      this.count = 0;
      this.checkData();
      if(this.tempUSArray == undefined){
        this.noResponseError = true;
      }
    }
    else{
      this.noResponseError = false;
      this.checkData();
    }
  }

  checkData(){
    if (this.tempUSArray != undefined) {
        this.loading = false;
        this.refiningValues();
    }
    else {
        this.FSPTableStatus=false;
        setTimeout(() => {
          this.loading = true;
        }, 1000);
    }
  }

  refiningValues(){
    this.FSPTableStatus=true;
    this.itemCode = Object.keys(this.tempUSArray);
    for (let i = 0; i < this.itemCode.length; i++) {

      this.individualArrayWithEachItemCode =this.tempUSArray[this.itemCode[i]];
      this.itemArray=this.individualArrayWithEachItemCode["item"];
       this.USArray[i]={
         "count":this.individualArrayWithEachItemCode["count"],
         "item_code":this.itemArray["item_code"]         
       }
     }
  }
  
  retry(){
    this.appService.getUnderStockDetails();
    this.count = 0;
    this.loading = true;
  }

  backToBRHome(){
    this.router.navigate(['/BuisnessReportHome']);
  }

}
