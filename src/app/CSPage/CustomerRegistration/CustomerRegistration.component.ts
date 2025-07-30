import { Component } from '@angular/core';
import { CustomerRegistrationService } from './CustomerRegistration.service';


@Component({
	selector: 'customer-register',
	templateUrl: './CustomerRegistration.component.html',
	styleUrls: ['./CustomerRegistration.component.css']
})

export class CustomerRegistrationComponent {

	informationMessage:boolean; // Information for USER 
	loadingProgress:boolean; 	// Loading Sign
	backgroundCover:boolean; 	// Background Setting
	noResponseError:boolean; 	// When no response from Hardware 

	// SETTING VALUES GLOBALLY
	fname:any;
	lname:any;
	cdob:any;
	gender:any;
	pcontact:any;
	scontact:any;
	caddress:any;
	mail:any;
	link:any;

	// SETTING ELEMENTS GLOBALLY
	eleFname:any;
	eleLname:any;
	eleDOB:any;
	eleGender:any;
	elePContact:any;
	eleSContact:any;
	eleCAddress:any;
	eleCMail:any;
	eleCLink:any;
	
	fNameStatus: boolean; lNameStatus: boolean; dateStatus: boolean; genderStatus: boolean;
	pContactStatus: boolean; sContactStatus: boolean; emailStatus: boolean;
	today = new Date().toJSON().split('T')[0];
	registerStatus: any; customerGender: string; countryCode: any;

	pContactCountError: boolean; pContactError: boolean; sContactError: boolean; sContactCountError: boolean;
	fNameError: boolean; validatefNameError: boolean; lNameError: boolean; validatelNameError: boolean;
	dateError: boolean; emailError: boolean; genderError: boolean; imageError: boolean;

	guestFound: boolean; customerAddSuccess: boolean; noCustomerIDFound: boolean; existingTagError: boolean;
	noIDFound: boolean; customerAlreadyRegistered: boolean;


	constructor(private customerRegService: CustomerRegistrationService) {

		//this.countryCode=["880","32","226","359","387","+1-246","681","590","+1-441","673","591","973","257","229","975","+1-876","267","685","599","55","+1-242","+44-1534","375","501","7","250","381","670","262","993","992","40","690","245","+1-671","502","30","240","590","81","592","+44-1481","594","995","+1-473","44","241","503", "GN": "224", "GM": "220", "GL": "299", "GI": "350", "GH": "233", "OM": "968", "TN": "216", "JO": "962", "HR": "385", "HT": "509", "HU": "36", "HK": "852", "HN": "504", "HM": " ", "VE": "58", "PR": "+1-787 and 1-939", "PS": "970", "PW": "680", "PT": "351", "SJ": "47", "PY": "595", "IQ": "964", "PA": "507", "PF": "689", "PG": "675", "PE": "51", "PK": "92", "PH": "63", "PN": "870", "PL": "48", "PM": "508", "ZM": "260", "EH": "212", "EE": "372", "EG": "20", "ZA": "27", "EC": "593", "IT": "39", "VN": "84", "SB": "677", "ET": "251", "SO": "252", "ZW": "263", "SA": "966", "ES": "34", "ER": "291", "ME": "382", "MD": "373", "MG": "261", "MF": "590", "MA": "212", "MC": "377", "UZ": "998", "MM": "95", "ML": "223", "MO": "853", "MN": "976", "MH": "692", "MK": "389", "MU": "230", "MT": "356", "MW": "265", "MV": "960", "MQ": "596", "MP": "+1-670", "MS": "+1-664", "MR": "222", "IM": "+44-1624", "UG": "256", "TZ": "255", "MY": "60", "MX": "52", "IL": "972", "FR": "33", "IO": "246", "SH": "290", "FI": "358", "FJ": "679", "FK": "500", "FM": "691", "FO": "298", "NI": "505", "NL": "31", "NO": "47", "NA": "264", "VU": "678", "NC": "687", "NE": "227", "NF": "672", "NG": "234", "NZ": "64", "NP": "977", "NR": "674", "NU": "683", "CK": "682", "XK": "", "CI": "225", "CH": "41", "CO": "57", "CN": "86", "CM": "237", "CL": "56", "CC": "61", "CA": "1", "CG": "242", "CF": "236", "CD": "243", "CZ": "420", "CY": "357", "CX": "61", "CR": "506", "CW": "599", "CV": "238", "CU": "53", "SZ": "268", "SY": "963", "SX": "599", "KG": "996", "KE": "254", "SS": "211", "SR": "597", "KI": "686", "KH": "855", "KN": "+1-869", "KM": "269", "ST": "239", "SK": "421", "KR": "82", "SI": "386", "KP": "850", "KW": "965", "SN": "221", "SM": "378", "SL": "232", "SC": "248", "KZ": "7", "KY": "+1-345", "SG": "65", "SE": "46", "SD": "249", "DO": "+1-809 and 1-829", "DM": "+1-767", "DJ": "253", "DK": "45", "VG": "+1-284", "DE": "49", "YE": "967", "DZ": "213", "US": "1", "UY": "598", "YT": "262", "UM": "1", "LB": "961", "LC": "+1-758", "LA": "856", "TV": "688", "TW": "886", "TT": "+1-868", "TR": "90", "LK": "94", "LI": "423", "LV": "371", "TO": "676", "LT": "370", "LU": "352", "LR": "231", "LS": "266", "TH": "66", "TF": "", "TG": "228", "TD": "235", "TC": "+1-649", "LY": "218", "VA": "379", "VC": "+1-784", "AE": "971", "AD": "376", "AG": "+1-268", "AF": "93","+1-264","+1-340","354","98","374","355","244","+1-684","54","61","43","297","91","+358-18","994","353","62","380","974","258"]
		this.initialize();
	}

	initialize() {
		this.fNameStatus = this.lNameStatus = this.dateStatus = this.genderStatus = this.pContactStatus = false;
		this.sContactStatus = this.emailStatus = this.pContactCountError = this.pContactError = false;
		this.sContactCountError = this.sContactError = this.validatefNameError = this.fNameError = false;
		this.validatelNameError = this.lNameError = this.dateError = this.imageError = this.emailError = false;
		this.guestFound  = this.customerAddSuccess = this.noIDFound = this.customerAlreadyRegistered = this.genderError = this.noCustomerIDFound =  false;
		this.noResponseError = this.existingTagError = this.informationMessage = this.backgroundCover = this.loadingProgress = false;
	}

	/*	
	ngAfterViewInit() {
	
		this.fNameStatus = false;
		this.lNameStatus = false;
		this.dateStatus = false;
		this.genderStatus = false;
		this.pContactStatus = false;
		this.sContactStatus = false;
		this.emailStatus = false;
		this.registerStatus = false;
	
	}
	*/

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

	selectFName() {
		this.fNameError = false;
		this.validatefNameError = false;
	}

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

	selectLName() {
		this.lNameError = false;
		this.validatelNameError = false;
	}

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

	selectDate() {
		this.dateError = true;
	}

	validateGender(gender) {
		this.customerGender = gender;
		if (this.customerGender != "") {
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

	selectGender() {
		this.genderError = false;
	}

	selectPContact() {
		this.pContactCountError = false;
		this.pContactStatus = false;
	}

	isNumber(number) {
		if (isNaN(number.value)) {
			if (number.id == "primaryContact") {
				this.pContactStatus = false;
				this.pContactError = true;
				this.pContactCountError = false;
			}
			else {
				this.sContactStatus = false;
				this.sContactError = true;
				this.sContactCountError = false;
			}
		}
		else {
			var contactN = parseInt(number.value);
			if (contactN < 9999999999 && contactN.toString() != "" && contactN > 1000000000) {
				if (number.id == "primaryContact") {
					this.pContactCountError = false;
					this.pContactStatus = true;
				}
				else {
					this.sContactCountError = false;
					this.sContactStatus = true;
				}
			}
			else {
				if (number.id == "primaryContact") {
					this.pContactCountError = true;
					this.pContactError = false;
					this.pContactStatus = false;
					if (isNaN(contactN)) {
						this.pContactCountError = false;
					}
				}
				else {
					this.sContactCountError = true;
					this.sContactError = false;
					this.sContactStatus = false;
					if (isNaN(contactN)) {
						this.sContactCountError = false;
					}
				}
			}
		}
	}

	selectSContact() {
		this.sContactError = false;
		this.sContactCountError = false;
	}

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

	selectEmail() {
		this.emailError = false;
	}

	verifyAddress(address) { }

	verifyImageLink(link) {
		if (link.value.match(/\.(jpeg|jpg|gif|png)$/) == null) {
			this.imageError = true;
		}
		else {
			this.imageError = false;
		}
	}

	selectImageLink() {
		this.imageError = false;
	}

	registerCustomer(fName, lName, dob, pContact, sContact, address, email, imageLink) {
		console.log("Register");
		// this.customerAddSuccess = false;
		// this.guestFound = false;
		this.validateFName(fName);
		this.validateLName(lName);
		this.validateDate(dob);
		this.isNumber(pContact);
		this.isNumber(sContact);
		if (pContact.value == "") {
			this.pContactError = true;
		}
		if (sContact.value == "") {
			this.sContactError = true;
		}
		this.verifyAddress(address);
		this.verifyEmail(email);

		console.log("customer gender");
		console.log(this.customerGender);
		if (this.customerGender == undefined) {
			this.genderError = true;
			this.genderStatus = false;
		}
		else{
			this.validateGender(this.customerGender);
		}

		this.fname = fName.value;
		this.lname = lName.value;
		this.cdob = dob.value;
		this.gender = this.customerGender;
		this.pcontact = pContact.value;
		this.scontact = sContact.value;
		this.caddress = address.value;
		this.mail = email.value;
		this.link = imageLink.value;

		if (this.caddress == "") {
			this.caddress = "No Address Provided";
		}
		if (this.link == "") {
			this.link = "https://s3.ap-south-1.amazonaws.com/popees-data-bucket/images/user.png";
		}

		this.eleFname=fName;
		this.eleLname=lName;
		this.eleDOB=dob;
		this.elePContact=pContact;
		this.eleSContact=sContact;
		this.eleCAddress=address;
		this.eleCMail=email;
		this.eleCLink=imageLink;

		if (this.fNameStatus == true && this.lNameStatus == true && this.dateStatus == true && this.genderStatus == true && this.pContactStatus == true && this.emailStatus == true) {
			this.backgroundCover = true;
			this.informationMessage = true;
		}
		else{
			console.log("statuses");
			console.log(this.fNameStatus);
			console.log(this.lNameStatus);
			console.log(this.dateStatus);
			console.log(this.genderStatus);
			console.log(this.pContactStatus);
			console.log(this.sContactStatus);
			console.log(this.emailStatus);
		}
	}

	confirmRead() {
		this.loadingProgress = true;
		this.informationMessage = false;
		this.existingTagError = false;
		this.customerRegService.registerCustomer(this.fname,this.lname, this.cdob, this.gender, this.pcontact, this.scontact, this.caddress, this.mail, this.link);
		
		setTimeout(() => {
			this.registerStatus = this.customerRegService.getRegistrationStatus();
			
			this.loadingProgress =false;
				
			console.log("customer addition status");
			console.log(this.registerStatus);
			if (this.registerStatus != undefined) {
				if (this.registerStatus.success == true) {
					console.log("success=true");
					if (this.registerStatus.statusReason == "Guest Found") {
						this.guestFound = true;
						this.customerAddSuccess = false;
					}
					else if (this.registerStatus.statusReason == "Successfully Added"){
						this.customerAddSuccess = true;
						this.guestFound = false;
					}
					// this.resetAll(this.eleFname, this.eleLname, this.eleDOB, this.elePContact, this.eleSContact, this.eleCAddress, this.eleCMail, this.eleCLink);					
				}
				else {
					console.log("sdasdasdasdasdasdsadasd");
					console.log(this.registerStatus.statusReason);
					if (this.registerStatus.statusReason == "NO Customer Tag Found") {
						this.noCustomerIDFound = true;
					}
					else if (this.registerStatus.statusReason == "No Tags Found") {
						this.noIDFound = true;
					}
					else if (this.registerStatus.statusReason == "ID has been Already Registered with a Customer") {
						this.existingTagError = true;
					}
					else if (this.registerStatus.statusReason == "Customer Already registered") {
						this.customerAlreadyRegistered = true;
					}
					else{
						this.noResponseError = true;
					}
				}
			}
			else {
				this.noIDFound = true;
			
			}
		},5000);
	}

	resetAll(firstName, lastName, dob, primaryContact, secondaryContact, contactAddress, emailAddress, imageLink) {
		firstName.value = "";
		lastName.value = "";
		dob.value = "";
		primaryContact.value = "";
		secondaryContact.value = "";
		contactAddress.value = "";
		emailAddress.value = "";
		imageLink.value = "";
		document.getElementById("genderMale").style.background = "#fff";
		document.getElementById("genderFemale").style.background = "#fff";
		document.getElementById("genderMale").style.color = "#000";
		document.getElementById("genderFemale").style.color = "#000";
		this.customerGender="";
		this.initialize();
	}

	cancelRegister(){
		this.initialize();
	}

	completedProcess(){
		this.resetAll(this.eleFname,this.eleLname,this.eleDOB,this.elePContact,this.eleSContact,this.eleCAddress,this.eleCMail,this.eleCLink);
	}
}
