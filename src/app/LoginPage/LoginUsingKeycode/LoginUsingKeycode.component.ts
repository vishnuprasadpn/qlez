import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoginUsingKeycodeService } from './LoginUsingKeycode.service';

@Component({
  selector: 'Login-Keycode',
  templateUrl: './LoginUsingKeycode.component.html',
  styleUrls: ['./LoginUsingKeycode.component.css']
})

export class LoginUsingKeycodeComponent {

	login_Status:any;
	loginType:any;

	constructor(private router: Router,private loginUsingKeycodeService:LoginUsingKeycodeService){
		this.loginType = this.loginUsingKeycodeService.getLoginType();
	}
	
	ngOnInit(){
		this.login_Status='false';
	}

	backToQlezWelcome(){
		this.router.navigate(['/QlezWelcome']);
	}

	loginValidation(username,password){
		var uname = username.value;
		var pass = password.value;
		if(uname!="" && pass !=""){
			document.getElementById("loaderDiv").style.display="block";
			document.getElementById("loginDiv").style.pointerEvents="none";
			this.loginUsingKeycodeService.authenticateUser(uname,pass);
			document.getElementById("credentialMissingMessage").style.display = "none";		
			document.getElementById("loginFailedMessage").style.display = "none";		
			setTimeout(() => {
				this.login_Status = this.loginUsingKeycodeService.getLoginStatus();
				if(this.login_Status == true){
					if(this.loginType=="SMM"){
						this.router.navigate(['/SMMHome']);
						this.loginUsingKeycodeService.setCurrentPageHeading("Stock Management Mode");
					}
					else{
						this.router.navigate(['/POSWelcome']);
						this.loginUsingKeycodeService.setCurrentPageHeading("Billing Kiosk");	
					}				
				}
				else{
					document.getElementById("credentialMissingMessage").style.display = "none";			
					document.getElementById("loginFailedMessage").style.display = "block";
				}
				document.getElementById("loaderDiv").style.display="none";
				document.getElementById("loginDiv").style.pointerEvents="auto";
	    	}, 4000);
		}
		else{
			document.getElementById("credentialMissingMessage").style.display = "block";		
		}
	}
}
