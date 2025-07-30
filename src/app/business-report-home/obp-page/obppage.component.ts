import { Component } from '@angular/core';
import { AppMainService } from '../../app.mainService';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-obp-report',
  templateUrl: './obppage.component.html',
  styleUrls: ['./obppage.component.css']
})
export class OBPPageComponent {
  Otype:boolean;
  Oby:boolean;
  count:any;

  noTransactions:boolean;
  obpSearchForm:boolean;
  dataFetchError:boolean;
  searchStarted:boolean;
  startDateStatus:boolean;
  endDateStatus:boolean;
  keyStatus:boolean;
  missingFields:boolean;


  OBPTableStatus: boolean;
	obsoleteProducts:any;
	searchKey:string;
	noKeySelected:boolean;
	OBPArray:any;
  itemCode: string[];
  tempFSPArray: any;
  customDateBody: { 'fromDt': string; 'toDt': string, 'limit': number };
  arrayForUI = [{}];
  loading: boolean;
  //noTransactions: boolean;
  dateExceeds: boolean;
  dateStatus: boolean;
  dateError: boolean;
  FSPArray: any;
  today = new Date().toJSON().split('T')[0];
  
  constructor(private appService: AppMainService,private router: Router) {
    this.OBPTableStatus = this.noKeySelected =false;
    this.obpSearchForm = true;
    this.count = 0;
    this.OBPArray = [{}];
    this.dateExceeds = false;
   	this.loading = false;
    this.appService.currentPageHeading = "Most Obsolete Products";
    this.obsoleteProducts = [{}];
    this.obsoleteProducts.pop();
    this.OBPArray.pop();
  }

  ngOnInit() {
   
  }

  ngDoCheck() {
    if(this.searchStarted){
      console.log("count : "+this.count);
      this.count = this.count +1;
      this.obsoleteProducts = this.appService.getObsoleteProducts();
      if (this.obsoleteProducts != undefined && this.obsoleteProducts !=null) {
        this.dataFetchError = false;  
        this.refiningValues();
      }
      else {
        if(this.count>9){
          console.log("limit reached");
          this.loading = false;
          this.OBPTableStatus = false;
          this.dataFetchError = true;

          setTimeout(() => {
            this.dataFetchError = false
            this.obpSearchForm = true;
          }, 3000);
        }
        else{
          this.loading= true;
        }
      }
    }
  }
 backToBRHome(){
    this.router.navigate(['/BuisnessReportHome']);
  }

  startDateValidation(start, end) {
    this.OBPTableStatus = false;
    var startDate = new Date(start.value);
    var endDate = new Date(end.value);
    this.startDateStatus = false;
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if ((diffDays >= 530) || (diffDays == 0)) {
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
          this.startDateStatus = true;
          this.dateError = false;
        }
      }
    }
  }

  endDateValidation(start, end) {
   
    this.OBPTableStatus = this.endDateStatus = false;
    var startDate = new Date(start.value);
    var endDate = new Date(end.value);
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if ((diffDays >= 530) || (diffDays == 0)) {
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
          this.endDateStatus = true;
          this.dateError = false;
        }
      }
    }

  }

  selectKey(key){
  	this.searchKey = key.value;
  	this.noKeySelected=false;
    this.OBPTableStatus=false;
    this.keyStatus = true;
  }

  getOBPDetails(start, end, key) {
    if(this.startDateStatus && this.endDateStatus && this.keyStatus){
      this.obpSearchForm = this.OBPTableStatus = this.missingFields = false;
      this.loading = this.searchStarted = true;
      
      var startDate = new Date(start.value);
      var endDate = new Date(end.value);
      var frm = startDate.toISOString();
      var to = endDate.toISOString();
      this.customDateBody = { 'fromDt': frm, 'toDt': to, 'limit': 5 };
      if(key.value=="VALUE-BASED"){
        this.appService.getOBPDetailsbyValue(this.customDateBody);
      }
      else if(key.value=="QUANTITY-BASED"){
      this.appService.getOBPDetailsbyQuantity(this.customDateBody);
      }
      else{
        this.noKeySelected=true;
      }
    }
    else{
      this.missingFields = true;
    }
  }

  goTOForm(){
    console.log("go to form");
    this.obpSearchForm = true;

    this.searchStarted = this.OBPTableStatus = false;
  }

  refiningValues() {
    this.loading = false;
    if(this.obsoleteProducts.length >0){
      for (let i = 0; i < this.obsoleteProducts.length; i++) {
        var itemcode = Object.keys(this.obsoleteProducts[i]);
          var tempArray = this.obsoleteProducts[i];
          this.OBPArray.push(tempArray[itemcode[0]]);
          this.arrayForUI[i] = {
            "itemCode": itemcode[0],
            "qty": this.OBPArray[i].qty,
            "inr": this.OBPArray[i].value
          }
        this.OBPTableStatus = true;
      }
      this.noTransactions =  false;
    }
    else{
      this.noTransactions =  true;
      this.OBPTableStatus = this.obpSearchForm = false;
    }
  }
  

}
