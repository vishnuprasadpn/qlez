import { Component, OnInit } from '@angular/core';
import { AppMainService } from '../../app.mainService';
@Component({
  selector: 'app-mvcpage',
  templateUrl: './mvcpage.component.html',
  styleUrls: ['./mvcpage.component.css']
})
export class MVCPageComponent implements OnInit {
  CustomerEmail: any;
  CustomerPhone: any;
  noTransactions:boolean;
  CustomerGender: boolean;
  custArrayForUI: any;
  customerDetails: [{}];
  custArray: any;
  MVCArray: any;
  mvcTableStatus: boolean;
  itemCode: string[];
  tempMVCArray: any;
  customDateBody: { 'fromDt': string; 'toDt': string, 'limit': number };
  arrayForUI = [{}];
  mvcLoading: boolean;

  CustomerfName:any;

  dateExceeds: boolean;
  dateStatus: boolean;
  dateError: boolean;
  today = new Date().toJSON().split('T')[0];
  constructor(private appService: AppMainService) {
    this.mvcTableStatus = false;
    this.dateExceeds = false;
    this.mvcLoading = false;
    this.appService.currentPageHeading = "Most Valuable Customers";
  }
  ngOnInit() {
  }

  backToBRHome(){}

  ngDoCheck() {
    this.tempMVCArray = this.appService.getMVCDt();
    if (this.tempMVCArray != undefined) {

      this.refiningValues();
    }
    else {

      this.mvcTableStatus = false;
    }
  }
  startDateValidation(start, end) {
    this.mvcTableStatus = false;
    var startDate = new Date(start.value);
    var endDate = new Date(end.value);
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(startDate + " " + endDate);
    if ((diffDays >= 30) || (diffDays == 0)) {
      this.dateExceeds = true;
    }
    else {
      this.dateExceeds = false;

      if (((start.value) != " ") || ((end.value) != " ")) {
        var startDate = new Date(start.value);
        var endDate = new Date(end.value);
        if (startDate > endDate) {
          this.dateError = true;
        }
        else {
          this.dateError = false;
        }
      }
    }
  }

  endDateValidation(start, end) {
    this.mvcTableStatus = false;
    var startDate = new Date(start.value);
    var endDate = new Date(end.value);
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(startDate + " " + endDate);
    if ((diffDays >= 30) || (diffDays == 0)) {
      this.dateExceeds = true;
    }
    else {
      this.dateExceeds = false;

      if (((start.value) != " ") || ((end.value) != " ")) {
        var startDate = new Date(start.value);
        var endDate = new Date(end.value);
        if (startDate > endDate) {
          this.dateError = true;
        }
        else {
          this.dateError = false;
        }
      }
    }

  }
  getFSPDetails(start, end) {
    this.mvcLoading = true;

    var startDate = new Date(start.value);
    var endDate = new Date(end.value);

    // console.log("startDate" + startDate);
    var frm = startDate.toISOString();
    var to = endDate.toISOString();
    this.customDateBody = { 'fromDt': frm, 'toDt': to, 'limit': 5 };
    // console.log(this.customDateBody);
    this.appService.geMVCDetails(this.customDateBody);
  }
  refiningValues() {
    this.mvcLoading = false;

    for (let i = 0; i < this.tempMVCArray.length; i++) {
      // console.log("refining");
      // console.log(this.tempMVCArray[i].cust);
      // this.itemCode = Object.keys(this.tempMVCArray[i]);
      this.custArray = this.tempMVCArray[i].cust;

      this.arrayForUI[i] = {
        "c_id": this.custArray.cId,
        "name": this.custArray.fName + " " + this.custArray.lName,
        "inr": this.tempMVCArray[i].totalSpend
      }

      this.mvcTableStatus = true;
    }


  }

  custDetails(itemIdx) {
    console.log(itemIdx);
    this.customerDetails = this.tempMVCArray[itemIdx].cust;
    console.log(this.customerDetails);
    this.CustomerfName = this.customerDetails["fName"];
    this.CustomerGender=this.customerDetails["gender"];
    this.CustomerPhone=this.customerDetails["phone"];
    this.CustomerEmail=this.customerDetails["email"];    

  }
}
