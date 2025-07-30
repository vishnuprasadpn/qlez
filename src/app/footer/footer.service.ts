import {Injectable} from "@angular/core";
import { AppMainService } from '../app.mainService';

@Injectable()
export class FooterService {

	constructor(private appService: AppMainService) {}

	getCurrentPageHeading(){
		return this.appService.currentPageHeading;
	}
	
}