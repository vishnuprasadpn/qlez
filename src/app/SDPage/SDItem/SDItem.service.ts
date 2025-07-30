import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class SDItemService {

	constructor(private appService: AppMainService) {}

	getProducts(key,input){
		this.appService.getItemDetails(key,input);
	}

	scanProduct(){
		this.appService.getItemDetailsByID();
	}

	getItemsByCategory(group,category,subCategory,nature){
		this.appService.getItemDetailsByCategory(group,category,subCategory,nature);
	}

	getItemDt(){
		return this.appService.itemDetails;
	}
}