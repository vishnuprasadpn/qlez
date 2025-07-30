import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NoCustomerCardService } from './NoCustomerCard.service';
declare var jQuery: any;

@Component({
	selector: 'no-customer-card',
	templateUrl: './NoCustomerCard.component.html',
	styleUrls: ['./NoCustomerCard.component.css']
})

export class NoCustomerCardComponent {
	loginContactErrorMessage:boolean;
	dateErrorMessage:boolean;
	guestContactErrorMessage:boolean;
	loginPassCodeErrorMessage:boolean;
	cancelPurchaseUi:boolean;

	buttonStatus:boolean;
	guestEntryStatus:boolean;
	forgotCardStatus:boolean;
	guestProcess:boolean;
	custIDNotFound:boolean;
	loadingBillProgress:boolean;

	forgotCardOverlayStatus: boolean;
	customerDt: any;
	passcodeStatus: any;
	contactStatus: any;
	dateStatus: any;
	guestContactStatus: any;
	year: number;
	month:any;
	date:any;
	allYears: any;
	alldate: any;
	currentYear: number;
	monthStatus:any;
	dateOfBirth:number;
	dobStatus:any;
	
	constructor(private router: Router, private noCustomerCardService: NoCustomerCardService) {
		this.buttonStatus=true;
		this.guestEntryStatus=this.forgotCardStatus=this.loadingBillProgress=false;
		this.forgotCardOverlayStatus = false;
		this.passcodeStatus = false;
		this.contactStatus = false;
		this.dateStatus = false;
		this.monthStatus = false;
		this.dobStatus=false;
		this.currentYear = new Date().getFullYear();
		this.allYears = [];
		this.alldate = [];

		var eType=this.noCustomerCardService.getCustomerType();

		if(eType == "registered"){
			this.guestEntryStatus = this.guestProcess = false;
			this.forgotCardStatus = this.custIDNotFound = true;
		}
		else{
			this.guestEntryStatus = this.guestProcess = true;
			this.forgotCardStatus = this.custIDNotFound = false;
		}
	}

	ngOnInit() {
		this.allYears.pop();
		this.currentYear = this.currentYear - 12;
		for (let i = this.currentYear; i >= 1950; i--) {
			this.allYears.push(i);
		}
	}

	getGuestLoginForm(){
		this.guestEntryStatus=this.guestProcess=true;
		this.forgotCardStatus=this.custIDNotFound = false;
	}

	getCustomerLoginForm(){
		this.forgotCardStatus=this.custIDNotFound=true;
		this.guestEntryStatus=this.guestProcess=false;
	}

	showGuestBill(){

	}
	
	focusContact() {
		this.loginContactErrorMessage = false;
	}


	focusPassCode() {
		this.loginPassCodeErrorMessage = false;
	}

	verifyContact(contact) {
		var contactN = parseInt(contact.value);
		if (contactN < 9999999999 && contactN.toString() != "" && contactN > 1000000000) {
			this.loginContactErrorMessage = false;
			this.contactStatus = true;
		}
		else {
			this.loginContactErrorMessage = true;
			this.contactStatus = false;
		}
	}

	searchCustomer(contact, passcode) {
		this.verifyContact(contact);
		if (passcode.value == "") {
			this.loginPassCodeErrorMessage = true;
			this.passcodeStatus = false;
		}
		else {
			this.loginPassCodeErrorMessage = false;
			this.passcodeStatus = true;
		}
		if (this.contactStatus == true && this.passcodeStatus == true) {
			document.getElementById("loaderLoginElementDiv").style.display = "block";
			this.noCustomerCardService.searchCustomer(contact.value, passcode.value);
			setTimeout(() => {
				var response = this.noCustomerCardService.getCustomerdt();
				this.customerDt = response.customerDt;
				if (this.customerDt != null) {

					this.router.navigate(['/CustomerBill']);
					document.getElementById("failedMessage").style.display = "none";
				}
				else {
					document.getElementById("failedMessage").style.display = "block";
				}
				document.getElementById("loaderLoginElementDiv").style.display = "none";
			}, 5000);
		}
	}
	continueAsGuest() {
		document.getElementById("guestLoginOverlay").style.height = "100%";
	}

	guestLoginClose() {
		document.getElementById("guestLoginOverlay").style.height = "0%";
	}

	isNumber(number) {
		if (isNaN(number.value)) {
			this.loginContactErrorMessage = true;
		}
		else {
			this.loginContactErrorMessage = false;
		}
	}

	validateYear(year){
		
		this.monthStatus = true;
		this.dateStatus = this.dateErrorMessage =false;
		this.year=year.value;
	}

	validateMonth(month, year) {
		this.dateErrorMessage = false;
		this.dateStatus=true;
		this.alldate = [];
		this.month=month.value;
		var m = month.value;
		var y = year.value;
		this.alldate.pop();
		if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
			var dates = 31;
			this.alldate.pop();
			for (var i = 1; i <= dates; i++) {

				this.alldate.push(i);
			}
		}
		else if (m == 4 || m == 6 || m == 9 || m == 11) {
			var dates = 30; 
			this.alldate.pop();
			for (var i = 1; i <= dates; i++) {
				this.alldate.push(i);
			}
		}
		else {
			if ((y % 4 == 0) || (y % 400 == 0 && y % 100 != 0))
        {    
            	var dates=29;          
        }
        else 
        {
           	var dates =28;              
        }
			this.alldate.pop();
			for (var i = 1; i <= dates; i++) {
				this.alldate.push(i);
			}
		}

	}
	selectDate(date){
		this.dateErrorMessage = false;
		this.date=date.value;
		this.dateOfBirth=this.date+this.month+this.year;
		this.dobStatus=true;
	}

	validateGuestContact(contact) {
		this.guestContactStatus = false;
		var contactN = parseInt(contact.value);
		if (contactN < 9999999999 && contactN.toString() != "" && contactN > 1000000000) {
			this.guestContactErrorMessage = false;
			this.guestContactStatus = true;
		}
		else {
			this.guestContactErrorMessage = true;
		}
	}

	loginGuest(contact) {
		this.validateGuestContact(contact);
		// this.validateDate(dob);
		var dob=this.dateOfBirth;
		if (this.guestContactStatus == true && this.dobStatus == true) {
			this.noCustomerCardService.setGuestDt(contact,dob);
			this.router.navigate(['/CustomerBill']);
			this.dateErrorMessage = false;
		}
		else if(this.dobStatus==false)
		{
			this.dateErrorMessage = true;
		}
	}

	focusGuestContact() {
		if (this.guestContactErrorMessage) {
			this.guestContactErrorMessage = false;
		}
	}



	cancelPurchase() {
		this.cancelPurchaseUi = true;
		this.loadingBillProgress = this.guestEntryStatus= this.forgotCardStatus = false;
		//jQuery('#cancelPurchaseModal').modal('show');
	}

	confirmCancelPurchase() {
		this.cancelPurchaseUi = false;
		//jQuery('#cancelPurchaseModal').modal('hide');
		this.noCustomerCardService.cancelPurchase();
		this.router.navigate(['/POSWelcome']);
	}

	continuePurchase(){
		this.cancelPurchaseUi = false;

	}
}
