import { Component, OnInit } from '@angular/core';
import { AppMainService } from '../../../app.mainService';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-weekly-report',
  templateUrl: './weekly-report.component.html',
  styleUrls: ['./weekly-report.component.css']
})
export class WeeklyReportComponent implements OnInit {
  Otype:any;
  Oby:any;

  weeklyDateBody: { 'fromDt': string; 'toDt': string; };
  csvDataWeekly: {}[];

  noTransactions: boolean;
  tableStatus: boolean;
 weeklyLoading: boolean;
  weeklyProductArray: any;
  dateError: boolean;
  tempTransactionArray: any;
  weeklytransactionArray: any;
  today = new Date().toJSON().split('T')[0];
  dateArray = new Array();

  constructor(private appService: AppMainService,private router: Router) {
    console.log(this.today);
    this.weeklyLoading= true;
    this.tableStatus = false;
    this.weeklytransactionArray = [{}];
    this.csvDataWeekly = [{}];
    this.tempTransactionArray = [{}];
    this.tempTransactionArray.pop();
    this.weeklytransactionArray.pop();
    
  }

  ngOnInit() {
    this.tempTransactionArray =  this.appService.monthlyTransactionsdt;
    console.log("weekly transaction");
    console.log(this.tempTransactionArray.length);
   
    var today = new Date();
    var tomorrow = new Date();
    var yesterday = new Date();
    tomorrow.setDate(today.getDate());
    yesterday.setDate(today.getDate() - 6);
    var start = tomorrow.toISOString();
    var end = yesterday.toISOString();
    var dateArray = new Array();
    while (yesterday <= tomorrow) {
      dateArray.push(yesterday.toISOString());
      yesterday.setDate(yesterday.getDate() + 1);
    }
    
    for (let i = 0; i < dateArray.length; i++) {

      var date = (dateArray[i].split("T")[0]);
      for (let j = 0; j < this.tempTransactionArray.length; j++) {

        var timeStamp = this.tempTransactionArray[j].trxn_timeStamp.split("T")[0];
        console.log("timeStamp ="+this.tempTransactionArray[j].trxn_time_stamp);
        if (date == timeStamp) {
          console.log(this.weeklytransactionArray[0]);

          this.weeklytransactionArray.push(this.tempTransactionArray[j]);


        }
      }
    }
    setTimeout(() => {
      this.weeklyLoading= false;
      this.tableStatus = true;

      if (this.weeklytransactionArray.length == 0) {
        this.weeklyLoading= true;
        this.tableStatus = false;

      }
    }, 5000);

  }
  ngDoCheck() {
  }
  productDetails(itemIdx) {
    console.log(itemIdx);

    this.weeklyProductArray = this.weeklytransactionArray[itemIdx].products_sold;
    console.log("productArray");
    console.log(this.weeklyProductArray);
    for (var i = 0; i < this.weeklyProductArray.length; i++) {
      var returnedStatus;
      if (this.weeklyProductArray[i].returned == undefined || this.weeklyProductArray[i].returned == null) {
        returnedStatus = false;
      }
      else {
        returnedStatus = this.weeklyProductArray[i].returned.bool;
      }
      this.weeklyProductArray[i] = {
        item_code: this.weeklyProductArray[i].item_code.s,
        sale: this.weeklyProductArray[i].sale.bool,
        item_color: this.weeklyProductArray[i].item_color.s,
        item_name: this.weeklyProductArray[i].item_name.s,
        item_size: this.weeklyProductArray[i].item_size.s,
        item_sp: this.weeklyProductArray[i].item_sp.s,
        quantity: this.weeklyProductArray[i].quantity.s,
        return_qty: this.weeklyProductArray[i].return_qty.s,
        timeStamp: this.weeklytransactionArray.timestamp,
        returned: returnedStatus,
      }
    }

    console.log(this.weeklyProductArray);
  }
  printCSV() {
    var options = {
      showTitle: true,
    };

    for (let i = 0; i < this.weeklytransactionArray.length; i++) {
      this.csvDataWeekly[i] = {
        " trxn_id": this.weeklytransactionArray[i].trxn_id,
        "customer_id": this.weeklytransactionArray[i].customer_id,
        "payment_id": this.weeklytransactionArray[i].payment_id,
        "timestamp": this.weeklytransactionArray[i].timestamp,
        "trxn_amount": this.weeklytransactionArray[i].trxn_amount
      }
    }
    console.log(this.csvDataWeekly);
    new Angular2Csv(this.csvDataWeekly, 'WeeklyTransactionReport', options);
  }
  backToBRHome(){
    this.router.navigate(['/BuisnessReportHome']);
  }

  showCountDetails(item,itemIdx){}
}
