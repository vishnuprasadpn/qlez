import { Component } from '@angular/core';
import { EmployeeDisplayService } from './EmployeeDisplay.service';

@Component({
	selector: 'employee-display',
	templateUrl: './EmployeeDisplay.component.html',
	styleUrls: ['./EmployeeDisplay.component.css']
})
export class EmployeeDisplayComponent {
	noResponseError:boolean;
	noStaffsFound:boolean;
	editEmployee:boolean;
	loadingProgress:boolean;
	textValue:any;

	response:any;
	editedStatus:any;
	errorEmailStatus:any;
	errorContactStatus:any;
	errorAddressStatus:any;
	counter:any;

	editTypeStatus:boolean;
	editRoleStatus:boolean;
	editEmailStatus:boolean;
	editContactStatus:boolean;
	editAddressStatus:boolean;

	editRoleIcon:boolean;
	saveRoleIcon:boolean;
	editAddressIcon:boolean;
	saveAddressIcon:boolean;
	editEmailIcon:boolean;
	saveEmailIcon:boolean;
	editContactIcon:boolean;
	saveContactIcon:boolean;
	editTypeIcon:boolean;
	saveTypeIcon:boolean;

	employees: any;
	staffDisplayStatus: boolean;
	viewEmployeeOverlayStatus: boolean;
	selectedEmployee: any;
	selectedEmployeeContact: any;
	selectedEmployeeID: any;
	selectedEmployeeDesignation: any;
	selectedEmployeeMail: any;
	selectedEmployeeType: any;
	selectedEmployeeAddress: any;

	adminStatus: boolean;
	salesStatus: boolean;
	inventoryStatus: boolean;
	customerStatus: boolean;
	regularStatus: boolean;
	partTimeStatus: boolean;

	constructor(private employeeDetailsService: EmployeeDisplayService) {
		this.employees = [{ employee_DOB: null, employee_ID: null, employee_address: null, employee_contact: null, employee_designation: null, employee_fname: null, employee_lname: null, employee_mail: null, employee_type: null, gender: null, pan: null, uid: null }];
		this.noResponseError = true;
		this.counter = 0;
		this.response = this.employeeDetailsService.getAllEmployees();
		console.log(this.response);
		if(this.response !=undefined){
			setTimeout(() => {
				this.loadingProgress = false;
				this.setData(this.response);
			}, 2000);
		}
		else{
			this.noResponseError = true;
			this.loadingProgress = false;
		}
	}

	ngDoCheck(){
		this.response = this.employeeDetailsService.getAllEmployees();
		if(this.response !=undefined || this.response != null){
			this.noResponseError = this.loadingProgress = false;
			this.setData(this.response);
		}
		else{
			if(this.counter > 7 || this.counter ==0){
				this.noResponseError = true;
				this.loadingProgress = false;
			}
			else{
				this.loadingProgress = true;
				this.noResponseError = false;
			}
		}
		this.counter = this.counter + 1;
	}

	setData(response){
		if (response["success"] != false) {
			if(!this.editEmployee){
				this.staffDisplayStatus = true;
			}
			for (var eCount = 0; eCount < response["empDetails"].length; eCount++) {
				this.employees[eCount] = response["empDetails"][eCount];
			}
		}
		else {
			this.staffDisplayStatus = false;
			this.noStaffsFound = true;
		}
	}

	getStaffList(){
		this.response = this.employeeDetailsService.getAllEmployeesAgain();
		this.counter = 1;
	}


	viewEmployeeDt(employee) {
		console.log(employee)
		this.selectedEmployee = employee;
		this.editEmployee = this.editAddressIcon = this.editContactIcon = this.editEmailIcon = this.editRoleIcon = this.editTypeIcon = true;
		this.staffDisplayStatus = false;
		
		this.selectedEmployeeContact = this.selectedEmployee["employee_contact"];
		this.selectedEmployeeID = this.selectedEmployee["employee_ID"];
		this.selectedEmployeeDesignation = this.selectedEmployee["employee_designation"];
		this.selectedEmployeeMail = this.selectedEmployee["employee_mail"];
		this.selectedEmployeeType = this.selectedEmployee["employee_type"];
		this.selectedEmployeeAddress = this.selectedEmployee["employee_address"];
		if (this.selectedEmployeeDesignation == 'Admin') {
			this.adminStatus = true;
			this.salesStatus = false;
			this.inventoryStatus = false;
			this.customerStatus = false;
		}
		else if (this.selectedEmployeeDesignation == 'Sales') {
			this.adminStatus = false;
			this.salesStatus = true;
			this.inventoryStatus = false;
			this.customerStatus = false;
		}
		else if (this.selectedEmployeeDesignation == 'Inventory') {
			this.adminStatus = false;
			this.salesStatus = false;
			this.inventoryStatus = true;
			this.customerStatus = false;
		}
		else {
			this.adminStatus = false;
			this.salesStatus = false;
			this.inventoryStatus = false;
			this.customerStatus = true;
		}

		if (this.selectedEmployeeType == 'Regular') {
			this.regularStatus = true;
		}
		else {
			this.partTimeStatus = true;
		}

		// if (employee != 'close') {

		// 	
		// }
		// else {
		// 	setTimeout(() => {
		// 		this.salesStatus = false;
		// 		this.inventoryStatus = false;
		// 		this.customerStatus = false;
		// 		this.adminStatus = false;
		// 		this.regularStatus = false;
		// 		this.partTimeStatus = false;
		// 	}, 1000);
		// 	this.employeeDetailsService.updateEmpolyees(this.employees);
		// }

	}

	editRoleFunction() {
		this.editRoleIcon = false;
		this.saveRoleIcon = this.editRoleStatus = true;
	}

	changeRoleFunction(employeeRole) {
		this.selectedEmployeeDesignation = employeeRole.value;
	}

	saveRoleFunction(employeeRole) {
		this.saveRoleIcon = this.editRoleStatus = false;
		this.editRoleIcon = true;
		console.log("save role");
		console.log(employeeRole);

		if (this.selectedEmployeeDesignation != this.selectedEmployee["employee_designation"]) {
			for (var e = 0; e < this.employees.length; e++) {
				if (this.selectedEmployeeID == this.employees[e]["employee_ID"]) {
					this.editedStatus = true;
					this.employees[e]["employee_designation"] = this.selectedEmployeeDesignation;
				}
			}
		}
	}

	editTypeFunction() {
		this.editTypeStatus = this.saveTypeIcon = true;
		this.editTypeIcon = false;		
	}

	changeTypeFunction(type) {
		this.selectedEmployeeType = type.value;
	}

	saveTypeFunction(employeeType) {
		console.log("save type");
		console.log(employeeType);
		this.editTypeIcon = true;
		this.saveTypeIcon = this.editTypeStatus = false;
		
		if (this.selectedEmployeeType != this.selectedEmployee["employee_type"]) {
			for (var e = 0; e < this.employees.length; e++) {
				if (this.selectedEmployeeID == this.employees[e]["employee_ID"]) {
					this.editedStatus = true;
					this.employees[e]["employee_type"] = this.selectedEmployeeType;
				}
			}
		}
	}

	editEmailFunction() {
		this.editEmailIcon = false;
		this.saveEmailIcon = this.editEmailStatus = true;
	}

	validateEmail(email) {
		var emailA = email.value;
		if (emailA != "") {
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailA)) {
				this.saveEmailIcon = true;
				this.errorEmailStatus = false;
				this.selectedEmployeeMail = emailA;
			}
			else {
				this.saveEmailIcon = false;
				this.errorEmailStatus = true;
			}
		}
	}

	saveEmailFunction(employeeEmailInput) {
		console.log("save email");
		console.log(employeeEmailInput);
		//employeeEmailInput.id.style.pointerEvents = "none";
		//employeeEmailInput.id.style.background = "#fff";
		this.editEmailIcon = true;
		this.saveEmailIcon = this.editEmailStatus = false;
		if (this.selectedEmployeeMail != this.selectedEmployee["employee_mail"]) {
			for (var e = 0; e < this.employees.length; e++) {
				if (this.selectedEmployeeID == this.employees[e]["employee_ID"]) {
					this.editedStatus = true;
					this.employees[e]["employee_mail"] = this.selectedEmployeeMail;
				}
			}
		}
	}

	editContactFunction() {
		this.saveContactIcon = this.editContactStatus = true;
		this.editContactIcon = false;
	}

	validateContact(contact) {
		var contactN = parseInt(contact.value);
		if (contactN < 9999999999 && contactN.toString() != "" && contactN > 1000000000) {
			this.saveContactIcon = true;
			this.errorContactStatus = false;
			this.selectedEmployeeContact = contactN.toString();
		}
		else {
			this.saveContactIcon = false;
			this.errorContactStatus = true;
		}
	}

	saveContactFunction(employeeContact) {
		this.saveContactIcon = this.editContactStatus = false;
		this.editContactIcon = true;
		if (this.selectedEmployeeContact != this.selectedEmployee["employee_contact"]) {
			for (var e = 0; e < this.employees.length; e++) {
				if (this.selectedEmployeeID == this.employees[e]["employee_ID"]) {
					this.editedStatus = true;
					this.employees[e]["employee_contact"] = this.selectedEmployeeContact;
				}
			}
		}
	}



	editAddressFunction() {
		this.editAddressIcon = false;
		this.saveAddressIcon = this.editAddressStatus = true;
	}

	verifyAddressFunction(address) {
		console.log("address");
		console.log(address);
		if (address.value != "") {
			this.saveAddressIcon = true;
			this.errorAddressStatus = false;
			this.selectedEmployeeAddress = address.value;
		}
		else {
			this.saveAddressIcon = false;
			this.errorAddressStatus = true;
		}
	}

	saveAddressFunction(employeeAddress) {
		console.log("save address");
		console.log(employeeAddress);
		//employeeAddress.id.style.pointerEvents = "none";
		//employeeAddress.id.style.background = "#fff";
		this.editAddressIcon = true;
		this.saveAddressIcon = this.editAddressStatus = false;
		if (this.selectedEmployeeAddress != this.selectedEmployee["employee_address"]) {
			for (var e = 0; e < this.employees.length; e++) {
				if (this.selectedEmployeeID == this.employees[e]["employee_ID"]) {
					this.editedStatus = true;
					this.employees[e]["employee_address"] = this.selectedEmployeeAddress;
				}
			}
		}
	}


	saveAndReturnList(){
		if(this.editedStatus){
			//UPDATE TO DATABASE
			console.log("update to database");
		}		
		this.staffDisplayStatus = true;
		this.editEmployee = false;
	}

}
