import { Component } from '@angular/core';
import { OfferServices } from '../OfferServices.service';

@Component({
	selector: 'combo-offers',
	templateUrl: './ComboOffers.component.html',
	styleUrls: ['./ComboOffers.component.css']
})

export class ComboOffersComponent {
	entryForm:boolean;
	commentStatus: boolean;
	descriptionStatus: boolean;
	expiryDateStatus: boolean;
	offerCodeStatus: boolean;
	offerKeyStatus: boolean;
	OfferCode: any;
	offerCodeValue: any;
	offerTypeValue: any;
	offerDescriptionValue: any;
	offerCommentValue: any;
	expiryDateValue: any;
	offerKeyValue: any;

	offerCodeErrorMessage: any;
	offerKeyErrorMessage: any;
	offerTypeErrorMessage: any;
	commentErrorMessage: any;
	descriptionErrorMessage: any;
	dateErrorMessage: any;
	
	failedMessageSave:any;
	successMessageSave:any;

	loadingCombo:any;

	today = new Date().toJSON().split('T')[0];

	constructor(private comboOfferService: OfferServices) {
		this.entryForm = true;
		this.commentStatus = false;
		this.descriptionStatus = false;
		this.expiryDateStatus = false;
		this.offerCodeStatus = false;
		this.offerKeyStatus = false;
		//Error Messages 
		this.offerCodeErrorMessage = false;
		this.offerKeyErrorMessage = false;
		this.offerTypeErrorMessage = false;
		this.commentErrorMessage = false;
		this.descriptionErrorMessage = false;
		this.dateErrorMessage = false;

		this.successMessageSave = false;
		this.failedMessageSave = false;

		this.loadingCombo = false;
	}

	validateOfferCode(offerCode) {

		if (offerCode.value == "") {
			this.offerCodeErrorMessage = true;
		}
		else {
			this.offerCodeErrorMessage = false;
			var offercodeArray = (offerCode.value).split('');
			console.log(offercodeArray);
			if (offerCode.value.length)

				// &&(offercodeArray[2]==NaN)&&(offercodeArray[3]!="G")&&(offercodeArray[4]==NaN)
				if (offerCode.value.length == 4) {
					if ((offercodeArray[0].toUpperCase() == "B") && (isNaN(offercodeArray[1]) == false) && (offercodeArray[2].toUpperCase() == "G") && (isNaN(offercodeArray[3]) == false)) {
						if ((parseInt(offercodeArray[1]) >= 1) && (parseInt(offercodeArray[3]) >= 1)) {

							console.log("rit");
							this.offerCodeErrorMessage = false;
							this.offerCodeValue = offerCode.value;
							console.log(this.offerCodeValue);
							this.offerCodeStatus = true;

						}
						else {
							this.offerCodeErrorMessage = true;
						}
					}
				}
				else {
					console.log("all wrong");
					this.offerCodeErrorMessage = true;
				}
		}
	}


	validateComment(comment) {
		if (comment.value == "") {
		this.commentErrorMessage = true;
		}
		else {
			this.commentErrorMessage = false;
			this.commentStatus = true;
			this.offerCommentValue = comment.value;
		}
	}

	validateDescription(description) {
		if (description.value == "") {
			this.descriptionErrorMessage = true;
		}
		else {
			this.descriptionErrorMessage = false;
			this.descriptionStatus = true;
			this.offerDescriptionValue = description.value;

		}
	}

	validateDate(date) {
		var m = date.value.match(/(\d{4})-(\d{2})-(\d{2})/);
		var thisYear = new Date().getFullYear(); //YEAR NOW
		var maxYear = 2050; //MAX YEAR
		var minYear = new Date().getFullYear();; //MIN YEAR
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
								this.expiryDateStatus = true;
								this.expiryDateValue = date.value;
								this.dateErrorMessage = false;


							}
						}
					}
				}
			}
		}
	}

	validateOfferKey(key) {
		if (key.value == "") {
			this.offerKeyErrorMessage = true;
		}
		else {
			this.offerKeyErrorMessage = false;
			this.offerKeyValue = key.value;
			this.offerKeyStatus = true;

		}
	}


	saveOffer(offerCode, comment, description, expiryDate, offerKey) {
		if (this.offerKeyStatus == true && this.commentStatus == true && this.descriptionStatus == true && this.expiryDateStatus == true) {
			this.entryForm = false;
			this.loadingCombo = true;
			var code = ("3" + this.offerCodeValue + this.offerKeyValue).toUpperCase();
			var offer = {
				comments: this.offerCommentValue,
				description: this.offerDescriptionValue,
				offer_code: code,
				offer_expiry: this.expiryDateValue,
				offer_type: "Combo Offer"
			};
			this.OfferCode = offer.offer_code;
			this.comboOfferService.saveOffer(offer);
			setTimeout(() => {
				var status = this.comboOfferService.getOfferSaveStatus();
				if (status == true) {

					this.successMessageSave = true;
					this.failedMessageSave = false;
					this.clearAll(offerCode, comment, description, expiryDate, offerKey);
				}
				else {
					this.failedMessageSave = true;
					this.successMessageSave = false;
				}
				this.loadingCombo = false;
			}, 2000);

		}
		else {
			this.validateComment(comment);
			this.validateDate(expiryDate);
			this.validateDescription(description);
			this.validateOfferCode(offerCode);
			this.validateOfferKey(offerKey);
			this.failedMessageSave = true;
			this.successMessageSave = false;
		}
	}

	clearAll(offerCode, comment, description, expiryDate, offerKey) {
		offerCode.value = "";
		comment.value = "";
		description.value = "";
		expiryDate.value = "";
		offerKey.value = "";
		this.failedMessageSave = false;
		
		this.commentStatus = false;
		this.descriptionStatus = false;
		this.expiryDateStatus = false;
		this.offerCodeStatus = false;
		this.offerKeyStatus = false;
		this.offerCodeErrorMessage = false;
		this.offerKeyErrorMessage = false;
		this.offerTypeErrorMessage = false;
		this.commentErrorMessage = false;
		this.descriptionErrorMessage = false;
		this.dateErrorMessage = false;
	}

	closeMessage() {
		this.successMessageSave = false;
		this.failedMessageSave = false;
		this.entryForm = true;
	}
}
