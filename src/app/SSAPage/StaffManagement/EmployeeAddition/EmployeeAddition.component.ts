import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { EmployeeAdditionService } from './EmployeeAddition.service';

@Component({
	selector: 'employee-addition',
	templateUrl: './EmployeeAddition.component.html',
	styleUrls: ['./EmployeeAddition.component.css']
})

export class EmployeeAdditionComponent {
	backgroundCover:boolean;
	loadingProgress:boolean;
	noResponseError:boolean;
	employeeAddSuccess:boolean;
	staffAlreadyRegistered:boolean;

	fNameError:boolean;
	validatefNameError:boolean;
	lNameError:boolean;
	validatelNameError:boolean;
	dateError:boolean;
	genderError:boolean;
	emailError:boolean;
	contactError:boolean;
	contactCountError:boolean;
	uidError:boolean;
	uidCountError:boolean;
	roleErrorMessage:boolean;
	employeeTypeErrorMessage:boolean;
	addressErrorMessage:boolean;

	empLoader: boolean;
	genderValue: any;
	registerStatus: any;
	fNameStatus: boolean;
	lNameStatus: boolean;
	dateStatus: boolean;
	contactStatus: boolean;
	uIDStatus: boolean;
	addressStatus: boolean;
	emailStatus: boolean;
	genderStatus: boolean;
	roleStatus: boolean;
	typeStatus: boolean;
	gender:boolean;
	
	today = new Date().toJSON().split('T')[0];
	
	constructor(private employeeAdditionService: EmployeeAdditionService) {}
	
	validateFName(fName) {
	
		if (fName.value == "") {
			this.fNameError = true;
			this.fNameStatus = false;
			this.validatefNameError = false;
		}
		else {
			var letters = /^[A-Za-z]+$/;
			if (fName.value.match(letters)) {
				this.validatefNameError = false;
				this.fNameStatus = true;
			}
			else {
				this.validatefNameError = true;
				this.fNameError = false;
				this.fNameStatus = false;
			}
		}
		
	}

	selectFName() {	this.fNameError = this.validatefNameError = false; }

	validateLName(lName) {
		if (lName.value == "") {
			this.lNameError = true;
			this.validatelNameError = false;
		}
		else {
			var letters = /^[A-Za-z]+$/;
			if (lName.value.match(letters)) {
				this.validatelNameError = false;
				this.lNameError = false;
				this.lNameStatus = true;
			}
			else {
				this.lNameError = false;
				this.validatelNameError = true;
			}
		}
	}

	selectLName() {	this.lNameError = this.validatelNameError = false; }
	
	validateGender(gender) {
		this.genderValue = gender;

		if (this.genderValue != "") {
			if (gender == 'Female') {
				document.getElementById("genderFemale").style.background = "#105480";
				document.getElementById("genderMale").style.background = "#fff";
				document.getElementById("genderFemale").style.color = "#fff";
				document.getElementById("genderMale").style.color = "#000";
			}
			else {
				document.getElementById("genderMale").style.background = "#105480";
				document.getElementById("genderFemale").style.background = "#fff";
				document.getElementById("genderMale").style.color = "#fff";
				document.getElementById("genderFemale").style.color = "#000";
			}
			this.genderStatus = true;
		}
		else {
			this.genderError = true;
		}
	}

	selectGender() {	this.genderError = false;	}

	
	validateDate(dob) {
		var m = dob.value.match(/(\d{4})-(\d{2})-(\d{2})/);
		var thisYear = new Date().getFullYear(); //YEAR NOW
		var maxYear = 2017 - 15; //MAX YEAR
		var minYear = 1960; //MIN YEAR
		// YEAR CHECK
		if (m != null) {
			if ((m[1].length < 4) || m[1] > maxYear || m[1] > thisYear) {
				this.dateError = true;
			}
			else {
				if ((m[2].length < 2) || m[2] < 1 || m[2] > 12) {
					this.dateError = true;
				}
				else {
					if ((m[3].length < 2) || m[3] < 1 || m[3] > 31) {
						this.dateError = true;
					}
					else {
						if ((m[2] == 2) && (m[3] > 28)) {
							this.dateError = true;
						}
						else {
							if ((m[1] < minYear)) {
								this.dateError = true;
							}
							else {
								this.dateStatus = true;
								this.dateError = false;
							}
						}
					}
				}
			}
		}
		else {
			this.dateError = true;
		}
	}

	selectDate() {	this.dateError = true; }
	
	verifyEmail(email) {
		var emailA = email.value;
		if (emailA != "") {
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailA)) {
				this.emailError = false;
				this.emailStatus = true;
			}
			else {
				this.emailError = true;
			}
		}
		else {
			this.emailError = true;
		}
	}

	selectEmail() {	this.emailError = false; }

	isNumber(number) {
		if (isNaN(number.value)) {
			if (number.id == "employeeContact") {
				this.contactStatus = this.contactCountError = false;
				this.contactError = true;
			}
			else {
				this.uidCountError = this.uIDStatus = false;
				this.uidError = true;
			}
		}
		else {
			var tempN = parseInt(number.value);
			if (number.id == "employeeContact") {
				if (tempN < 9999999999 && tempN.toString() != "" && tempN > 1000000000) {
					this.contactCountError = false;
					this.contactStatus = true;
				}
				else{
					this.contactCountError = true;
					this.contactError = this.contactStatus = false;
					if (isNaN(tempN)) {
						this.contactCountError = false;
					}
				}
				
			}
			else {
				if (tempN < 999999999999 && tempN.toString() != "" && tempN > 100000000000) {
					this.uidCountError = false;
					this.uIDStatus = true;
				}
				else{
					this.uidCountError = true;
					this.uidError = this.uIDStatus = false;
					if (isNaN(tempN)) {
						this.uidCountError = false;
					}
				}
			}
		}
	}

	selectUID() { this.uidError = this.uidCountError = false; }

	selectPContact() {	this.contactCountError = this.contactStatus = false;	}

	verifyAddress(address) {
		if (address.value == "") {
			this.addressErrorMessage = true;
		}
		else {
			this.addressErrorMessage = false;
			this.addressStatus = true;
		}
	}

	selectedRole(role) { this.roleStatus = true;this.roleErrorMessage = false;	}

	validateEmployeeType(type) { this.typeStatus = true;this.employeeTypeErrorMessage = false;	}

	clearAll(employeeFName,employeeLName,employeeType,dob,employeeContact,employeeRole,contactAddress,emailAddress,employeePAN,employeeUID,DRole,DEType) {
		employeeFName.value = employeeLName.value = dob.value = employeeContact.value = "";
		contactAddress.value = emailAddress.value = employeePAN.value = employeeUID.value = "";
		employeeType.value = DEType.value;
		employeeRole.value = DRole.value;
		this.fNameStatus = this.lNameStatus = this.dateStatus = this.contactStatus = false;
		this.uIDStatus = this.addressStatus = this.emailStatus = false;
		this.genderStatus = this.roleStatus = this.typeStatus = false;
	}

	registerCustomer(employeeFName, employeeLName, employeeType, dob, employeeContact, employeeRole, contactAddress, emailAddress, employeePAN, employeeUID) {
		
		var fName = employeeFName.value;
		var lName = employeeLName.value;
		var type = employeeType.value;
		var dob = dob.value;
		var contact = employeeContact.value;
		var role = employeeRole.value;
		var address = contactAddress.value;
		var email = emailAddress.value;
		var pan = employeePAN.value;
		var uid = employeeUID.value;
		var id = fName.substring(0,4) + dob.substring(0,4);
		
		if(pan == ""){
			pan = "NO PAN-CARD";
		}

		if (this.typeStatus == true && this.fNameStatus == true && this.lNameStatus == true && this.dateStatus == true && this.uIDStatus == true && this.contactStatus == true && this.addressStatus == true && this.emailStatus == true && this.roleStatus == true) {
			this.backgroundCover = this.loadingProgress = true;
			this.employeeAdditionService.registerEmployee(id, fName, lName, type, dob, contact, role, address, email, pan, uid, this.genderValue);
			console.log("all ok");
			setTimeout(() => {
				this.registerStatus = this.employeeAdditionService.getRegistrationStatus();
				this.loadingProgress = false;
				if (this.registerStatus == true) {
					this.employeeAddSuccess = true;
					this.noResponseError = false;
				}
				else {
					this.employeeAddSuccess = false;
					this.noResponseError = true;
				}
			}, 4000);

		}
		else {
			if (!this.fNameStatus) {	this.fNameError =true	}
			if (!this.genderStatus) {	this.genderError = true;	}
			if (!this.typeStatus) {	  this.employeeTypeErrorMessage = true;	}
			if (!this.lNameStatus) {  this.lNameError = true;	}
			if (!this.dateStatus) {  this.dateError = true;  }
			if (!this.uIDStatus) {	this.uidError = true;	}
			if (!this.contactStatus) {	this.contactError = true;	}
			if (!this.addressStatus) {	this.addressErrorMessage = true;	}
			if (!this.emailStatus) {   this.emailError = true;	}
			if (!this.roleStatus) {	 this.roleErrorMessage = true;	}
		}
	}

	completedProcess(){  this.backgroundCover = this. employeeAddSuccess = false;  }

	editRegister(){  this.backgroundCover = this. noResponseError = false;  }

}
