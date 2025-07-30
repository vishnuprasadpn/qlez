import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class SDPageService {

	constructor(private appService: AppMainService) {}

	getUserDetails(){
		return this.appService.loggedID;
	}
	
}