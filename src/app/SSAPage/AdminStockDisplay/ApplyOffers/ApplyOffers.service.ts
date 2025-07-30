import {Injectable} from "@angular/core";
import { AppMainService } from '../../../app.mainService';

@Injectable()
export class ApplyOffersService {

	constructor(private appService: AppMainService) {}

	getAllOffers(){
		return this.appService.allOffers;
	}

	setStatusUpdate(status){
		this.appService.offerChangedStatus =status;
	}
}