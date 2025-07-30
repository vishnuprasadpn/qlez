import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CustomerBillService } from './CustomerBill.service';
import { Observable } from 'rxjs';

declare var Razorpay: any;
declare function payByRazor(): any;

@Component({
	selector: 'customer-bill',
	templateUrl: './CustomerBill.component.html',
	styleUrls: ['./CustomerBill.component.css']
})

export class CustomerBillComponent {
	subscription: any;
	timer: Observable<number>;
	logtimer:any;logsubscription:any;
	sendPaymentLink:boolean;paymentLinkSendWait:boolean;
	loadingProgress:boolean;connectionError:boolean;showBill:boolean;
	payurl:any;QRCodeTD:boolean;
	edcActivated:boolean;
	paymentDt:any;
	urlLinkStatus:boolean;

	recipientName:any;
	recipientEmail:any; 
	recipientAddress:any;
	recipientContact:any;
	

	recalculateConfirmDialog:boolean;customerContactErrorMessage:boolean;
	paymentSuccess:boolean;
	recalculateProgress:boolean;
	noItemsFound:boolean;
	purchaseCancelled:boolean;
	noItemFoundDisplay: boolean;
	isChecked:boolean;

	buttonStatus: boolean;
    loader:boolean;
	billDate: any; billNumber: any; paymentID: any; customerName: any; customerContact: any;
	customerImage: any; billItems: any; customer: any; totalBillAmount: any; totRewardPoints: any;
	initialBillAmount: any; usedRewardPoints: any; usedQlezCashCoin: any; balanceRewardPoints: any;
	generalOfferDiscount: any; cName: any; lName: any; balanceCashDeposit: any; checkBoxValues: any;
	giftWrapCount: any; wrapperCost: any; carryBagCount: any; carryBagCost: any; offers: any;
	paymentMethodOverlayStatus: boolean; checked: any; savedBillAmount: any; transaction: any;
	productIDs: any; guestDt: any; allOffers: any; rez: any; paymentStatus: any; testData: any;
	  appliedCoin: any;  generalOfferStatus: any;
	
	constructor(private router: Router, private customerBillService: CustomerBillService) {
		this.noItemFoundDisplay = true;
		this.recalculateConfirmDialog=this.paymentSuccess=this.purchaseCancelled=this.recalculateProgress=this.noItemsFound=false;
		this.paymentStatus = null;
		this.initiateVariables();
		this.appliedCoin = this.buttonStatus = this.sendPaymentLink = false;
		this.payurl = "Payment Url";
	}

	initiateVariables() {
		this.checked = this.paymentMethodOverlayStatus = false;
		this.generalOfferStatus = true;
		this.checkBoxValues = [0];
		this.checkBoxValues.pop();
		this.giftWrapCount = this.wrapperCost = this.usedQlezCashCoin = this.carryBagCost = 0;
		this.carryBagCount = 1;
		this.offers = [{ comments: null, description: null, offer_code: null, offer_expiry: null, offer_type: null }];
		this.offers.pop();

		if (this.customerBillService.getAllOffers() != undefined) {
			this.allOffers = this.customerBillService.getAllOffers().offer;
			for (var o = 0; o < this.allOffers.length; o++) {
				if (this.allOffers[o].offer_type == "General Offers" || this.allOffers[o].offer_type == "General- Purchase Specific") {
					this.offers.push(this.allOffers[o]);
				}
			}
		}

		this.productIDs = [""];
		this.productIDs.pop();
		this.guestDt = this.customerBillService.getGuestDt();
		this.load();
	}

	ngAfterViewInit() {
		if (this.guestDt != undefined) {
			document.getElementById("UseQlezCoinDiv").style.display = "none";
		}
		if (this.totalBillAmount == 0) {
			document.getElementById("UseQlezCoinDiv").style.pointerEvents = "none";
		}
		else {
			document.getElementById("UseQlezCoinDiv").style.pointerEvents = "block";
		}
	}

	ngDoCheck() {
		console.log("ngDoCheck");	
		this.giftWrapCount = this.checkBoxValues.length;
		if(this.edcActivated){
			var status = this.customerBillService.getEDCpaymentStatus();
			if(status){
				this.edcActivated = false;
				
				this.finishPaymentProcess()
			}
		}

		if(this.urlLinkStatus){
			var linkData = this.customerBillService.getLinkStatus();
			console.log("link data");
			console.log(linkData);
			if(linkData !=null && linkData !=undefined){
				this.QRCodeTD = true;
				this.payurl = linkData["short_url"];
				this.urlLinkStatus = false;
				this.loadingProgress = false;
				this.paymentLinkSendWait = true;
			}
			else{
				this.QRCodeTD = false;
			}
		}
	}

	finishPaymentProcess(){
		console.log("payment successful");
		this.customerBillService.printBill("payment_completed");
		this.customerBillService.saveTransactionDt(this.customer, this.guestDt, this.transaction, this.productIDs);
		this.customerBillService.saveTransactions();
		
		//this.transaction["payment_id"] = paymentID;			
		this.paymentSuccess = true;
		setTimeout(() => {
			this.customerBillService.clearBillDt();
			this.router.navigate(['/POSWelcome']);
		}, 5000);
	}

	reCalculateBill() {
		this.recalculateConfirmDialog=true;
		this.paymentSuccess=this.purchaseCancelled=this.recalculateProgress=this.noItemsFound=false;
	}

	confirmRecalculate() {
		this.recalculateConfirmDialog=this.paymentSuccess=this.purchaseCancelled=this.noItemsFound=false;
		this.recalculateProgress=true;
		
		var recalcStartST = this.customerBillService.reCalculate();
		if(recalcStartST == true){
			setTimeout(() => {
				this.recalculateProgress=false;
				this.initiateVariables();
			}, 3000);
		}
		else{
			this.recalculateProgress = false;
			this.connectionError = true;
			setTimeout(() => {
				this.router.navigate(['/POSWelcome']);
			}, 3000);
		}
	}

	cancelRecalculate(){
		this.recalculateConfirmDialog=this.paymentSuccess=this.purchaseCancelled=this.recalculateProgress=this.noItemsFound=false;
	}

	cancelPurchase() {
		this.purchaseCancelled=true;
		this.recalculateConfirmDialog=this.paymentSuccess=this.recalculateProgress=this.noItemsFound=false;
		this.customerBillService.clearAllSaleData();
		setTimeout(() => {
			this.purchaseCancelled=false;
			this.router.navigate(['/POSWelcome']);
		}, 3000);
	}

	addWrapper(checkbox) {

		var cValue = checkbox.id;
	
		var size = this.checkBoxValues.length;
		if (size != 0) {
			var status = false;
			var location;
			for (var i = 0; i < size; i++) {
				if (this.checkBoxValues[i] == cValue) {
					status = true;
					location = i;
				}
			}
			if (status == false) {
				this.checkBoxValues.push(cValue);
				this.wrapperCost = this.wrapperCost + 25;
				if (this.appliedCoin == false) {
					this.totalBillAmount = parseFloat(this.savedBillAmount) + this.carryBagCost + this.wrapperCost;
				}
				else {
					if (this.balanceCashDeposit > 25) {
						this.balanceCashDeposit = parseFloat(this.balanceCashDeposit) - 25;
						this.usedQlezCashCoin = parseFloat(this.usedQlezCashCoin) + this.wrapperCost + this.carryBagCost;
					}
					else {
						this.totalBillAmount = this.totalBillAmount + 25;
					}
				}
			}
			else {
			
				for (var i = 0; i < this.checkBoxValues.length; i++) {
					if (this.checkBoxValues[i] == cValue) {
						for (var k = i ; k < this.checkBoxValues.length; k++) {
							this.checkBoxValues[k]=this.checkBoxValues[k+1];
						}
						this.checkBoxValues.pop();
					}

				}
				this.wrapperCost = this.wrapperCost - 25;

				if (this.appliedCoin == false) {
					this.totalBillAmount = parseFloat(this.savedBillAmount) + this.carryBagCost + this.wrapperCost;
				}
				else {
					if (this.balanceCashDeposit > 25) {
						this.balanceCashDeposit = parseFloat(this.balanceCashDeposit) + 25;
						this.usedQlezCashCoin = parseFloat(this.usedQlezCashCoin) - 25 + this.carryBagCost;
					}
					else {
						this.totalBillAmount = this.totalBillAmount - 25;
					}
				}
			}
		}
		else {
			this.checkBoxValues[0] = cValue;
			this.wrapperCost = this.wrapperCost + 25;
			if (this.appliedCoin == false) {
				this.totalBillAmount = parseFloat(this.savedBillAmount) + this.carryBagCost + this.wrapperCost;
			}
			else {
				if (this.balanceCashDeposit > 25) {
					this.balanceCashDeposit = this.balanceCashDeposit - 25;
					this.usedQlezCashCoin = parseFloat(this.usedQlezCashCoin) + this.wrapperCost + this.carryBagCost;
				}
				else {
					this.totalBillAmount = this.totalBillAmount + 25;
				}
			}
		}
	}

	addCarryBag() {
		this.carryBagCount = this.carryBagCount + 1;
		this.carryBagCost = this.carryBagCost + 25;

		if (this.appliedCoin == false) {
			this.totalBillAmount = parseFloat(this.savedBillAmount) + this.carryBagCost + this.wrapperCost;
		}
		else {
			if (this.balanceCashDeposit > 25) {
				this.balanceCashDeposit = this.balanceCashDeposit - 25;
				this.usedQlezCashCoin = parseFloat(this.usedQlezCashCoin) + this.wrapperCost + this.carryBagCost;
			}
			else {
				this.totalBillAmount = this.totalBillAmount + 25;
			}
		}
	}

	removeCarryBag() {
		if (this.carryBagCount != 1) {

			this.carryBagCount = this.carryBagCount - 1;
			this.carryBagCost = this.carryBagCost - 25;

			if (this.appliedCoin == false) {
				this.totalBillAmount = parseFloat(this.savedBillAmount) + this.carryBagCost + this.wrapperCost;
			}
			else {
				if (this.balanceCashDeposit > 25) {
					this.balanceCashDeposit = this.balanceCashDeposit + 25;
					this.usedQlezCashCoin = parseFloat(this.usedQlezCashCoin) + this.wrapperCost - 25;
				}
				else {
					this.totalBillAmount = this.totalBillAmount - 25;
				}
			}
		}
	}

	validateContact(customerContact){
		var contactN = parseInt(customerContact.value);
		if (contactN < 9999999999 && contactN.toString() != "" && contactN > 1000000000) {
			customerContact.style.border = "none";
			this.customerContactErrorMessage = false;
			this.guestDt["mobile"] = customerContact.value;
		}
		else {
			customerContact.style.border = "3px solid red";
			this.customerContactErrorMessage = true;
		}
	}

	buildTransaction() {
		var products = [{ item_code: null, item_color: null, item_name: null, item_size: null, item_sp: null, quantity: null, return_qty: null, returned: false, sale: true }];
		products.pop();
		for (var p = 0; p < this.billItems.length; p++) {
			var product = {
				item_code: this.billItems[p].itemCode.toString(),
				item_color: this.billItems[p].itemColor.toString(),
				item_name: this.billItems[p].itemName.toString(),
				item_size: this.billItems[p].itemSize.toString(),
				item_mrp: this.billItems[p].itemMRP.toString(),
				item_tax: this.billItems[p].itemTax.toString(),
				item_sp: this.billItems[p].itemSP.toString(),
				quantity: this.billItems[p].quantity.toString(),
				tot_amount: this.billItems[p].totAmount.toString(),
				return_qty: "0", returned: null, sale: null
			};
			console.log("product "+p);
			console.log(product)
			products.push(product);
			this.productIDs.push(this.billItems[p].pid);
		}
		var rwdEarned = Math.round(this.savedBillAmount * 0.01);
		var cid;

		if (this.cName == "Guest") {
			cid = this.guestDt.guest_id;
		}
		else {
			cid = this.customer.cId;
		}
		if (this.usedRewardPoints == null) {
			this.usedRewardPoints = 0;
		}
		this.transaction = {
			trxn_id: this.billNumber.toString(),
			customer_id: cid,
			payment_id: this.paymentID.toString(),
			timestamp: this.billDate.toString(),
			trxn_amount: (Math.round(this.totalBillAmount)).toString(),
			rwpts_bal: (Math.round(this.balanceRewardPoints)).toString(),
			rwpts_earned: rwdEarned.toString(),
			rwpts_redeem: this.usedRewardPoints.toString(),
			products_sold: products
		}
		this.customerBillService.saveTransaction(this.transaction);
	}

	applyQlezCashCoin(status) {
		if (status.checked == false) {
			this.checked = true;
			this.appliedCoin = true;
			this.usedQlezCashCoin = this.balanceCashDeposit;
			var balQ = parseFloat(this.balanceCashDeposit);
			var totB = parseFloat(this.totalBillAmount);
			if (balQ <= totB) {
				this.totalBillAmount = (parseFloat(this.totalBillAmount) - parseFloat(this.balanceCashDeposit)).toFixed(2);
				this.balanceCashDeposit = 0;
			}
			else {
				this.balanceCashDeposit = (parseFloat(this.balanceCashDeposit) - parseFloat(this.totalBillAmount)).toFixed(2);
				this.usedQlezCashCoin = this.totalBillAmount;
				this.totalBillAmount = 0;
			}
		}
		else {
			this.checked = this.appliedCoin = false;
			this.usedQlezCashCoin = 0;
			this.totalBillAmount = parseFloat(this.savedBillAmount) + this.carryBagCost + this.wrapperCost;

			if (this.guestDt == undefined) {
				this.balanceCashDeposit = this.customer.depositCoins;
			}
			else {
				this.balanceCashDeposit = 0;
			}
		}
	}

	load() {
		this.billDate = new Date().toLocaleString();
		this.billNumber = "QB" + new Date().valueOf();
		this.paymentID = "PAY" + new Date().valueOf();
		this.totalBillAmount = 0;
		if (this.customerBillService.getBillDetails() != null) {
			this.billItems = this.customerBillService.getBillDetails().items;
			this.customer = this.customerBillService.getBillDetails().customerDt;
		}
		if (this.billItems != null) {
			console.log("bill lite");
			console.log("++++++++++++++++++++++++++++++++");
			console.log(this.billItems);

			this.recalculateConfirmDialog=this.paymentSuccess=this.purchaseCancelled=this.recalculateProgress=this.noItemsFound=false;
		
			for (var a = 0; a < this.billItems.length; a++) {
				this.billItems[a].totAmount = parseFloat(this.billItems[a].totAmount).toFixed(2);
				this.totalBillAmount = parseFloat(this.totalBillAmount) + parseFloat(this.billItems[a].totAmount);
			}

			this.totalBillAmount = parseFloat(this.totalBillAmount).toFixed(2);

			this.initialBillAmount = this.savedBillAmount = parseFloat(this.totalBillAmount).toFixed(2);

			var applyPSOffer = false;
			this.generalOfferDiscount = 0;

			if (this.offers != undefined) {
				this.generalOfferStatus = true;
				for (var o = 0; o < this.offers.length; o++) {
					if (applyPSOffer == false) {
						var offerCode = this.offers[o].offer_code;
						if (offerCode.slice(1, 4) == "PSO") {
							var endofMinAmount = offerCode.indexOf("D");
							var minAmountRequired = parseInt(offerCode.slice(4, endofMinAmount));
							if (minAmountRequired < this.totalBillAmount) {
								var discountpercent = parseInt(offerCode.slice(endofMinAmount + 1, endofMinAmount + 3));
								var discountAmount = (this.totalBillAmount * discountpercent) / 100;
								this.generalOfferDiscount = discountAmount;
								this.generalOfferDiscount = parseFloat(this.generalOfferDiscount).toFixed(2);
								this.savedBillAmount = this.totalBillAmount = parseFloat(this.totalBillAmount) - discountAmount;
								this.savedBillAmount = parseFloat(this.savedBillAmount).toFixed(2);
								this.totalBillAmount = parseFloat(this.totalBillAmount).toFixed(2);
								applyPSOffer = true;
							}
						}
					}
				}
			}
			else {
				this.generalOfferStatus = false;
			}

			this.balanceRewardPoints = 0;

			if (this.customer != null) {
				this.cName = this.customer.fName;
				this.lName = this.customer.lName;
				this.customerName = this.cName + " " + this.lName;
				if (this.customer.imageUrl == "No Image Link Provided") {
					this.customerImage = "https://www.shareicon.net/download/2016/10/25/847810_man_512x512.png";
				} else {
					this.customerImage = this.customer.imageUrl;
				}
				this.customerContact = this.customer.phone;
				this.balanceCashDeposit = parseFloat(this.customer.depositCoins).toFixed(2);
				if (this.customer.rewardPoints != null || this.customer.rewardPoints != 0) {
					this.totRewardPoints = this.customer.rewardPoints;
					if (this.totRewardPoints > this.totalBillAmount) {
						this.balanceRewardPoints = this.customer.rewardPoints = (parseFloat(this.totRewardPoints) - parseFloat(this.totalBillAmount)).toFixed(2);
						this.usedRewardPoints = this.totalBillAmount;
						this.totalBillAmount = 0;
					}
					else {
						this.totalBillAmount = (parseFloat(this.totalBillAmount) - parseFloat(this.totRewardPoints)).toFixed(2);
						this.usedRewardPoints = this.totRewardPoints;
					}
				}
				else {
					this.usedRewardPoints = 0;
				}
			}
			else {
				this.balanceCashDeposit = 0;
				this.usedRewardPoints = 0;
				this.customerName = this.guestDt["guest_id"];
				this.customerContact = this.guestDt["mobile"];
				this.cName = "Guest";
				this.lName = "";
				this.customerImage = "https://www.shareicon.net/download/2016/10/25/847810_man_512x512.png";
			}
		}
		else {
			this.recalculateConfirmDialog=this.paymentSuccess=this.purchaseCancelled=this.recalculateProgress=false;
			this.noItemsFound=true;
			this.initialBillAmount=0;		
		}
	}

	sendPaymentLinkToCustomer(){
		this.sendPaymentLink = true;
		this.confirmPurchaseMethod();
	}

	systemPayment(){
		this.sendPaymentLink = false;
		this.confirmPurchaseMethod();
	}

	confirmPurchaseMethod() {
		if (this.cName != "Guest") {
			this.customer.depositCoins = this.balanceCashDeposit.toString();
			this.customer.rewardPoints = this.balanceRewardPoints;
		}

		this.buildTransaction();

		if (this.totalBillAmount > 0) {
			if (this.cName == "Guest") {
				this.guestDt.timestamp = this.transaction.timestamp;
			}
			this.payOnline();
		}
		else if (this.totalBillAmount == 0) {
			if (this.cName == "Guest") {
				this.guestDt.timestamp = new Date().toLocaleString();
			}
			this.customerBillService.saveTransactionDt(this.customer, this.guestDt, this.transaction, this.productIDs);
			setTimeout(() => {
				this.paymentSuccess=true;
				this.customerBillService.saveTransactions();
				this.customerBillService.printBill("payment_completed");
			}, 1000);
		}
		var totDiscount;
		totDiscount = parseFloat(this.generalOfferDiscount + this.usedRewardPoints).toFixed(2);
		this.customerBillService.setTotalDiscount(totDiscount);
	}

	payOnline() {
		
		if (this.customer == null) {
			this.recipientName = "Guest";
			this.recipientEmail = "pirevolutions@gmail.com";
			this.recipientAddress = null;
			this.recipientContact = this.guestDt["mobile"];
		}
		else {
			this.recipientName = this.customer.fName;
			this.recipientEmail = this.customer.email;
			this.recipientAddress = this.customer.cAddress;
			this.recipientContact = this.customer.phone;
		}
		
		this.loadingProgress = true;
		if(this.sendPaymentLink){
			var request = {
				"name": this.recipientName,
				"email": this.recipientEmail,
				"contact": this.recipientContact,
				"type": "link",
				"view_less": 1,
				"amount": this.totalBillAmount*100,
				"currency": "INR",
				"description": "Thank you for Shopping with us. Please complete the payment and Verify with our Happy to Serve Staff."
			  }
			this.customerBillService.sendLinkToCustomer(request);
			this.urlLinkStatus = true;
			// setTimeout(() => {
			// 	var status = this.customerBillService.getLinkStatus();
			// 	this.paymentLinkSendWait = true;	
			// 	this.loadingProgress = false;
			// 	if(status !=null && status !=undefined){
			// 		this.QRCodeTD = true;
			// 		this.payurl = status["short_url"];
			// 	}
			// 	else{
			// 		this.QRCodeTD = false;
			// 	}
			// }, 3000);
			
		}
		else{
			setTimeout(() => {
				this.loadingProgress = false;	
				this.edcActivated = true;
			}, 2000);
			this.customerBillService.activateEDC(this.transaction);
		}
	}

	confirmCompletedTransaction(){
		
		this.loadingProgress = true;
		this.customerBillService.getPaymentStatus();
		console.log("confirmation pressed");
		
		setTimeout(() => {
			this.paymentDt = this.customerBillService.getResultOfLinkPayment();
			console.log(this.paymentDt);
			this.loadingProgress = false;
			if(this.paymentDt != null && this.paymentDt !=undefined){
				console.log("payment response");
				console.log(this.paymentDt);
				if(this.paymentDt["status"]=="paid"){
					
					this.paymentLinkSendWait = false;
					this.finishPaymentProcess();
				}
			}
		}, 2000);
	}

	cancelTransaction(){
		this.paymentLinkSendWait = false;
	}

	cancelEDCPayment(){
		this.loadingProgress = this.edcActivated = false;
	}
}