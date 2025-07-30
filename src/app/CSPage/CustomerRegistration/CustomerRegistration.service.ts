import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class CustomerRegistrationService {

	constructor(private appService: AppMainService) {}

	registerCustomer(fname,lname,cdob,gender,pcontact,scontact,caddress,mail,link){
		this.appService.addNewCustomer(fname,lname,cdob,gender,pcontact,scontact,caddress,mail,link);		
	}

	getRegistrationStatus(){
		return this.appService.customerAdditionStatus;
	}

}