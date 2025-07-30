import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  	
	constructor(private router: Router, private welcomeService:WelcomeService){
		//this.welcomeService.replenishConnection()
	}

	goToSMMLogin(){
		this.router.navigate(['/Login']);
		this.welcomeService.setLoginType("SMM");
	}

	goToPOSLogin(){
		this.router.navigate(['/Login']);
		this.welcomeService.setLoginType("POS");
	}

}	
