import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { SMMHomeService } from './SMMHome.service';

@Component({
  selector: 'SMM-Home',
  templateUrl: './SMMHome.component.html',
  styleUrls: ['./SMMHome.component.css'],
})

export class SMMHomeComponent {
	empData:any;
	empRole:any;
	noAccessMsg:any;

	constructor(public snackBar: MatSnackBar,private router: Router,private smmHomeService:SMMHomeService){
		this.smmHomeService.setCurrentPageHeading("Stock Management Mode");
		this.empData = this.smmHomeService.getEMPDetails();

		if(this.empData == undefined){
			this.router.navigate(['/QlezWelcome']);
		}
		else{
			this.empRole = this.empData["employee_Role"];
			this.smmHomeService.fetchMonthlyTransactionDt();
		}
	}

	goToSDHome(){
		this.smmHomeService.setCurrentPageHeading("Stock Display");
		this.router.navigate(['/SDPage']);
	}

	goToCSHome(){

		if(this.empRole == "Admin" || this.empRole == "Customer_service"){
			this.smmHomeService.setCurrentPageHeading("Customer Service");
			this.router.navigate(['/CSPage']);
		}
		else{
			this.noAccessMsg = true;
			setTimeout(() => {
				this.noAccessMsg = false;
			}, 2000);
		}
	}

	goToSSAHome(){
		if(this.empRole == "Admin"){
			this.smmHomeService.setCurrentPageHeading("Stock / Store Administration");
			this.router.navigate(['/SSAHome']);
		}
		else{
			this.noAccessMsg = true;
			setTimeout(() => {
				this.noAccessMsg = false;
			}, 2000);
		}
	}

	goToSAHome(){
		if(this.empRole == "Admin" || this.empRole == "Inventory"){
			this.smmHomeService.setCurrentPageHeading("Stock Addition");
			this.router.navigate(['/SAHome']);
		}
		else{
			this.noAccessMsg = true;
			setTimeout(() => {
				this.noAccessMsg = false;
			}, 2000);
		}
	}
	goToBRHome()
	{
		this.router.navigate(['/BuisnessReportHome']);
		if(this.empRole == "Admin" ){
			this.smmHomeService.setCurrentPageHeading("Stock Addition");
			this.router.navigate(['/BuisnessReportHome']);
		}
		else{
			this.noAccessMsg = true;
			setTimeout(() => {
				this.noAccessMsg = false;
			}, 2000);
		}
	}
	logout(){
		this.router.navigate(['/QlezWelcome']);
	}

}
