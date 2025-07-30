import { Component, OnInit } from '@angular/core';
import { AppMainService } from '../../app.mainService';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent {

  defaultSection:boolean;
  dailyTransaction:boolean;
  weeklyTransactions:boolean;
  monthlyTransactions:boolean;
  customDateTransactions:boolean;
  
  constructor(private appService:AppMainService,private router: Router) {
    this.appService.currentPageHeading="Transaction Report";
    this.defaultSection = true;
  }

  showTodayTransactions(){
    this.defaultSection = false;
    this.dailyTransaction = true;
  }

  showWeeklyTransactions(){
    this.defaultSection = false;
    this.weeklyTransactions = true;
  }

  showMonthlyTransactions(){
    this.defaultSection = false;
    this.monthlyTransactions = true;
  }

  customTransactions(){
    this.defaultSection = false;
    this.customDateTransactions = true;
  }

}
