import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'SSAHome',
  templateUrl: './SSAHome.component.html',
  styleUrls: ['./SSAHome.component.css']
})
export class SSAHomeComponent {
  defaultSection:boolean;
  returnedStockView:boolean;
  offerManagementView:boolean;
  stockManagementView:boolean;
  staffManagementView: boolean;

  staffManagementMenuView:boolean;
  staffAdditionView:boolean;
  staffListView:boolean;

  
  constructor(private router: Router){
      this.defaultSection =true;
  }
  
  checkStockReturn(){
    this.returnedStockView = true;
    this.defaultSection = this.offerManagementView = this.staffManagementView = this.stockManagementView = false;
  }

  showStaffManagementView(){
    this.staffAdditionView = this.offerManagementView = this.staffListView = this.returnedStockView = this.defaultSection = this.stockManagementView = false;
    this.staffManagementView = this.staffManagementMenuView = true;
  }

  showStockManagementView(){
    this.returnedStockView = this.offerManagementView = this.defaultSection = this.staffManagementView = false;
    this.stockManagementView = true;
  }

  showOfferManagementView(){
    this.returnedStockView = this.defaultSection = this.staffManagementView = this.stockManagementView = false;
    this.offerManagementView = true;
  }

	backToHome(){
      this.router.navigate(['/SMMHome']);
	}

  addNewStaff(){
    this.staffManagementMenuView = this.staffListView = false;
    this.staffAdditionView = true;
  }

  showStaffList(){
    this.staffManagementMenuView = this.staffAdditionView = false;
    this.staffListView = true;
  }

}