import {Injectable} from "@angular/core";
import { AppMainService } from '../app.mainService';

@Injectable()
export class SMMHomeService {

	constructor(private appService: AppMainService) {}

	getEMPDetails(){
		return this.appService.loggedID;
	}	

	setCurrentPageHeading(heading){
		this.appService.setCurrentPageHeading(heading);
	}
	
	fetchMonthlyTransactionDt(){
		this.appService.getMonthlyTransactionDetails();
	}
}