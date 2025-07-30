import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppMainService } from '../../app.mainService';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-business-report-home',
  templateUrl: './business-report-home.component.html',
  styleUrls: ['./business-report-home.component.css']
})
export class BusinessReportHomeComponent implements OnInit {
  defaultSection:boolean;
  MOPStatus:boolean;
  CBStatus:boolean;
  TStatus:boolean;
  FSPStatus:boolean;
  MVCStatus:boolean;
  UIStatus:boolean;
  MFIStatus:boolean;

  constructor(public snackBar: MatSnackBar, private router: Router, private appService: AppMainService) {
    this.appService.currentPageHeading = "BUSINESS REPORT";
    this.appService.getMostFavProdDetails();
    this.defaultSection = true;
  }

  goToCustBD(){
    //this.defaultSection = false;
  }
 
  ngOnInit() {
    this.appService.getUnderStockDetails();
  }

  backToMenu(){
    this.defaultSection = true;
    this.TStatus = this.MVCStatus = this.UIStatus = this.MFIStatus = this.MOPStatus = false;
  }

  goToTransactionDetails() {
    this.TStatus =true;
    this.defaultSection = false;

  }
  goToFSP() {
    this.defaultSection = false;
  }
  goToMVC() {
    this.MVCStatus = true;
    this.defaultSection = false;

  }
  gotoUS() {
    this.UIStatus = true;
    this.defaultSection = false;
  }
  goToMFP() {
    this.MFIStatus =true;
    this.defaultSection = false;
  }
  
  goToMOP(){
      this.MOPStatus = true;
      this.defaultSection = false;
  }

  backToHome(){
    this.router.navigate(['/SMMHome']);
  }
}
