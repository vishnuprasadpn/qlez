import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class CustomerBillService {

	constructor(private appService: AppMainService) {}

	printBill(msg){
		this.appService.printBill(msg);		
	}

	saveTransactions(){
		this.appService.saveTransactions();
	}
	
	getBillDetails(){
		return this.appService.billItems;
	}

	reCalculate(){
		return this.appService.recalculateBill();
	}

	getAllOffers(){
		return this.appService.allOffers;
	}

	saveTransactionDt(customer,guest,transaction,productIDs){
		this.appService.saveTransactionDt(customer,guest,transaction,productIDs);
	}

	getSaleUpdateStatus(){
		return this.appService.saleUpdationStatus;
	}

	getGuestDt(){
		return this.appService.guestDetails;
	}

	saveTransaction(transaction){
		this.appService.POSCustomerTransaction=transaction;
	}

	clearAllSaleData(){
		this.appService.cancelPurchase();
	}

	clearBillDt(){
		this.appService.flushExistingbill();
	}

	saleSuccessUpdate(){
		this.appService.saveTransactions();
	}

	setTotalDiscount(discount){
		this.appService.totalBillDiscount=discount;
	}

	setPaymentID(pid){
		this.appService.paymentID=pid;
	}

	sendLinkToCustomer(req){
		return this.appService.sendPaymentLinkToCustomer(req);
	}

	getPaymentStatus(){
		return this.appService.getPaymentStatus();
	}

	getLinkStatus(){
		return this.appService.paymentStatusDt;
	}

	activateEDC(transaction){
		this.appService.paymentThroughEDC(transaction);
	}

	getEDCpaymentStatus(){
		return this.appService.EDCpaymentStatus;
	}

	getResultOfLinkPayment(){
		return this.appService.paymentResultStatus;
	}
}