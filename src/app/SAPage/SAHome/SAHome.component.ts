import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'SA-Home',
  templateUrl: './SAHome.component.html',
  styleUrls: ['./SAHome.component.css']
})
export class SAHomeComponent {
  defaultSection:boolean;
  itemAdditionView:boolean;
  productAdditionView:boolean;

  	constructor(private router: Router){
      this.defaultSection =true;
      this.itemAdditionView = this.productAdditionView = false;
    }
	
  	backToHome(){
      this.router.navigate(['/SMMHome']);
  }
  
  goTOItemAddition(){
    this.itemAdditionView=true;
		this.productAdditionView=this.defaultSection=false;
  }

  goTOProductAddition(){
    this.productAdditionView=true;
		this.itemAdditionView=this.defaultSection=false;
  }
}
