import { Component, Input } from '@angular/core';
import { OfferServices } from '../OfferServices.service';

@Component({
	selector: 'general-offers',
	templateUrl: './GeneralOffers.component.html',
	styleUrls: ['./GeneralOffers.component.css']
})
export class GeneralOffersComponent {
	defaultSection:boolean;
	purchaseSpecific:boolean;
	paymentSpecific:boolean;
	lastForm:any;


	purchaseRelatedStatus: boolean;
	paymentRelatedStatus: boolean;
	today = new Date().toJSON().split('T')[0];
	purchaseAmountStatus: boolean;
	purchaseRPointStatus: boolean;
	purchasePercentStatus: boolean;
	purchaseDescriptionStatus: boolean;
	purchaseCommentStatus: boolean;
	purchaseExpiryDateStatus: boolean;
	paymentAmountStatus: boolean;
	paymentPercentStatus: boolean;
	paymentRPointStatus: boolean;
	paymentExpiryDateStatus: boolean;
	paymentCommentStatus: boolean;
	paymentDescriptionStatus: boolean;
	paymentBankStatus: boolean;
	paymentMethodStatus: boolean;

	purchaseAmountValue: any;
	purchaseRPointValue: any;
	purchaseDiscountPercentValue: any;
	purchaseDescriptionValue: any;
	purchaseCommentValue: any;
	purchaseExpiryDateValue: any;

	paymentExpiryDateValue: any;
	paymentCommentValue: any;
	paymentAmountValue: any;
	paymentPercentValue: any;
	paymentDescriptionValue: any;
	paymentBankValue: any;
	paymentMethodValue: any;
	
	purchaseAmountErrorMessage: any;
	purchasePercentErrorMessage: any;
	loader: any;
	success: any;
	failed: any;
	paymentAmountErrorMessage: any;
	paymentPointErrorMessage: any;
	pointErrorMessage: any;
	paymentPercentErrorMessage: any;
	paymentDateErrorMessage: any;
	paymentCommentErrorMessage: any;
	paymentDescriptionErrorMessage: any;
	descriptionErrorMessage: any;
	bankErrorMessage: any;
	methodErrorMessage: any;
	commentErrorMessage: any;
	dateErrorMessage: any;
	@Input() OfferCode: any;
	constructor(private generalOfferService: OfferServices) {
		this.defaultSection = true;
		this.lastForm = null;
		this.purchaseRelatedStatus = false;
		
		this.paymentRelatedStatus = false;
		this.purchaseAmountStatus = false;
		this.purchaseRPointStatus = false;
		this.purchaseCommentStatus = false;
		this.purchaseDescriptionStatus = false;
		this.purchaseExpiryDateStatus = false;
		this.bankErrorMessage = false;
		this.methodErrorMessage = false;
		this.paymentAmountStatus = false;
		this.paymentPercentStatus = false;
		this.paymentBankStatus = false;
		this.paymentMethodStatus = false;
		this.paymentDescriptionStatus = false;
		this.paymentCommentStatus = false;
		this.paymentExpiryDateStatus = false;

		this.purchaseAmountErrorMessage = false;
		this.purchasePercentErrorMessage = false;
		this.pointErrorMessage = false;
		this.commentErrorMessage = false;
		this.descriptionErrorMessage = false;
		this.dateErrorMessage = false;
		this.loader = false;
		this.success = false;
		this.failed = false;

		this.paymentAmountErrorMessage = false;
		this.paymentPointErrorMessage = false;

		this.paymentPercentErrorMessage = false;
		this.paymentDateErrorMessage = false;
		this.paymentCommentErrorMessage = false;
		this.paymentDescriptionErrorMessage = false;



	}

	selectSpecificMode(mode) {

		if (mode.value == "Purchase") {
			this.paymentRelatedStatus = false;
			this.purchaseRelatedStatus = true;
		}
		else {
			this.paymentRelatedStatus = true;
			this.purchaseRelatedStatus = false;
		}
	}

	validatePurchaseAmount(amount) {
		var purchaseAmount = amount.value;
		if (purchaseAmount < 0 || purchaseAmount == "" || isNaN(purchaseAmount) ==true) {
			this.purchaseAmountErrorMessage = true;
			this.purchaseAmountStatus = false;
		}
		else {
			this.purchaseAmountErrorMessage = false;
			this.purchaseAmountValue = purchaseAmount;
			this.purchaseAmountStatus = true;

		}
	}

	validatePurchaseComment(comment) {
		if (comment.value == "") {
			this.commentErrorMessage = true;
		}
		else {
			this.commentErrorMessage = false;
			this.purchaseCommentStatus = true;
			this.purchaseCommentValue = comment.value;

		}
	}

	validatePurchaseDescription(descp) {
		if (descp.value == "") {
			this.descriptionErrorMessage = true;
		}
		else {
			this.descriptionErrorMessage = false;
			this.purchaseDescriptionStatus = true;
			this.purchaseDescriptionValue = descp.value;

		}
	}

	validatePurchasePercentage(percent) {
		var dpercent = percent.value;
		if (dpercent < 0 || dpercent == "" || dpercent > 98 || isNaN(dpercent) == true) {
			this.purchasePercentErrorMessage = true;
			this.purchasePercentStatus = false;
		}
		else {
			this.purchasePercentErrorMessage = false;
			this.purchaseDiscountPercentValue = dpercent;
			this.purchasePercentStatus = true;

		}
	}

	validatePurchasePoint(point) {
		this.pointErrorMessage = true;
		var rPoint = point.value;
		console.log("purchasepoint");
		console.log(point);
		console.log(point.value);
		if (isNaN(point.value) == false) {
			console.log("jhvjhv");
			console.log(rPoint);
			if (rPoint < 0 || point.value == "") {
				this.pointErrorMessage = true;
				this.purchaseRPointStatus = false;
			}
			else {
				this.pointErrorMessage = false;
				this.purchaseRPointValue = rPoint;
				this.purchaseRPointStatus = true;
			}
		}
		else {
			this.pointErrorMessage = true;
		}

	}

	validatePurchaseDate(date) {
		var m = date.value.match(/(\d{4})-(\d{2})-(\d{2})/);
		var thisYear = new Date().getFullYear(); //YEAR NOW
		var maxYear = 2050; //MAX YEAR
		var minYear = new Date().getFullYear(); //MIN YEAR
		this.dateErrorMessage = true;
		// YEAR CHECK
		if (m != null) {
			if ((m[1].length < 4) || m[1] > maxYear || m[1] > thisYear || m[1] < minYear) {
				this.dateErrorMessage = true;
			}
			else {
				if ((m[2].length < 2) || m[2] < 1 || m[2] > 12) {
					this.dateErrorMessage = true;
				}
				else {
					if ((m[3].length < 2) || m[3] < 1 || m[3] > 31) {
						this.dateErrorMessage = true;
					}
					else {
						if ((m[2] == 2) && (m[3] > 28)) {
							this.dateErrorMessage = true;
						}
						else {
							if ((m[1] < minYear)) {
								this.dateErrorMessage = true;
							}
							else {
								this.purchaseExpiryDateStatus = true;
								this.purchaseExpiryDateValue = date.value;
								this.dateErrorMessage = false;

							}
						}
					}
				}
			}
		}
		else {
			this.dateErrorMessage = true;
		}
	}

	savePurchaseOffer(purchaseAmount, discountPercent, point, expiryDate, comment, description) {

		if (this.purchasePercentStatus == true && this.purchaseAmountStatus == true && this.purchaseDescriptionStatus == true && this.purchaseExpiryDateStatus == true && this.purchaseRPointStatus == true) {
			this.loader = true;
			this.purchaseSpecific = false;
			var offer = {
				comments: this.purchaseCommentValue,
				description: this.purchaseDescriptionValue,
				offer_code: "1PSO" + this.purchaseAmountValue + "D" + this.purchaseDiscountPercentValue + "RWP" + this.purchaseRPointValue,
				offer_expiry: this.purchaseExpiryDateValue,
				offer_type: "General- Purchase Specific"
			};
			this.OfferCode = offer.offer_code;
			this.generalOfferService.saveOffer(offer);
			console.log(offer);
			setTimeout(() => {
				var status = this.generalOfferService.getOfferSaveStatus();
				if (status == true) {
					console.log("test purchase status true");

					this.loader = false;
					this.success = true;
					this.clearPurchase(purchaseAmount, discountPercent, point, expiryDate, comment, description);
					this.failed = false;
				}
				else {
					console.log("failed");
					this.loader = false;
					this.failed = true;
					this.success = false;
				}
			}, 5000);
			this.success = false;

		}
		else {
			this.failed = false;
			this.success = false;
			this.validatePurchaseAmount(purchaseAmount);
			this.validatePurchaseComment(comment);
			this.validatePurchaseDate(expiryDate);
			this.validatePurchaseDescription(description);
			this.validatePurchasePercentage(discountPercent);
			this.validatePurchasePoint(point);

		}

	}

	clearPurchase(purchaseAmount, discountPercent, point, expiryDate, comment, description) {
		purchaseAmount.value = "";
		discountPercent.value = "";
		point.value = "";
		expiryDate.value = "";
		comment.value = "";
		description.value = "";
		this.purchasePercentStatus = false;
		this.purchaseAmountStatus = false;
		this.purchaseDescriptionStatus = false;
		this.purchaseExpiryDateStatus = false;
		this.purchaseRPointStatus = false;
		console.log("clear");
		this.purchaseAmountErrorMessage = false;
		this.purchasePercentErrorMessage = false;
		this.pointErrorMessage = false;
		this.commentErrorMessage = false;
		this.descriptionErrorMessage = false;
		this.dateErrorMessage = false;
		this.loader = false;
		



	}

	validatePaymentAmount(amount) {
		if (isNaN(amount.value) != true) {
			var paymentAmount = amount.value;
			if (paymentAmount < 0 || paymentAmount == "") {
				this.paymentAmountErrorMessage = true;
				this.purchaseAmountStatus = false;
			}
			else {
				this.paymentAmountErrorMessage = false;
				this.paymentAmountValue = paymentAmount;
				this.paymentAmountStatus = true;

			}
		}
		else {
			this.paymentAmountErrorMessage = true;
				this.purchaseAmountStatus = false;
		}

	}

	validatePaymentPercentage(percent) {
		var dpercent = percent.value;
		if (dpercent < 0 || dpercent == "" || dpercent > 98 || isNaN(dpercent) == true) {
			this.paymentPercentErrorMessage = true;
			this.paymentPercentStatus = false;
		}
		else {
			this.paymentPercentErrorMessage = false;
			this.paymentPercentValue = dpercent;
			this.paymentPercentStatus = true;

		}
	}

	validateExPaymentDate(date) {
		var m = date.value.match(/(\d{4})-(\d{2})-(\d{2})/);
		var thisYear = new Date().getFullYear(); //YEAR NOW
		var maxYear = 2050; //MAX YEAR
		var minYear = new Date().getFullYear(); //MIN YEAR
		this.paymentDateErrorMessage = true;
		// YEAR CHECK
		if (m != null) {
			if ((m[1].length < 4) || m[1] > maxYear || m[1] > thisYear) {
				this.paymentDateErrorMessage = true;
			}
			else {
				if ((m[2].length < 2) || m[2] < 1 || m[2] > 12) {
					this.paymentDateErrorMessage = true;
				}
				else {
					if ((m[3].length < 2) || m[3] < 1 || m[3] > 31) {
						this.paymentDateErrorMessage = true;
					}
					else {
						if ((m[2] == 2) && (m[3] > 28)) {
							this.paymentDateErrorMessage = true;
						}
						else {
							if ((m[1] < minYear)) {
								this.paymentDateErrorMessage = true;
							}
							else {
								this.paymentExpiryDateStatus = true;
								this.paymentExpiryDateValue = date.value;
								this.paymentDateErrorMessage = false;
							}
						}
					}
				}
			}
		}

	}
	validatePaymentComment(comment) {
		if (comment.value == "") {
			this.paymentCommentErrorMessage = true;
		}
		else {
			this.paymentCommentErrorMessage = false;
			this.paymentCommentStatus = true;
			this.paymentCommentValue = comment.value;

		}
	}

	validatePaymentDescription(description) {
		if (description.value == "") {
			this.paymentDescriptionErrorMessage = true;
		}
		else {
			this.paymentDescriptionErrorMessage = false;
			this.paymentDescriptionStatus = true;
			this.paymentDescriptionValue = description.value;
		}
	}

	selectBank(bank) {
		this.bankErrorMessage = true;
		if (bank.value == "SELECT ANY BANK" || bank.value == "DEFAULT") {
			this.bankErrorMessage = true;
		}
		else {
			var bankName = bank.name;
			this.paymentBankStatus = true;
			this.paymentBankValue = bankName;
			this.bankErrorMessage = false;
		}
	}

	selectMethod(method) {
		// this.methodErrorMessage = true;
		console.log("method.value " + method.value)
		if (method.value == "SELECT ANY PAYMENT METHOD" || method.value == "DEFAULT") {
			this.methodErrorMessage = true;
		}
		else {
			var paymentM = method.value;
			this.paymentMethodStatus = true;
			this.paymentMethodValue = paymentM;
			this.methodErrorMessage = false;

		}

	}

	savePaymentOffer(paymentAmount, pDiscountPercent, method, bank, pcomment, pdescription, pexpiryDate) {
		if (this.paymentBankStatus == true && this.paymentCommentStatus == true && this.paymentDescriptionStatus == true && this.paymentMethodStatus == true && this.paymentPercentStatus == true && this.paymentExpiryDateStatus == true) {
			this.paymentSpecific = false;
			this.loader = true;
			var code = "1PMO" + this.paymentBankValue + this.paymentAmountValue + "D" + this.paymentPercentValue;
			var offer = {
				comments: this.paymentCommentValue,
				description: this.paymentDescriptionValue,
				offer_code: code,
				offer_expiry: this.paymentExpiryDateValue,
				offer_type: "General Offers"
			};
			this.OfferCode = offer.offer_code;
			this.generalOfferService.saveOffer(offer);
			setTimeout(() => {
				var status = this.generalOfferService.getOfferSaveStatus();
				if (status == true) {
					this.success = true;
					this.loader = false;
					this.failed = false;
					this.clearPaymentFields(paymentAmount, pDiscountPercent, method, bank, pcomment, pdescription, pexpiryDate);

				}
				else {
					this.failed = true;
					this.success = false;
					this.loader = false;
				}
				this.loader = false;
			}, 2000);
			this.success = false;
		}
		else {

			this.failed = true;
			this.success = false;
			this.validateExPaymentDate(pexpiryDate);
			this.validatePaymentAmount(paymentAmount);
			this.validatePaymentComment(pcomment);
			this.validatePaymentDescription(pdescription);
			this.validatePaymentPercentage(pDiscountPercent);
			this.selectBank(bank);
			this.selectMethod(method)
		}
	}

	clearPaymentFields(paymentAmount, pDiscountPercent, method, bank, pcomment, pdescription, pexpiryDate) {
		paymentAmount.value = "";
		pDiscountPercent.value = "";
		method.value = "DEFAULT";
		bank.value = "DEFAULT";
		pcomment.value = "";
		pdescription.value = "";
		pexpiryDate.value = "";
		this.paymentBankStatus = false;
		this.paymentCommentStatus = false;
		this.paymentDescriptionStatus = false;
		this.paymentMethodStatus = false;
		this.paymentPercentStatus = false;
		this.paymentExpiryDateStatus = false;

		this.paymentAmountErrorMessage = false;
		this.paymentPointErrorMessage = false;
		this.pointErrorMessage = false;
		this.paymentPercentErrorMessage = false;
		this.paymentDateErrorMessage = false;
		this.paymentCommentErrorMessage = false;
		this.paymentDescriptionErrorMessage = false;
		this.methodErrorMessage = false;
		this.bankErrorMessage = false;

	}

	closeMessage() {
		if(this.failed){
			if(this.lastForm == "purchase"){
				this.purchaseSpecific = true;
			}	
			else{
				this.paymentSpecific = true;
			}
		}
		else{
			this.defaultSection = true;
		}
		this.failed = this.success = false;
	}

	goToPurchaseSpecific(){
		this.defaultSection = false;
		this.purchaseSpecific = true;
		this.lastForm = "purchase";
	}

	goToPaymentSpecific(){
		this.defaultSection = false;
		this.paymentSpecific = true;
		this.lastForm = "payment";
	}

	goTOGeneralMenu(){
		this.defaultSection = true;
		this.paymentSpecific = false;
		this.purchaseSpecific = false;
	}
}

