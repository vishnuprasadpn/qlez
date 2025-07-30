import {Injectable} from "@angular/core";
import { AppMainService } from '../../../app.mainService';

@Injectable()
export class EmployeeAdditionService {

	constructor(private appService: AppMainService) {}

	registerEmployee(id,fName,lName,type,dob,contact,role,address,email,pan,uid,gender){
		this.appService.registerEmployee(id,fName,lName,type,dob,contact,role,address,email,pan,uid,gender);
	}

	getRegistrationStatus(){
			console.log("reg status = "+ this.appService.employeeRegisterStatus);
		return this.appService.employeeRegisterStatus;
	
	}
}