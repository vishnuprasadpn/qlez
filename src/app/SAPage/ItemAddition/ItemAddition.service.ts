import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class ItemAdditionService {

	constructor(private appService: AppMainService) {}
	
	addItem(item){
		this.appService.addItemDtToDB(item);
	}

	getBulkAdditionStatus(){
		return this.appService.productAdditionStatus;
	}

	getItemAdditionStatus(){
		return this.appService.itemAdditionStatus;
	}
}