import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class LoginUsingKeycodeService {

	constructor(private appService: AppMainService) {}

	authenticateUser(username,keycode){
		return this.appService.userAthenticationUsingKey(username,keycode);
	}

	setCurrentPageHeading(heading){
		this.appService.setCurrentPageHeading(heading);
	}

	getLoginStatus(){
		return this.appService.loginUsingKeyStatus;
	}

	getLoginType(){
		return this.appService.loginType;
	}
}