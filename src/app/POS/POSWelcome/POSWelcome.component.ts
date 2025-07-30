import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { POSWelcomeService } from './POSWelcome.service';
import { timer } from 'rxjs';
declare var jQuery: any;

@Component({
	selector: 'pos-welcome',
	templateUrl: './POSWelcome.component.html',
	styleUrls: ['./POSWelcome.component.css']
})

export class POSWelcomeComponent {
	NoProductFound:boolean;
	cancelPurchaseUi:boolean;
	billDetails: any;
	loadingWelcome: any;
	timer: any; subscription: any;
	i: any;
	responseReceived: boolean; startCount: boolean;
	buttonStatus: boolean;
	customerType:any;

	constructor(private router: Router, private posWelcomeService: POSWelcomeService) {
		this.loadingWelcome = this.NoProductFound = false;
		this.customerType ="registered";

		this.i = 0; this.responseReceived = false;
		this.startCount = false;
		this.buttonStatus = true;
		this.posWelcomeService.clearExistingData();
	}

	ngDoCheck() {
		this.billDetails = this.posWelcomeService.getCustomerBill();
		if (this.startCount == true) {
			this.i = this.i + 1;
		}

		if (this.billDetails != undefined && this.responseReceived == false) {
			if (this.billDetails.items != null) {
				console.log("this.billDetails");
				console.log(this.billDetails);
				this.loadingWelcome = false;
				this.i = 1;
				this.responseReceived = true;
				if (this.billDetails.customerDt != undefined || this.billDetails.customerDt != null) {
					this.router.navigate(['/CustomerBill']);
				}
				else {
					this.router.navigate(['/NoCustomerCard']);
					if(this.customerType=="guest"){
						
					}
					else{
						this.router.navigate(['/NoCustomerCard']);
					}
				}
			}
		}

		//console.log("i : " + this.i);
		if (this.i > 20) {
			console.log("getting tag timeout");
			this.i = 0;
			this.startCount = false;
			
			this.NoProductFound=true;
			this.loadingWelcome=false;
			this.subscription.unsubscribe();
		}
	}

	getCustBill(){
		this.customerType ="registered";
		this.getBill();
	}

	getGuestBill(){
		this.customerType ="guest";
		this.getBill();
	}

	getBill() {
		this.buttonStatus = false;
		this.loadingWelcome = true;
		this.NoProductFound=false;
		this.posWelcomeService.getBillDetails(this.customerType);
		this.applyBill();
		this.startCount = true;
	}

	applyBill() {
		this.timer = timer(2000, 1000);
		this.subscription = this.timer.subscribe(this.check);
	}
	

	cancelPurchase() {
		this.cancelPurchaseUi = true;
		this.loadingWelcome = this.NoProductFound = false;
		//jQuery('#cancelPurchaseModal').modal('show');
	}

	confirmCancelPurchase() {
		this.loadingWelcome = false;
		this.buttonStatus = true;
		this.NoProductFound=false;this.cancelPurchaseUi = false;

		//jQuery('#cancelPurchaseModal').modal('hide');
		this.posWelcomeService.cancelPurchase();
	}

	check() { }
	
	logout() {
		this.router.navigate(['/QlezWelcome']);
	}

	waitToCancel(){
		this.cancelPurchaseUi = false;
		this.NoProductFound = true;
	}
}
