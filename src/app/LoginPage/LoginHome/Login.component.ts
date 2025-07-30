import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from './Login.service';
import { Observable } from 'rxjs';
import { timer as rxTimer} from 'rxjs';
declare var Razorpay: any;
declare function payByRazor(): any;

@Component({
	selector: 'Login',
	templateUrl: './Login.component.html',
	styleUrls: ['./Login.component.css']
})

export class LoginComponent {
	loadingProgress: boolean;

	subscription: any;
	timer: Observable<number>;
	rez: any;
	guestDt: any;
	customer: any;

	login_Status: any;
	loginType: any;
	logtimer: any; logsubscription: any;
	count: any;


	constructor(private router: Router, private loginService: LoginService) {
		this.loginType = this.loginService.getLoginType();
		this.count = 0;
		this.login_Status = false;

		// this.loginService.fetchFastestSellingProduct();
		// var temp=this.loginService.fetchFastestSellingProduct();

		// console.log( temp );
	}

	ngDoCheck() {

		this.login_Status = this.loginService.getLoginStatus();
		this.count = this.count + 1;
		if (this.login_Status == true) {
			this.loadingProgress = false;
			if (this.loginType == "SMM") {
				this.router.navigate(['/SMMHome']);
				this.loginService.setCurrentPageHeading("Stock Management Mode");
			}
			else {
				this.router.navigate(['/POSWelcome']);
				this.loginService.setCurrentPageHeading("POPEES BABY CARE");
			}
		}

		if (this.count > 20) {
			this.count = 0;
			this.loadingProgress = false;
			this.logsubscription.unsubscribe();
			document.getElementById("credentialMissingMessage").style.display = "none";
			document.getElementById("loginFailedMessage").style.display = "block";
		}
	}

	ngOnInit() {
		this.login_Status = false;
		document.getElementById("loginFailedMessage").style.display = "none";
		document.getElementById("credentialMissingMessage").style.display = "none";
	}


	forgetFunction() {
		this.router.navigate(['/LoginForgetPage']);
	}

	backToQlezWelcome() {
		this.router.navigate(['/QlezWelcome']);
	}

	loginValidation(username, password) {
		var uname = username.value;
		var pass = password.value;
		if (uname != "" && pass != "") {
			this.loadingProgress = true;
			this.loginService.authenticateUser(uname, pass);
			document.getElementById("credentialMissingMessage").style.display = "none";
			document.getElementById("loginFailedMessage").style.display = "none";
			this.logtimer = rxTimer(2000, 1000);
			this.logsubscription = this.logtimer.subscribe(this.check);
		}
		else {
			document.getElementById("credentialMissingMessage").style.display = "block";
		}
	}

	check() { }

	logout() {
		this.router.navigate(['/QlezWelcome']);
	}

}
