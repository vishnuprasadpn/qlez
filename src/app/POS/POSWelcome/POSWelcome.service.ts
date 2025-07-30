import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class POSWelcomeService {

	constructor(private appService: AppMainService) {}

	getBillDetails(customerType){
		this.appService.getBill(customerType);
	}

	getCustomerBill(){
		return this.appService.billItems;	
	}

	getAllOffers(){
		this.appService.getAllOffers();
	}

	reCalculateBill(){
		this.appService.recalculateBill();
	}

	cancelPurchase(){
		this.appService.cancelPurchase();
	}

	clearExistingData(){
		this.appService.flushExistingbill();
	}
}	