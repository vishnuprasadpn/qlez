import {Injectable} from "@angular/core";
import { AppMainService } from '../../../app.mainService';

@Injectable()
export class ItemEditService {

	constructor(private appService: AppMainService) {}

	getItemToEdit(){
		return this.appService.selectedItemForEdit;
	}

	getProducts(key,input){
		this.appService.getItemDetails(key,input);
	}

	scanProduct(){
		this.appService.getItemDetailsByID();
	}

	getItemsByCategory(group,category,subCategory,nature){
		this.appService.getItemDetailsByCategory(group,category,subCategory,nature);
	}

	getItemDt()
	{
		return this.appService.itemDetails;
	}	
}