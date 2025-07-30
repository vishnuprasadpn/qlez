import { Component, OnInit } from '@angular/core';
import { AppMainService } from '../../app.mainService';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-customer-bday',
  templateUrl: './customer-bday.component.html',
  styleUrls: ['./customer-bday.component.css']
})
export class CustomerBDayComponent implements OnInit {
  loading:boolean;
  constructor( private router: Router,private appService: AppMainService) {
    this.appService.currentPageHeading = "Birthday greetings";
 }

  ngOnInit() {
  }
  backToBRHome(){
    this.router.navigate(['/BuisnessReportHome']);
  } 
}
