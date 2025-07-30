import {Injectable} from "@angular/core";
import { AppMainService } from '../../../app.mainService';

@Injectable()
export class EmployeeDisplayService {
getEmp:any;
	constructor(private appService: AppMainService) {}

	getAllEmployees(){
		this.getEmp=this.appService.allEmployeeDetails;
		return this.appService.allEmployeeDetails;
	}

	updateEmpolyees(employees){
		this.appService.allEmployeeDetails = employees;
		
	}
	
	getAllEmployeesAgain(){
		this.appService.allStaffDataFetching();
	}
	 
}