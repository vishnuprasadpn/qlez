import { Component, OnInit } from '@angular/core';
import { AppMainService } from '../../../app.mainService';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-custom-report',
  templateUrl: './custom-report.component.html',
  styleUrls: ['./custom-report.component.css']
})
export class CustomReportComponent implements OnInit {
  Otype:any;
  Oby:any;
  
  customDateBody: { 'fromDt': string; 'toDt': string,'limit':number };

  loading: boolean;
  noTransactions: boolean;
  dateExceeds: boolean;
  dateStatus: boolean;
  transactions: any;
  ProductArray: any;
  csvData: any;
  noTransactionsMsg: boolean;
  dateError: boolean;
  transactionSerachResult: any;
  transactionArray: any;
  today = new Date().toJSON().split('T')[0];
  tableStatus = false;
  constructor(private appService: AppMainService,private router: Router) {
    this.transactionSerachResult = [{}];
    this.ProductArray = [{}];
    this.csvData = [{}];
    this.dateExceeds = false;
    this.noTransactions = false;
    this.loading = false;
    this.transactionArray = [{ customer_id: null, payment_id: null, products_sold: [], rwpts_bal: null, rwpts_earned: null, rwpts_redeem: null, rwpts_used: null, timestamp: null, trxn_amount: null, trxn_id: null, trxn_date: null }];
    this.appService.currentPageHeading = "Transaction Report";
  }

  ngOnInit() {
  }

  ngDoCheck() {
    var response = this.appService.customTransactionsdt;
       this.transactionArray = response;
 
  }

  startDateValidation(start, end) {
    this.tableStatus = false;
    this.transactionSerachResult = [{}];
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
    this.tableStatus = false;
    this.transactionSerachResult = [{}];
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
  getTransactionDetails(start, end) {
    this.loading = true;
    var startDate = new Date(start.value);
    var endDate = new Date(end.value);
    // var yesterday = new Date();
   console.log("startDate"+startDate);
    var frm = startDate.toISOString();
    var to = endDate.toISOString();
    this.customDateBody = { 'fromDt':frm, 'toDt': to ,'limit':0};
    console.log(this.customDateBody);
    this.appService.getCustomTransactionDt(this.customDateBody);
    setTimeout(() => {
      // console.log(this.appService.customTransactionsdt);
      this.loading = false;
      this.tableStatus = true;
      if (this.transactionArray.length == 0) {
        this.tableStatus = false;
        this.noTransactions = true;
      }
    }, 7000);


    // console.log(this.transactionSerachResult);
  }

  // }

  //   }

  productDetails(itemIdx) {
    console.log(itemIdx);

    this.ProductArray = this.transactionArray[itemIdx].products_sold;
    console.log("productArray");
    console.log(this.ProductArray);
    for (var i = 0; i < this.ProductArray.length; i++) {
      var returnedStatus;
      if (this.ProductArray[i].returned == undefined || this.ProductArray[i].returned == null) {
        returnedStatus = false;
      }
      else {
        returnedStatus = this.ProductArray[i].returned.bool;
      }
      this.ProductArray[i] = {
        item_code: this.ProductArray[i].item_code.s,
        sale: this.ProductArray[i].sale.bool,
        item_color: this.ProductArray[i].item_color.s,
        item_name: this.ProductArray[i].item_name.s,
        item_size: this.ProductArray[i].item_size.s,
        item_sp: this.ProductArray[i].item_sp.s,
        quantity: this.ProductArray[i].quantity.s,
        return_qty: this.ProductArray[i].return_qty.s,
        timeStamp: this.transactionArray.timestamp,
        returned: returnedStatus,
      }
    }
    console.log("Custom transactions");
    console.log(this.ProductArray);
  }
  printCSV() {
    var options = {
      showTitle: true,
    };
    for (let i = 0; i < this.transactionArray.length; i++) {
      this.csvData[i] = {
        " trxn_id": this.transactionArray[i].trxn_id,
        "customer_id": this.transactionArray[i].customer_id,
        "payment_id": this.transactionArray[i].payment_id,
        "timestamp": this.transactionArray[i].timestamp,
        "trxn_amount": this.transactionArray[i].trxn_amount
      }
    }
    console.log(this.csvData);
    new Angular2Csv(this.csvData, 'Custom Transaction Report', options);
  }
  backToBRHome(){
    this.router.navigate(['/BuisnessReportHome']);
  }
}
