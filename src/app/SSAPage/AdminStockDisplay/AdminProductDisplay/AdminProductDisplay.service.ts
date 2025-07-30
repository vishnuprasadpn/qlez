import {Injectable} from "@angular/core";
import { AppMainService } from '../../../app.mainService';

@Injectable()
export class AdminSDProductService {

	constructor(private appService: AppMainService) {}

	scanProduct(){
		this.appService.scanProduct()
	}


	getScannedProductDt(){
		return this.appService.scannedProductDt;
	}

	setAdminScannedProductDetails(product){
		this.appService.adminScannedProductDt= product;
	}

	saveProductChanges(){
		this.appService.saveProductDtChanges();
	}
}