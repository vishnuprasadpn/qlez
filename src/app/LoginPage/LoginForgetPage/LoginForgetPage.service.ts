import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class LoginForgetPageService {

	constructor(private appService: AppMainService) {}

	resetPassword(username){
		return this.appService.resetPassword(username);
	}

	getResetStatus(){
		return this.appService.resetEmailAddress;
	}

}