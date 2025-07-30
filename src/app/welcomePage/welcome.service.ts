import {Injectable} from "@angular/core";
import { AppMainService } from '../app.mainService';

@Injectable()
export class WelcomeService {

	constructor(private appService: AppMainService) {}

	setLoginType(type){
		this.appService.loginType=type;
	}

	replenishConnection(){
		this.appService.loginStatus=false;
		this.appService.loggedID=null;
	}

}