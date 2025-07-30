import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class OfferServices {

	constructor(private appService: AppMainService) {}

	saveOffer(offer){
		this.appService.addOffertoDB(offer)
	}	

	getOfferSaveStatus(){
		return this.appService.offerSaveStatus;
	}
	
}