import { Component, OnInit } from '@angular/core';
import { AppMainService } from '../../../app.mainService';
import { RouterModule, Router } from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {
  Otype:any;
  Oby:any;

  MonthlyDateBody: { 'fromDt': string; 'toDt': string; };
  csvDataMonthly: {}[];
  noTransactions: boolean;
  monthlyTableStatus: boolean;
  monthlyLoading: boolean;
  monthlyProductArray: any;
  dateError: boolean;
  transactionArray: any;
  today = new Date().toJSON().split('T')[0];
  dateArray = new Array();
  constructor(private appService: AppMainService,private router: Router) {
    this.monthlyProductArray = [{}];
    this.monthlyTableStatus = false;
    this.noTransactions = false;
    this.monthlyLoading = false; 0
    this.transactionArray = [{ idx:null,customer_id: null, payment_id: null, products_sold: [], rwpts_bal: null, rwpts_earned: null, rwpts_redeem: null, rwpts_used: null, timestamp: null, trxn_amount: null, trxn_id: null, trxn_date: null }];
    this.appService.currentPageHeading = "Transaction Report";
    this.csvDataMonthly = [{}];
    console.log(this.today);
    this.monthlyLoading = true;
    while (this.transactionArray.length != 0) {
      this.transactionArray.pop();
    }
    this.monthlyTableStatus = false;
  }

  ngOnInit() {
    console.log("monthly transaction repo");
    console.log(this.appService.monthlyTransactionsdt);
    this.transactionArray = this.appService.monthlyTransactionsdt;
  }
  ngDoCheck() {

    setTimeout(() => {
      this.monthlyLoading = false;
      this.monthlyTableStatus = true;
      if (this.transactionArray.length == 0) {
        this.monthlyTableStatus = false;
        this.noTransactions = true;
      }
    }, 1000);
  }

  productDetails(itemIdx) {
    console.log(itemIdx);

    this.monthlyProductArray = this.transactionArray[itemIdx].products_sold;
    console.log("productArray");
    console.log(this.monthlyProductArray);
    for (var i = 0; i < this.monthlyProductArray.length; i++) {
      var returnedStatus;
      if (this.monthlyProductArray[i].returned == undefined || this.monthlyProductArray[i].returned == null) {
        returnedStatus = false;
      }
      else {
        returnedStatus = this.monthlyProductArray[i].returned.bool;
      }
      this.monthlyProductArray[i] = {
        idx:Number(itemIdx)+1,
        item_code: this.monthlyProductArray[i].item_code.s,
        sale: this.monthlyProductArray[i].sale.bool,
        item_color: this.monthlyProductArray[i].item_color.s,
        item_name: this.monthlyProductArray[i].item_name.s,
        item_size: this.monthlyProductArray[i].item_size.s,
        item_sp: this.monthlyProductArray[i].item_sp.s,
        quantity: this.monthlyProductArray[i].quantity.s,
        return_qty: this.monthlyProductArray[i].return_qty.s,
        timeStamp: this.transactionArray.timestamp,
        returned: returnedStatus,
      }
    }

    console.log(this.monthlyProductArray);
  }

  printCSV() {
    var options = {
      showTitle: true,
    };

    for (let i = 0; i < this.transactionArray.length; i++) {
      this.csvDataMonthly[i] = {
        " trxn_id": this.transactionArray[i].trxn_id,
        "customer_id": this.transactionArray[i].customer_id,
        "payment_id": this.transactionArray[i].payment_id,
        "timestamp": this.transactionArray[i].timestamp,
        "trxn_amount": this.transactionArray[i].trxn_amount
      }
    }
    console.log(this.csvDataMonthly);
    new Angular2Csv(this.csvDataMonthly, 'MonthlyTransactionReport', options);
  }
  backToBRHome(){
    this.router.navigate(['/BuisnessReportHome']);
  }

  showCountDetails(item,itemIdx){}
}
