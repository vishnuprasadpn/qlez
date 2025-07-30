import {Injectable} from "@angular/core";
import { AppMainService } from '../../../app.mainService';

@Injectable()
export class CustomerTransactionsService {

	constructor(private appService: AppMainService) {}

	getCustomerTransactionsValues(){
		return this.appService.customerTransactions;
	}

	addToDefectTable(product,returnAmount,transaction){
		this.appService.saveDefectiveProduct(product,returnAmount,transaction);
	}

	getDefectiveProductSaveStatus(){
		return this.appService.defectiveProductSaveStatus;
	}

	updateLocalTranasctionData(transactions){
		this.appService.customerTransactions.transactionList = transactions;
	}
}