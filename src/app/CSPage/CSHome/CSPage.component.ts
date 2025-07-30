import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'CS-Page',
  templateUrl: './CSPage.component.html',
  styleUrls: ['./CSPage.component.css']
})
export class CSPageComponent {
	
	defaultSection:boolean;customerRegister:boolean;customerAction:boolean;

   	username:string;searchKeyLabel:string;
	
	constructor(private router: Router){
		this.defaultSection=true;
		this.customerAction=this.customerRegister=false;
		this.username = "Vishnu";
		this.searchKeyLabel ="Item name";
	}

	goToRegister(){
		this.customerRegister=true;
		this.customerAction=this.defaultSection=false;
	}

	goToAction(){
		this.customerAction=true;
		this.customerRegister=this.defaultSection=false;
	}

	backToHome(){
      this.router.navigate(['/SMMHome']);
	}
}
