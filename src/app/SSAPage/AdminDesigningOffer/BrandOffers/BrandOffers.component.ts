import { Component, Input } from '@angular/core';
import { OfferServices } from '../OfferServices.service';

@Component({
	selector: 'brand-offers',
	templateUrl: './BrandOffers.component.html',
	styleUrls: ['./BrandOffers.component.css']
})
export class BrandOffersComponent {
	keyStatus: boolean;
	entryForm:boolean;
	commentStatus: boolean;
	descriptionStatus: boolean;
	expiryDateStatus: boolean;
	offerPercentageStatus: boolean;
	OfferCode: any;
	offerPercentageValue: any;
	offerKeyValue: any;
	offerDescriptionValue: any;
	offerCommentValue: any;
	expiryDateValue: any;
	offerTypeValue: any;

	today = new Date().toJSON().split('T')[0];

	expiryDateErrorStatus: any;
	offerPercentageErrorStatus: any;
	commentErrorStatus: any;
	descriptionErrorStatus: any;
	keyErrorStatus: any;

	loadingBrand: any;
	successMessageBrand: any;
	failedMessageBrand: any;

	constructor(private brandOfferService: OfferServices) {

		this.entryForm =true;
		this.keyStatus = false;
		this.commentStatus = false;
		this.descriptionStatus = false;
		this.expiryDateStatus = false;
		this.offerPercentageStatus = false;
		
		this.loadingBrand = false;
		this.successMessageBrand = false;
		this.failedMessageBrand = false;

		this.expiryDateErrorStatus = false;
		this.offerPercentageErrorStatus = false;
		this.keyErrorStatus = false;
		this.commentErrorStatus = false;
		this.descriptionErrorStatus = false;
	}

	validateOfferPercentage(offerPercentage) {
		if (offerPercentage.value == "" || offerPercentage.value > 100||isNaN(offerPercentage.value) ==true) {
			this.offerPercentageErrorStatus = true;
		}
		else {
			this.offerPercentageErrorStatus = false;
			this.offerPercentageValue = offerPercentage.value;
			this.offerPercentageStatus = true;
		}
	}

	validateOfferKey(key) {
		if (key.value == "") {
			this.keyErrorStatus = true;
		}
		else {
			this.keyErrorStatus = false;
			this.offerKeyValue = key.value;
			this.keyStatus = true;
		}
	}

	validateComment(comment) {
		if (comment.value == "") {
			this.commentErrorStatus = true;
		}
		else {
			this.commentErrorStatus = false;
			this.commentStatus = true;
			this.offerCommentValue = comment.value;
		}
	}

	validateDescription(description) {
		if (description.value == "") {
			this.descriptionErrorStatus = true;
		}
		else {
			this.descriptionErrorStatus = false;
			this.descriptionStatus = true;
			this.offerDescriptionValue = description.value;
		}
	}

	validateDate(date) {
		this.expiryDateErrorStatus = true;
		var m = date.value.match(/(\d{4})-(\d{2})-(\d{2})/);
		var thisYear = new Date().getFullYear(); //YEAR NOW
		var maxYear = 2050; //MAX YEAR
		var minYear = new Date().getFullYear(); //MIN YEAR
		var minDate = new Date().getDate(); //MIN DATE

		var minMonth = new Date().getMonth(); //MIN YEAR
		// YEAR CHECK
		if (m != null) {
			if ((m[1].length < 4) || m[1] > maxYear || m[1] > thisYear || m[1] < minYear) {
				this.expiryDateErrorStatus = true;
			}
			else {
				if ((m[2].length < 2) || m[2] < 1 || m[2] > 12 || m[2] < minMonth) {
					this.expiryDateErrorStatus = true;
				}
				else {
					if ((m[3].length < 2) || m[3] < 1 || m[3] > 31 || m[3] < minDate) {
						this.expiryDateErrorStatus = true;
					}
					else {
						if ((m[2] == 2) && (m[3] > 28)) {
							this.expiryDateErrorStatus = true;
						}
						else {
							if ((m[1] < minYear)) {
								this.expiryDateErrorStatus = true;
							}
							else {
								this.expiryDateStatus = true;
								this.expiryDateValue = date.value;
								this.expiryDateErrorStatus = false;
							}
						}
					}
				}
			}
		}
	}

	saveOffer(offerPercentage, offerKey, comment, description, expiryDate) {
		if (this.commentStatus == true && this.descriptionStatus == true && this.expiryDateStatus == true && this.keyStatus == true) {
			console.log("all good");
			this.loadingBrand = true;
			this.entryForm = false;
			var offerCode = "2D" + this.offerPercentageValue + this.offerKeyValue;

			var offer = {
				comments: this.offerCommentValue,
				description: this.offerDescriptionValue,
				offer_code: offerCode.toUpperCase(),
				offer_expiry: this.expiryDateValue,
				offer_type: "Item Specific"
			};
			
			this.OfferCode = offer.offer_code;
			this.brandOfferService.saveOffer(offer);
			setTimeout(() => {
				var status = this.brandOfferService.getOfferSaveStatus();
				console.log("status "+status);
				if (status == true) {
					this.successMessageBrand = true;
					this.failedMessageBrand = false;
					this.clearAll(offerPercentage, offerKey, comment, description, expiryDate);
					
					//this.clearAll(offerPercentage, offerKey, comment, description, expiryDate);
				}
				else {
					this.successMessageBrand = false;
					this.failedMessageBrand = true;
				}
				this.loadingBrand = false;
			}, 5000);
		}
		else {
			this.validateComment(comment);
			this.validateDate(expiryDate);
			this.validateDescription(description);
			this.validateOfferKey(offerKey);
			this.validateOfferPercentage(offerPercentage);
			this.failedMessageBrand = false;
			this.successMessageBrand = false;
			this.loadingBrand = false;
		}
	}

	clearAll(offerPercentage, offerKey, comment, description, expiryDate) {
		offerPercentage.value = "";
		offerKey.value = "";
		comment.value = "";
		description.value = "";
		expiryDate.value = "";

		this.keyStatus = false;
		this.commentStatus = false;
		this.descriptionStatus = false;
		this.expiryDateStatus = false;
		this.offerPercentageStatus = false;
		this.expiryDateErrorStatus = false;
		this.offerPercentageErrorStatus = false;
		this.keyErrorStatus = false;
		this.commentErrorStatus = false;
		this.descriptionErrorStatus = false;
	}

	closeMessage() {
		this.successMessageBrand = false;
		this.failedMessageBrand = false;
		this.entryForm = true;
	}

}
