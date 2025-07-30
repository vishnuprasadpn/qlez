import { Component , ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { SDProductService } from './SDProduct.service';

@Component({
  selector: 'sd-product',
  templateUrl: './SDProduct.component.html',
  styleUrls: ['./SDProduct.component.css']
})
export class SDProductComponent {
	productDt:any;
	response:any;
	loadingProgress:boolean;
	productScanHome:boolean;
	dataView:boolean;
	connectionError:boolean;
	noProductFound:boolean;
	
	constructor(private sdProductService:SDProductService){
		this.productDt={invoice_date: null,item_code: null,pid: null,product_color: null,product_expiry: null,product_size: null,staff_id: null};
		this.productScanHome = true;
	}

	getProductDetails(){
		this.dataView = this.productScanHome = this.connectionError = this.noProductFound = false;
		
		this.sdProductService.scanProduct();
		
		this.loadingProgress = true;
		
		setTimeout(() => {
			this.response=null;
			this.response = this.sdProductService.getScannedProductDt();
			if(this.response!=undefined){
				if(this.response["success"] == true){
					this.productDt = this.response["product"];
					this.dataView = true;
					this.noProductFound = false;
				}	
				else{
					this.noProductFound = true;
					this.productScanHome = false;
				}
			}
			else{
				this.connectionError = true;
			}	
			this.loadingProgress = false;
		}, 8000);
	}

}
