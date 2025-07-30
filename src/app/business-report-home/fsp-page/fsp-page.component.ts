import { Component, OnInit } from '@angular/core';
import { AppMainService } from '../../app.mainService';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-fsp-page',
  templateUrl: './fsp-page.component.html',
  styleUrls: ['./fsp-page.component.css']
})
export class FSPPageComponent implements OnInit {
  Otype:any;
  Oby:any;
  
  FSPTableStatus: boolean;
  itemCode: string[];
  tempFSPArray: any;
  customDateBody: { 'fromDt': string; 'toDt': string, 'limit': number };
  arrayForUI = [{}];
  loading: boolean;
  noTransactions: boolean;
  dateExceeds: boolean;
  dateStatus: boolean;
  transactions: any;
  ProductArray: any;
  csvData: any;
  noTransactionsMsg: boolean;
  dateError: boolean;
  FSPArray: any;
  today = new Date().toJSON().split('T')[0];
  constructor(private router: Router,private appService: AppMainService) {
    this.FSPTableStatus = false;

    this.csvData = [{}];
    this.dateExceeds = false;
    this.noTransactions = false;
    this.loading = false;
    this.tempFSPArray = [{}];
    this.FSPArray = [{}]
    this.appService.currentPageHeading = "Fastest Selling Products";
    this.FSPArray.pop();

  }

  ngOnInit() {
    this.noTransactions = false;

  }

  ngDoCheck() {
    this.tempFSPArray = this.appService.getFastProducts();
    if (this.tempFSPArray != undefined) {

      this.refiningValues();
    }
    else {
     
      this.FSPTableStatus = false;
    }
  }

  startDateValidation(start, end) {
    this.FSPTableStatus = false;
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
    this.FSPTableStatus = false;
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
    this.loading = true;
    this.FSPTableStatus = false;
    var startDate = new Date(start.value);
    var endDate = new Date(end.value);
    this.tempFSPArray = [{}];
    // var yesterday = new Date();
    console.log("startDate" + startDate);
    var frm = startDate.toISOString();
    var to = endDate.toISOString();
    this.customDateBody = { 'fromDt': frm, 'toDt': to, 'limit': 5 };
    console.log(this.customDateBody);
    this.appService.getFSPDetails(this.customDateBody);
  }
  refiningValues() {
    this.loading = false;

    for (let i = 0; i < this.tempFSPArray.length; i++) {

      this.itemCode = Object.keys(this.tempFSPArray[i]);
      var tempArray = this.tempFSPArray[i];
      this.FSPArray.push(tempArray[this.itemCode[0]]);
      this.arrayForUI[i] = {
        "itemCode": this.itemCode[0],
        "qty": this.FSPArray[i].qty,
        "inr": this.FSPArray[i].amount
      }

      this.FSPTableStatus = true;
    }


  }

  backToBRHome(){
    this.router.navigate(['/BuisnessReportHome']);
  }
}
