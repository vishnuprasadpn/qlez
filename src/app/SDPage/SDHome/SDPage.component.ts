import { Component ,ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { RouterModule, Router } from '@angular/router';
import { SDPageService } from './SDPage.service';

@Component({
  selector: 'SD-Page',
  templateUrl: './SDPage.component.html',
  styleUrls: ['./SDPage.component.css']
})
export class SDPageComponent {
	defaultSection:boolean;
	itemDisplay:boolean;
	productDisplay:boolean;

	constructor(private router: Router){
		this.defaultSection=true;
		this.itemDisplay=this.productDisplay=false;
	}

	goTOItemDisplay(){
		this.itemDisplay=true;
		this.productDisplay=this.defaultSection=false;
	}


	backToHome(){
      this.router.navigate(['/SMMHome']);
	}

	goTOProductDisplay(){
		this.productDisplay=true;
		this.itemDisplay=this.defaultSection=false;
	}

}
