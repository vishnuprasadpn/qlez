import {Injectable} from "@angular/core";
import { AppMainService } from '../../../app.mainService';

@Injectable()
export class AdminReturnExchangeService {

	constructor(private appService: AppMainService) {}

	getDefectiveProducts(){
		return this.appService.defectiveProducts;
	}

	sendForSale(product){
		this.appService.addProductForResale(product);
	}

	getDefectiveProductsAgain(){
		this.appService.getDefectiveProducts();
	}

	getProductDts(itemcode,key){
		this.appService.getItemDetails(itemcode,key);
	}

	getItemDt(){
		return this.appService.itemDetails;
	}
}