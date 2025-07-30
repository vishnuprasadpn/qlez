import { Component, Input } from '@angular/core';
import { CustomerTransactionsService } from './CustomerTransaction.service';

@Component({
	selector: 'customer-transaction',
	templateUrl: './CustomerTransaction.component.html',
	styleUrls: ['./CustomerTransaction.component.css']
})

export class CustomerTransactionComponent {
	@Input() transactionList: any;

	transactionListDiv:boolean;transactionListInnDiv:boolean;noTransactionFoundMessage:boolean;
	loadingProgress:boolean;billView:boolean;returnProductView:boolean;itemSavedMessage:boolean;
	itemNotSavedMessage:boolean;connectionErrorMessage:boolean;

	amountErrorMessage:boolean;returnReasonErrorMessage:boolean;returnDecriptionErrorMessage:boolean;
	returnQuantityErrorMessage:boolean;billOverlayStatus: boolean;exchangeOverlayStatus: boolean;
	
	transactions: any;purchasedProducts: any;productName: any;returnDate: any;returnQuantity: any;
	returnDescription: any;product: any;returnReason: any;returnAmount: any;
	
	returnDescriptionStatus: any;returnQuantityStatus: any;returnAmountStatus: any;
	returnReasonStatus: any;selectedTransaction: any;

	constructor(private customerTransactionsService: CustomerTransactionsService) {
		
		this.connectionErrorMessage = this.transactionListDiv = this.noTransactionFoundMessage = this.loadingProgress = this.billView = this.returnProductView = this.itemSavedMessage = this.itemNotSavedMessage = false;
		this.amountErrorMessage = this.returnReasonErrorMessage = this.returnDecriptionErrorMessage = this.returnQuantityErrorMessage = false;

		this.transactionListInnDiv = true;
		this.billOverlayStatus = false;
		this.exchangeOverlayStatus = false;
		this.transactions = [{ customer_id: "null", payment_id: "null", products_sold: [], rwpts_bal: "null", rwpts_earned: "null", rwpts_redeem: "null", rwpts_used: "null", timestamp: "null", trxn_amount: "null", trxn_id: "null" }];
		this.purchasedProducts = [{ item_code: null, item_color: null, item_name: null, item_size: null, item_sp: null, quantity: null, return_qty: null }]
		this.purchasedProducts.pop();
		this.returnDescriptionStatus = false;
		this.returnQuantityStatus = false;
		this.returnReasonStatus = false;
		this.returnAmountStatus = false;
	}

	ngDoCheck() {
		var response = this.customerTransactionsService.getCustomerTransactionsValues();
		if (response != undefined) {
			if (response.success == false) {
				this.transactionListDiv = false;
				this.noTransactionFoundMessage=true;
			}
			else {
				this.transactionListDiv = true;
				this.noTransactionFoundMessage = false;
				this.transactions = response["transactionList"];
			}
		}
		else{
			this.connectionErrorMessage = true;
		}
	}

	viewBill(transaction) {

		this.billView = true;
		this.transactionListInnDiv = false;
		// if (this.billOverlayStatus == false) {
			
		// 	this.billView = true;
		// 	this.billOverlayStatus = true;
		// }
		// else {
		// 	this.billView = false;
		// 	this.billOverlayStatus = false;
		// }
		if (transaction != undefined) {
			for (var i = 0; i < transaction.products_sold.length; i++) {
				var returnedStatus;
				if (transaction.products_sold[i].returned == undefined || transaction.products_sold[i].returned == null) {
					returnedStatus = false;
				}
				else {
					returnedStatus = transaction.products_sold[i].returned.bool;
				}
				this.purchasedProducts[i] = {
					item_code: transaction.products_sold[i].item_code.s,
					sale: transaction.products_sold[i].sale.bool,
					item_color: transaction.products_sold[i].item_color.s,
					item_name: transaction.products_sold[i].item_name.s,
					item_size: transaction.products_sold[i].item_size.s,
					item_sp: transaction.products_sold[i].item_sp.s,
					quantity: transaction.products_sold[i].quantity.s,
					return_qty: transaction.products_sold[i].return_qty.s,
					timeStamp: transaction.timestamp,
					returned: returnedStatus,
				}
			}
		}
		this.selectedTransaction = transaction;
	}

	closeBill(){
		this.billView = false;
		this.transactionListInnDiv = true;
		this.selectedTransaction = null;
	}

	returnProduct(product) {
		this.returnProductView = true;
		// if (this.exchangeOverlayStatus == false) {
		// 	this.returnProductView = true;
		// 	this.exchangeOverlayStatus = true;
		// }
		// else {
		// 	this.returnProductView = false;
		// 	this.exchangeOverlayStatus = false;
		// }
		this.billView =  false;
		if (product != undefined) {
			this.productName = product.item_name;
			this.returnDate = new Date().toLocaleString();
			this.returnQuantity = product.return_qty;
		}
		this.product = product;
	}

	cancelReturn(){
		this.returnProductView = false;
		this.product = null;
		this.billView =true;
	}

	returnSingleProduct(returnAmount, reason, returnDescription, returnQuantity) {
		returnAmount.value = "";
		reason.value = "";
		returnDescription.value = "";
		returnQuantity = "";
		this.cancelReturn();
	}

	validateDecription(description) {
		if (description.value != "") {
			this.returnDescription = description.value;
			this.returnDescriptionStatus = true;
			this.returnDecriptionErrorMessage = false;
			if(this.returnAmountStatus==true && this.returnQuantityStatus==true && this.returnReasonStatus ==true){
				document.getElementById("saveReturn-option-tab").style.background="#0072BB";
				document.getElementById("saveReturn-option-tab").style.pointerEvents="auto";
			}
			else{
				document.getElementById("saveReturn-option-tab").style.background="grey";
				document.getElementById("saveReturn-option-tab").style.pointerEvents="none";				
			}
		}
		else {
			this.returnDescriptionStatus = false;
			this.returnDecriptionErrorMessage = true;
		}
	}

	validateReason(reason) {
		if (reason.value != "") {
			if (reason.value == "Select Type") {
				this.returnReasonErrorMessage = true;
			}
			else {

				this.returnReason = reason.value;
				this.returnReasonStatus = true;

				this.returnReasonErrorMessage = false;
				if(this.returnAmountStatus==true && this.returnQuantityStatus==true && this.returnDescriptionStatus == true){
					document.getElementById("saveReturn-option-tab").style.background="#0072BB";
					document.getElementById("saveReturn-option-tab").style.pointerEvents="auto";
				}
				else{
					document.getElementById("saveReturn-option-tab").style.background="grey";
					document.getElementById("saveReturn-option-tab").style.pointerEvents="none";				
				}
			}
		}
		else {
			this.returnReasonStatus = false;
			this.returnReasonErrorMessage = true;
		}
	}

	validateQuantity(quantity) {
		if (isNaN(quantity.value))
		{
			this.returnQuantityStatus = false;
			this.returnQuantityErrorMessage = true;
		}
		else {
			if (parseInt(quantity.value) <= this.product.quantity) {
				this.returnQuantity = quantity.value;
				this.returnQuantityStatus = true;
				
				this.returnQuantityErrorMessage = false;
			}
			else {
				this.returnQuantityStatus = false;
				
				this.returnQuantityErrorMessage = true;
			}
		}

	}

	validateAmount(amount) {
		if (isNaN(amount.value)) {
			this.returnAmountStatus = false;
			this.amountErrorMessage =true;
		
		}
		else {
				if (amount.value != "") {
				this.returnAmount = amount.value;
				// amount.value=(Number(amount.value)).toFixed(2);
				this.returnAmountStatus = true;
				this.amountErrorMessage = false;

			}

		}

	}

	saveReturnProduct(returnAmount, reason, returnDescription, returnQuantity) {
		var status = false;
		if (this.returnReasonStatus == true && this.returnQuantityStatus == true && this.returnDescriptionStatus == true) {
			this.loadingProgress = true;
			if (this.returnReason == "Defective") {
				status = true;
			}
			var defectiveProduct = {
				customer_ID: null,
				defect_comments: this.returnDescription,
				Defective: status,
				invoice_date: this.product.timeStamp,
				item_code: this.product.item_code,
				pid: "",
				product_color: this.product.item_color,
				product_size: this.product.item_size,
				return_date: this.returnDate,
				returnQuantity: this.returnQuantity
			}
			for (var p = 0; p < this.selectedTransaction["products_sold"].length; p++) {
				if (this.selectedTransaction["products_sold"][p].item_code.s == this.product.item_code) {
					this.selectedTransaction["products_sold"][p].return_qty.s = this.returnQuantity;
					this.selectedTransaction["products_sold"][p].returned.bool = true;
				}
			}
			this.customerTransactionsService.addToDefectTable(defectiveProduct, this.returnAmount, this.selectedTransaction);

			//Updating transaction locally
			this.customerTransactionsService.updateLocalTranasctionData(this.transactions);

			for (var i = 0; i < this.purchasedProducts.length; i++) {
				if (this.purchasedProducts[i]["item_code"] == this.product.item_code) {
					this.purchasedProducts[i]["return_qty"] = this.returnQuantity;
				}
			}

			setTimeout(() => {
				this.loadingProgress = false;
				var saveStatus = this.customerTransactionsService.getDefectiveProductSaveStatus();
				if (saveStatus == true) {
					this.itemSavedMessage = true;
					this.itemNotSavedMessage = false;
					setTimeout(() => {
						this.returnProductView = false;
						this.exchangeOverlayStatus = false;
					}, 2000);
					returnAmount.value = "";
					reason.value = "";
					returnDescription.value = "";
					returnQuantity.value = "";
					this.product = null;
					this.returnDescriptionStatus = false;
					this.returnQuantityStatus = false;
					this.returnReasonStatus = false;
					this.returnAmountStatus = false;
				}
				else {
					returnAmount.value = "";
					reason.value = "";
					returnDescription.value = "";
					returnQuantity.value = "";
					// this.product = null;
					this.returnDescriptionStatus = false;
					this.returnQuantityStatus = false;
					this.returnReasonStatus = false;
					this.returnAmountStatus = false;
					
					this.itemSavedMessage = false;
					this.itemNotSavedMessage =true;
				}
			}, 10000);

		}

		else {
			this.validateDecription(returnDescription);
			this.validateAmount(returnAmount);
			this.validateQuantity(returnQuantity);
			this.validateReason(reason);
		}
	}

}
