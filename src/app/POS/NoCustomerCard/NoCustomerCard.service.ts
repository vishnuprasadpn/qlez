import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class NoCustomerCardService {

	constructor(private appService: AppMainService) {}

	searchCustomer(contact,passcode){
		this.appService.searchCustomer(contact,passcode);
	}

	getCustomerdt(){
		return this.appService.billItems;
	}

	setGuestDt(contact,dob){
		this.appService.setGuestDetails(contact,dob);
	}

	setCustomerSessionID(sessionID){
		this.appService.customerSessionID = sessionID;
	}


	clearAllSaleData(){
		//this.appService.clearAllCurrentSaleData();
	}

	cancelPurchase(){
		this.appService.cancelPurchase();
	}

	getCustomerType(){
		return this.appService.CustomerType;
	}

}