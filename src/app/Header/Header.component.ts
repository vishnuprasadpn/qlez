import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HeaderService } from './Header.service';

@Component({
	selector: 'header',
	templateUrl: './Header.component.html',
	styleUrls: ['./Header.component.css']
})
export class HeaderComponent {

	username: string;
	CurrentPage: string;
	password: string;
	repassword: string;
	status: boolean;

	constructor(private router: Router, private headerService: HeaderService) {
		var userDt = this.headerService.getUserDetails();
		if(userDt!=null && userDt !=undefined){
			this.username = userDt["employee_id"];
			this.CurrentPage = this.headerService.getCurrentPageHeading();
		}
	}

	ngAfterViewInit() {}

	backToHome() {
		this.router.navigate(['/SMMHome']);
	}

	logout() {
		this.headerService.logOutService();
		this.router.navigate(['/QlezWelcome']);
	}

	changePassword(option) {
		if (option == 'open') {
			document.getElementById("changePasswordOverlay").style.height = "100%";
		}
		else {
			document.getElementById("changePasswordOverlay").style.height = "0%";
		}
	}

	validatePassword(pass) {
		this.password = pass.value;
	}

	validateReTypePassword(rePass) {
		this.repassword = rePass.value;
	}

	savePassword() {
		if ((this.repassword != "" && this.password != "") && (this.repassword  == this.password)) {
			this.headerService.savePassword(this.username, this.password);
			document.getElementById("loaderDiv").style.display = "block";
			setTimeout(() => {
				this.status = this.headerService.savePasswordStatus();
				if (this.status == true) {
					document.getElementById("updateSuccessMessage").style.display = "block";
					setTimeout(() => {
						this.router.navigate(['/Login']);
					}, 1000);
				}
				else {
					document.getElementById("updateFailedMessage").style.display = "none";
				}
				document.getElementById("loaderDiv").style.display = "none";
			}, 3000);
		}
		else {
			document.getElementById("loaderDiv").style.display = "block";
			console.log("faildd");
			setTimeout(() => {
				document.getElementById("loaderDiv").style.display = "none";
				document.getElementById("passwordNotMatchingMessage").style.display = "block";
			}, 3000);
			document.getElementById("passwordNotMatchingMessage").style.display = "none";
		}
	}
}
