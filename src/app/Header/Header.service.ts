import {Injectable} from "@angular/core";
import { AppMainService } from '../app.mainService';

@Injectable()
export class HeaderService {

	constructor(private appService: AppMainService) {}

	getUserDetails(){
		return this.appService.loggedID;
	}

	getCurrentPageHeading(){
		return this.appService.currentPageHeading;
	}
	
	savePassword(username,pass){
		this.appService.savePassword(username,pass);
	}

	getPasswordChangeStatus(){
		return this.appService.passwordChangeStatus;
	}

	savePasswordStatus(){
		return this.appService.passwordChangeStatus;
	}

	logOutService(){
		console.log("logout service");
		this.appService.logoutService();
		this.appService.loginStatus=false;
	}
}