import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class CustomerActionService {

	constructor(private appService: AppMainService) {}

	scanCustomerDt(){
		this.appService.scanCustomerDetails();
	}

	getCustomer(){
		return this.appService.customerDetails;
	}

	getCustomerByDetails(fName,dob,contact){
		this.appService.getCustomerByDetails(fName,dob,contact);
	}

	updateCustomer(customer){
		this.appService.updateCustomer(customer);
	}

	getCustomerTransactions(){
		this.appService.getCustomerTransactions();
	}

	getCustomerTransactionsValues(){
		return this.appService.customerTransactions;
	}

	checkCashUpdate(){
		return this.appService.returnCashUpdate;
	}

	getCustomerDepositBalance(){
		return this.appService.customerdepositBalance;
	}

	setCashUpdate(){
		this.appService.returnCashUpdate=false;
	}
}