import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class ProductAdditionService {

	constructor(private appService: AppMainService) {}
	
	addProduct(itemCode,itemColor,productSize,expiryDate,itemCount){
		this.appService.addProductsToDB(itemCode,itemColor,productSize,expiryDate,itemCount);
	}

	getBulkAdditionStatus(){
		return this.appService.productAdditionStatus;
	}

	getAllItemCodesList(){
		return this.appService.allItemCodeList;
	}

	refreshItemList(){
		this.appService.getAllItems();
	}
}
