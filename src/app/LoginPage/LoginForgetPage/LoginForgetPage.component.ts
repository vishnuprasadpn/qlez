import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoginForgetPageService } from './LoginForgetPage.service';
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'Login-ForgetPage',
  templateUrl: './LoginForgetPage.component.html',
  styleUrls: ['./LoginForgetPage.component.css']
})
export class LoginForgetPageComponent {

	resetResponse:any;
	resetMail:any;
	constructor(private router:Router,private loginForgetPageService:LoginForgetPageService){}

	ngOnInit(){
		document.getElementById("resetSuccessMessage").style.display = "none";
		document.getElementById("resetFailedMessage").style.display = "none";			
		document.getElementById("usernameMissingMessage").style.display = "none";
	}

	backToLogin(){
		this.router.navigate(['/Login']);
	}

	resetPassword(username){
		document.getElementById("resetFailedMessage").style.display = "none";
		document.getElementById("resetSuccessMessage").style.display = "none";
		document.getElementById("usernameMissingMessage").style.display = "none";
		
		var uname = username.value;
		
		if(uname!=""){			
			document.getElementById("loaderDiv").style.display="block";
			document.getElementById("forgot-div").style.pointerEvents="none";	
			document.getElementById("usernameMissingMessage").style.display = "none";		
			this.loginForgetPageService.resetPassword(uname);
	
			setTimeout(() => {
				this.resetResponse = this.loginForgetPageService.getResetStatus();
				if(this.resetResponse.success == true){
					console.log("found");
		
					this.resetMail = this.resetResponse["userEmail"];
					document.getElementById("resetSuccessMessage").style.display = "block";
					document.getElementById("resetFailedMessage").style.display = "none";

				}
				else{
					console.log("not found")
					document.getElementById("resetSuccessMessage").style.display = "none";
					document.getElementById("resetFailedMessage").style.display = "block";
				}
	    		document.getElementById("loaderDiv").style.display="none";
		
			}, 10000);
		}
		else{
			document.getElementById("usernameMissingMessage").style.display = "block";
		}
		document.getElementById("forgot-div").style.pointerEvents="auto";	
			
	}

	goToKeyLogin(){
		this.router.navigate(['/SMMLoginUsingKeycode']);		
	}
}
