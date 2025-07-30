import { Component, OnInit } from '@angular/core';
import { AppMainService } from '../../../app.mainService';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {
  Otype:any;
  Oby:any;

  tempDailyTransactionArray: any;
  responce: any;
  DateBody: { 'fromDt': string; 'toDt': string; };
  csvDataDaily: {}[];
  loaderDivDaily: boolean;

  noTransactions: boolean;
  dailyTableStatus: boolean;

  dailyProductArray: any;
  dateError: boolean;
  dailyTransactionArray: any;
  today = new Date().toJSON().split('T')[0];
  dateArray = new Array();
  constructor(private appService: AppMainService,private router: Router) {
    console.log(this.today);
    this.loaderDivDaily = true;
    this.dailyTableStatus = false;
    this.csvDataDaily = [{}];
    this.dailyTransactionArray=[{}];
    this.tempDailyTransactionArray = this.appService.monthlyTransactionsdt;
    console.log("Daily");
    console.log(this.tempDailyTransactionArray);
    this.dailyTransactionArray.pop();
    
  }

  ngOnInit() {
    this.loaderDivDaily = true;
    var today = new Date();
    var tomorrow = new Date();
    var yesterday = new Date();
    tomorrow.setDate(today.getDate());
    yesterday.setDate(today.getDate() - 1);
    var start = tomorrow.toISOString();
    var end = yesterday.toISOString();
    var dateArray = new Array();
    while (yesterday <= tomorrow) {
      dateArray.push(yesterday.toISOString());
      yesterday.setDate(yesterday.getDate() + 1);
    }
    var tempTransactionArray;
    console.log("dateArray "+dateArray.length+" trsnarr "+this.tempDailyTransactionArray.length);
    for (let i = 0; i < dateArray.length; i++) {

      var date = (dateArray[i].split("T")[0]);
      for (let j = 0; j <this.tempDailyTransactionArray.length; j++) {
0
        var timeStamp = this.tempDailyTransactionArray[j].trxn_timeStamp.split("T")[0];
        if (date == timeStamp) {
          console.log(this.dailyTransactionArray[0]);
          
            this.dailyTransactionArray.push(this.tempDailyTransactionArray[j]);

          
        }
      }
    }
    setTimeout(() => {
      this.loaderDivDaily = false;
      this.dailyTableStatus = true;

      if (this.dailyTransactionArray.length == 0) {
        this.loaderDivDaily = true;
        this.dailyTableStatus = false;

      }
    }, 1000);

  }
  
  productDetails(itemIdx) {
    console.log(itemIdx);

    this.dailyProductArray = this.dailyTransactionArray [itemIdx].products_sold;
    console.log("productArray");
    console.log(this.dailyProductArray);
    for (var i = 0; i < this.dailyProductArray.length; i++) {
      var returnedStatus;
      if (this.dailyProductArray[i].returned == undefined || this.dailyProductArray[i].returned == null) {
        returnedStatus = false;
      }
      else {
        returnedStatus = this.dailyProductArray[i].returned.bool;
      }
      this.dailyProductArray[i] = {
        item_code: this.dailyProductArray[i].item_code.s,
        sale: this.dailyProductArray[i].sale.bool,
        item_color: this.dailyProductArray[i].item_color.s,
        item_name: this.dailyProductArray[i].item_name.s,
        item_size: this.dailyProductArray[i].item_size.s,
        item_sp: this.dailyProductArray[i].item_sp.s,
        quantity: this.dailyProductArray[i].quantity.s,
        return_qty: this.dailyProductArray[i].return_qty.s,
        timeStamp: this.dailyTransactionArray.timestamp,
        returned: returnedStatus,
      }
    }

    console.log(this.dailyProductArray);
  }
  printCSV() {
    var options = {
      showTitle: true,
    };

    for (let i = 0; i < this.dailyTransactionArray.length; i++) {
      this.csvDataDaily[i] = {
        " trxn_id": this.dailyTransactionArray[i].trxn_id,
        "customer_id": this.dailyTransactionArray[i].customer_id,
        "payment_id": this.dailyTransactionArray[i].payment_id,
        "timestamp": this.dailyTransactionArray[i].timestamp,
        "trxn_amount": this.dailyTransactionArray[i].trxn_amount
      }
    }
    console.log(this.csvDataDaily);
    new Angular2Csv(this.csvDataDaily, 'DailyTransactionReport', options);
  }
  backToBRHome(){
    this.router.navigate(['/BuisnessReportHome']);
  }

  showCountDetails(item,itemIdx){

  }
}
