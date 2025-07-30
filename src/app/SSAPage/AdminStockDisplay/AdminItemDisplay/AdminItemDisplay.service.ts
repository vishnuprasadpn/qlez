import {Injectable} from "@angular/core";
import { AppMainService } from '../../../app.mainService';

@Injectable()
export class AdminSDItemService {

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

	selectedItemForEdit(item){
		this.appService.selectedItemForEdit = item;
	}

	saveItemDt(item){
		this.appService.saveEditedItemDt(item);
	}

	saveUpdatedOffer(items){
		this.appService.saveUpdation(items)
	}
}