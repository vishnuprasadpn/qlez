import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class LoginService {

	constructor(private appService: AppMainService) {}

	fetchMonthlyTransactionDt(){
		this.appService.getMonthlyTransactionDetails();
	}
	
	authenticateUser(username,password){
		return this.appService.userAthentication(username,password);
	}

	setCurrentPageHeading(heading){
		this.appService.setCurrentPageHeading(heading);
	}

	getLoginStatus(){
		return this.appService.loginStatus;
		
	}
	
	// fetchFastestSellingProduct()
	// {
	// 	 this.appService.getFSPDetails();
		
	// 	return this.appService. geInitFSPDetails();
	// }

	getLoginType(){
		return this.appService.loginType;
	}

}