import { Component } from '@angular/core';
import { CustomerActionService } from './CustomerAction.service';

@Component({
  selector: 'customer-action',
  templateUrl: './CustomerAction.component.html',
  styleUrls: ['./CustomerAction.component.css']
})
export class CustomerActionComponent {
  searchByDetails:boolean; // NON SCANNING - DATA ENTRY SEARCH
  searchByID:boolean; // SCAN FOR ID // Loads by Default
  customerProfile:boolean; // CUSTOMER PROFILE VIEW
  backgroundCover:boolean;

  noCustomerIDFound:boolean; // WHEN NO CUSTOMER ID FOUND
  notRegisteredCustomer:boolean; // NO CUSTOMER FOUND WHEN SEARCH OPERATION IS DONE
  noResponse:boolean; //NO ID'S DETECTED
  loadingProgress:boolean; //LOADING PROGRESS SIGN

  customerNameValue:boolean; // CUSTOMER NAME 
  customerNameEditFields:boolean; // CUSTOMER NAME VALUE EDITOR FIELDS
  editCustomerNameIcon:boolean;saveCustomerNameIcon:boolean;cancelCustomerNameIcon:boolean;

  customerPContactValue:boolean; // CUSTOMER PRIMARY CONTACT
  customerPContactEditInput:boolean; // CUSTOMER PRIMARY CONTACT VALUE EDITOR
  editCustomerPContactIcon:boolean;saveCustomerPContactIcon:boolean;cancelCustomerPContactIcon:boolean;

  customerSContactValue:boolean; // CUSTOMER SECONDARY CONTACT
  customerSContactEditInput:boolean; // CUSTOMER SECONDARY CONTACT VALUE EDITOR
  editCustomerSContactIcon:boolean;saveCustomerSContactIcon:boolean;cancelCustomerSContactIcon:boolean;


  customerEmailValue:boolean; // CUSTOMER EMAIL VALUE
  customerEmailEditInput:boolean; // CUSTOMER EMAIL VALUE EDITOR
  editCustomerEmailIcon:boolean;saveCustomerEmailIcon:boolean;cancelCustomerEmailIcon:boolean;

  customerAddressValue:boolean; // CUSTOMER ADDRESS VALUE
  customerAddressEditInput:boolean; // CUSTOMER ADDRESS VALUE EDITOR
  editCustomerAddressIcon:boolean;saveCustomerAddressIcon:boolean;cancelCustomerAddressIcon:boolean;

  changeImageOption:boolean; // IMAGE CHANGE OPTION
  changeImageEditInput:boolean; // IMAGE URL INPUT
  saveImageLinkIcon:boolean;cancelImageLinkIcon:boolean;

  //SEARCH CUSTOMER BY DETAILS INPUT ERROR STATUSES
  fNameSearchError:boolean;contactSearchError:boolean;dateSearchError:boolean;

  showTransactions:boolean; // TOGGLE TRANSACTIONS
  QCCSection:boolean; // QCC TOGGLE
  deductQCC:boolean;
  addQCC:boolean;
  rechargeErrorMessage:boolean;
  pinErrorMessage:boolean;
  amountErrorMessage:boolean;
  wrongPinMessage:boolean;
  coinUpdateSuccessMessage:boolean;

  //FOR CUSTOMER EDIT SAVE
  custFNameEditValue:any;custLNameEditValue:any;custEmailEditValue:any;custPrContactEditValue:any;
  custSecContactEditValue:any;custAddressEditValue:any;custImageEditValue:any;

  customerFnameErrorMessage:boolean;
  customerLnameErrorMessage:boolean;
  customerPContactErrorMessage:boolean;
  customerMailErrorMessage:boolean;
  customerSContactErrorMessage:boolean;
  customerAddressErrorMessage:boolean;


  transactions: any;

  cPin: any;
  customer: any;
  customerfName: any;
  customerlName: any;
  customerDeposit: any;
  customerEarned: any;
  customerEmail: any;
  customerPNumber: any;
  customerSNumber: any;
  customerAddress: any
  amountStatus: any;
  pinStatus: any;
  today = new Date().toJSON().split('T')[0];
  
  fNameStatus: any;
  dobStatus: any;
  contactStatus: any;

  // CUSTOMER SEARCH FIELD VALUE SAVE
  fNameValue: any;dobValue: any;contactValue: any;
  
  cashAmount: any;
  startStatus: any;
  customerImage: any;

  EditfNameStatus: any;
  EditlNameStatus: any;
  qlezCoinUpdateType: any;

  constructor(private customerActionService: CustomerActionService) {
    this.searchByID=true;
    this.searchByDetails = this.customerProfile = this.loadingProgress = this.backgroundCover = false;
    this.noCustomerIDFound = this.notRegisteredCustomer =  this.noResponse =false;

    this.customerNameValue = this.customerNameEditFields = false;
    this.editCustomerNameIcon = this.saveCustomerNameIcon = this.cancelCustomerNameIcon = false;
    
    this.customerPContactValue = this.customerPContactEditInput = false;
    this.editCustomerPContactIcon = this.saveCustomerPContactIcon = this.cancelCustomerPContactIcon = false;

    this.customerSContactValue = this.customerSContactEditInput = false;
    this.editCustomerSContactIcon = this.saveCustomerSContactIcon = this.cancelCustomerSContactIcon = false;

    this.customerEmailValue = this.customerEmailEditInput = false;
    this.editCustomerEmailIcon = this.saveCustomerEmailIcon = this.cancelCustomerEmailIcon = false;
    
    this.customerAddressValue = this.customerAddressEditInput = false;
    this.editCustomerAddressIcon = this.saveCustomerAddressIcon = this.cancelCustomerAddressIcon = false;

    this.changeImageEditInput = this.changeImageOption =false;
    this.saveImageLinkIcon = this.cancelImageLinkIcon = false;

    this.fNameSearchError = this.contactSearchError = this.dateSearchError = false;

    this.showTransactions = this.QCCSection = this.coinUpdateSuccessMessage = false ;
    this.rechargeErrorMessage = this.pinErrorMessage = this.amountErrorMessage = this.wrongPinMessage =false;

    this.fNameStatus = false;
    this.EditfNameStatus = true;
    this.EditlNameStatus = true;
    this.dobStatus = false;
    this.contactStatus = false;
    this.customerfName = "Customer Name";
    this.cashAmount = 1;
    this.transactions = [{}];
    this.startStatus = false;

    this.amountStatus = false;
    this.pinStatus = false;
  }

  ngDoCheck() {
    if (this.customerActionService.checkCashUpdate() == true) {
      this.customerDeposit = this.customerActionService.getCustomerDepositBalance();
      this.customerActionService.setCashUpdate();
    }
  }

  
  // ------------------------- CUSTOMER ID SCAN FUNCTION STARTS -----------------------------------------------

  scanCustomerID() {
    this.loadingProgress =true;
    this.searchByDetails = this.searchByID = this.customerProfile = this.noCustomerIDFound = false;
    this.customerActionService.scanCustomerDt();
    this.setDetails()
  }
  
  // ------------------------- CUSTOMER ID SCAN FUNCTION ENDS -----------------------------------------------

  // ------------------------- SETTING CUSTOMER PROFILE VALUE STARTS -----------------------------------------------

  setDetails() {
    setTimeout(() => {
      this.loadingProgress =false;
      
      this.fNameValue = this.dobValue = this.contactValue = "";
      this.customer = this.customerActionService.getCustomer();
      console.log(this.customer);
      if (this.customer != undefined) {
        if (this.customer["success"] == true) {
          this.customerProfile = true;
          
          this.customerNameValue = this.editCustomerNameIcon = true;
          this.customerPContactValue = this.editCustomerPContactIcon = true;
          this.customerSContactValue = this.editCustomerSContactIcon = true;
          this.customerEmailValue = this.editCustomerEmailIcon = true;
          this.customerAddressValue = this.editCustomerAddressIcon = true;
          this.changeImageOption = true;

          console.log("customer found");
          this.noCustomerIDFound = this.notRegisteredCustomer =  this.noResponse =false;

          this.customerActionService.getCustomerTransactions();

          this.customerfName = this.customer["customer"]["fName"];
          this.customerlName = this.customer["customer"]["lName"];
          this.customerDeposit = Math.round(this.customer["customer"]["depositCoins"]);
          this.customerEarned = Math.round(this.customer["customer"]["earnedCoins"]);
          this.customerImage = this.customer["customer"]["imageUrl"];
          this.customerEmail = this.customer["customer"]["email"];
          this.customerPNumber = this.customer["customer"]["phone"];
          this.customerSNumber = this.customer["customer"]["secPhone"];
          this.customerAddress = this.customer["customer"]["cAdd"];
          
        }
        else {
          if (this.customer["statusReason"] == "Customer ID Not Registered") {
            
            console.log("NOT registered");
            this.notRegisteredCustomer = true;
            this.noCustomerIDFound = this.customerProfile =  this.noResponse =false;
  
          }
          else{
            console.log("No id read");
            this.noCustomerIDFound = true;
            this.notRegisteredCustomer = this.customerProfile =  this.noResponse =false;
          }
        }
      }
      else {
        this.noResponse = true;
        this.notRegisteredCustomer = this.customerProfile =  this.noCustomerIDFound =false;
      }
    }, 7000);
  }

  // ------------------------- SETTING CUSTOMER PROFILE VALUE ENDS -----------------------------------------------

  cancelProcess(){
    this.loadingProgress = this.backgroundCover = this.searchByDetails = this.customerProfile = this.noCustomerIDFound = this.notRegisteredCustomer = this.noResponse = false;
    this.searchByID = true;
  }

  searchByDetailSection(){
    this.loadingProgress = this.backgroundCover = this.searchByID = this.customerProfile = this.noCustomerIDFound = false;
    this.searchByDetails = true;
  }

  searchByIDSection(){
    this.loadingProgress = this.backgroundCover = this.searchByDetails = this.customerProfile = this.noCustomerIDFound = false;
    this.searchByID = true;
    this.fNameValue = this.dobValue = this.contactValue = "";
  }

  // ------------------------- CUSTOMER SEARCH INPUT VALIDATION STARTS -----------------------------------------------

  validateSearchFName(fName) {
    if (fName.value == "") {
      this.fNameSearchError =true;
      this.fNameStatus = false;
    }
    else {
      this.fNameSearchError= false;
      var array = fName.value.split(' '),
      firstName = array[0], Lastname = array[1], c = array[2];
      var letters = /^[a-zA-Z\s]*$/;
      if (fName.value.match(letters)) {
        this.fNameSearchError = false;
        this.fNameStatus = true;
        this.fNameValue = firstName.toUpperCase();
      }
      else {
        this.fNameSearchError = true;
      }
    }
    console.log(fName.value);
  }

  selectSearchFName() {
    this.fNameSearchError = false;
  }

  validateSearchContact(contact) {

    if (isNaN(contact.value)) {
      this.contactStatus = false;
      contact.style.border = "2px solid #FF9900";
      this.contactSearchError = true;
    }
    else {
      var contactN = parseInt(contact.value);
      if (contactN < 9999999999 && contactN.toString() != "" && contactN > 1000000000) {
        contact.style.border = "none";
        this.contactSearchError = false;
        this.contactStatus = true;
        this.contactValue = contact.value;
      }
      else{
        this.contactStatus = false;
        contact.style.border = "2px solid #FF9900";
        this.contactSearchError = true;
      }

    }

  }

  selectSearchPContact() {
    this.contactSearchError = false;
  }

  validateSearchDate(dob) {
    var m = dob.value.match(/(\d{4})-(\d{2})-(\d{2})/);
    var thisYear = new Date().getFullYear(); //YEAR NOW
    var maxYear = thisYear - 18; //MAX YEAR
    var minYear = 1960; //MIN YEAR
    // YEAR CHECK
    if (m != null) {
      if ((m[1].length < 4) || m[1] > maxYear || m[1] > thisYear) {
        this.dobStatus = false;
        this.dateSearchError = true;
      }
      else {
        if ((m[2].length < 2) || m[2] < 1 || m[2] > 12) {
          this.dobStatus = false;
          this.dateSearchError = true;
        }
        else {
          if ((m[3].length < 2) || m[3] < 1 || m[3] > 31) {
            this.dobStatus = false;
            this.dateSearchError = true;
          }
          else {
            if ((m[2] == 2) && (m[3] > 28)) {
              this.dobStatus = false;
              this.dateSearchError = true;
            }
            else {
              if ((m[1] < minYear)) {
                this.dobStatus = false;
                this.dateSearchError = true;
              }
              else {
                this.dobStatus = true;
                this.dobValue = dob.value;
                this.dateSearchError = false;
              }
            }
          }
        }
      }
    }
    else {
      this.dateSearchError = true;
    }
  }

  selectSearchDate() {
    this.dateSearchError = false;
  }

  // ------------------------- CUSTOMER SEARCH INPUT VALIDATION ENDS -----------------------------------------------

  // ------------------------- CUSTOMER SEARCH FUNCTION STARTS -----------------------------------------------

  searchCustomer(firstName, contact, dob) {
    if (this.fNameStatus = true && this.dobStatus == true && this.contactStatus == true) {
      this.validateSearchFName(firstName);
      this.validateSearchContact(contact);
      this.validateSearchDate(dob);
      this.loadingProgress =true;
      console.log(this.fNameValue);
      console.log(this.dobValue);
      console.log(this.contactValue);
      this.searchByDetails = this.searchByID = this.customerProfile = this.noCustomerIDFound = false;
      this.customerActionService.getCustomerByDetails(this.fNameValue, this.dobValue, this.contactValue);
      this.setDetails();
    }
    else {
      this.validateSearchContact(contact);
      this.validateSearchDate(dob);
      this.validateSearchFName(firstName);
    }
  }

  // ------------------------- CUSTOMER SEARCH FUNCTION ENDS -----------------------------------------------
  
  // ------------------------- CUSTOMER QCC OPTION STARTS -----------------------------------------------

  clearQlezCash(amountR, cPin) {
    this.rechargeErrorMessage =false;
    this.pinErrorMessage = false;
    this.wrongPinMessage = false;
    this.amountErrorMessage = false;
    this.coinUpdateSuccessMessage = false;
    
    amountR.value = "";
    cPin.value = "";
  }

  cancelQCCUpdate(){
    this.deductQCC = this.addQCC = false;
    this.QCCSection = this.showTransactions = false;
    this.customerProfile = true;
  }

  qlezCashOverlayMethod(option) {
    this.qlezCoinUpdateType = option;
    if(option=="reduce"){
      this.deductQCC = true;
      this.addQCC = false;
    }
    else{
      this.deductQCC = false;
      this.addQCC = true;
    }
    this.QCCSection = true;
    this.customerProfile = this.showTransactions = false;
  }

  validateCash(amount) {
    if (isNaN(amount.value)) {

      this.disableCoinUpdateButtons();
      this.amountStatus = false;
      this.rechargeErrorMessage = true;

    }
    var cashAmount = amount.value;
    if (cashAmount != "" && cashAmount > 0) {
      this.rechargeErrorMessage = false;
      this.cashAmount = cashAmount;
      this.amountStatus = true;
      if (this.pinStatus == true) {
        this.enableCoinUpdateButtons();
      }
      else {
        this.disableCoinUpdateButtons();
      }


    }
    else {
      this.disableCoinUpdateButtons();
      this.amountStatus = false;
      this.rechargeErrorMessage = true;
    }

  }

  disableCoinUpdateButtons() {
    if(this.deductQCC == true){
      document.getElementById("deductQCCAmt-option-tab").style.pointerEvents ="none";
    }
    if(this.addQCC == true){
      document.getElementById("addQCCAmt-option-tab").style.pointerEvents ="none";
    }
  }

  enableCoinUpdateButtons() {
    if(this.deductQCC == true){
      document.getElementById("deductQCCAmt-option-tab").style.pointerEvents ="auto";
    }
    if(this.addQCC == true){
      document.getElementById("addQCCAmt-option-tab").style.pointerEvents ="auto";
    }
  }

  validateCPin(pin) {
    if (isNaN(pin.value)) {
      this.disableCoinUpdateButtons();
      this.pinStatus = false;
      this.pinErrorMessage= true;
    }

    else {
      this.disableCoinUpdateButtons();
      this.pinStatus = false;
      this.pinErrorMessage = true;
      var cPin = pin.value;
      if (cPin != "") {
        this.pinErrorMessage = false;
        this.cPin =Number(cPin);
        this.pinStatus = true;
        if (this.amountStatus == true) {
          this.enableCoinUpdateButtons();
        }
        else {
          this.disableCoinUpdateButtons();
        }
      }
      else {
        this.disableCoinUpdateButtons();
        this.pinStatus = false;
        this.pinErrorMessage = true;
      }
    }

  }

  rechargeCash(amount, pin) {
    if (this.customer["customer"]["securePin"] == pin.value) {

      this.wrongPinMessage=false;
      var netBalance = parseInt(this.customer["customer"]["depositCoins"]) + parseInt(this.cashAmount);
      if (netBalance > 0) {
        this.disableCoinUpdateButtons();
        this.customer["customer"]["depositCoins"] = netBalance.toString();
        this.coinUpdateSuccessMessage = true;
        setTimeout(() => {
          this.coinUpdateSuccessMessage = false;
        }, 4000);
        this.customerDeposit = this.customer["customer"]["depositCoins"];
        this.customerActionService.updateCustomer(this.customer["customer"]);
        amount.value = "";
        pin.value = "";
      }
      else {
        this.validateCash(amount);
        this.validateCPin(pin);
        this.amountErrorMessage = true;
        setTimeout(() => {
          this.amountErrorMessage=false;
        }, 2000);
      }
    }
    else {
      this.validateCash(amount);
      this.validateCPin(pin);
      this.wrongPinMessage=true;
      setTimeout(() => {
        this.wrongPinMessage=false;
      }, 2000);
  
    }

  }

  withDrawCash(amount, pin) {
    if (this.customer["customer"]["securePin"] == pin.value) {
      this.wrongPinMessage=false;
      var netBalance = parseInt(this.customer["customer"]["depositCoins"]) - parseInt(this.cashAmount);
      if (netBalance > 0) {
        this.disableCoinUpdateButtons();
        this.customer["customer"]["depositCoins"] = netBalance.toString();
        this.coinUpdateSuccessMessage = true;
        setTimeout(() => {
          this.coinUpdateSuccessMessage = false;
          document.getElementById("qlezCashOverlay").style.height = "0%";
        }, 4000);
        this.customerDeposit = this.customer["customer"]["depositCoins"];
        this.customerActionService.updateCustomer(this.customer["customer"]);
        amount.value = "";
        pin.value = "";
      }
      else {
        this.validateCash(amount);
        this.validateCPin(pin);
        this.amountErrorMessage =true;
        setTimeout(() => {
          this.amountErrorMessage=false;
        }, 2000);
      }
    }
    else {
      this.validateCash(amount);
      this.validateCPin(pin);
      this.wrongPinMessage=true;
      setTimeout(() => {
        this.wrongPinMessage=false;
      }, 2000);
  
    }


  }

  // ------------------------- CUSTOMER QCC OPTION ENDS -----------------------------------------------

  // ------------------------- CUSTOMER NAME PROFILE EDIT FUNCTION STARTS -----------------------------------------------

  editCustomerName() {
    this.customerNameValue = false;
    this.editCustomerNameIcon = false;
    this.saveCustomerNameIcon =true;
    this.cancelCustomerNameIcon = true;
    this.customerNameEditFields = true;
  }

  validateEditFName(fName) {
    if (fName.value == "") {
      this.EditfNameStatus = false;
      this.customerFnameErrorMessage = true;
      fName.style.border = "3px solid red";
      document.getElementById("saveCustomerNameIcon").style.pointerEvents = "none";
    }
    else {
      this.EditfNameStatus = true;
      fName.style.border = "none";
      this.customerFnameErrorMessage = false;
      this.custFNameEditValue = fName.value.toUpperCase();
      if (this.EditlNameStatus == true) {
        document.getElementById("saveCustomerNameIcon").style.pointerEvents = "auto";
      }
    }
  }

  validateEditLName(lName) {
    if (lName.value == "") {
      this.EditfNameStatus = false;
      this.customerLnameErrorMessage =true;
      lName.style.border = "3px solid red";
      //saveIcon.style.pointerEvents = "none";
    }
    else {
      this.EditfNameStatus = true;
      lName.style.border = "none";
      this.customerLnameErrorMessage =false;
      this.custLNameEditValue = lName.value.toUpperCase();
      if (this.EditlNameStatus == true) {
        //saveIcon.style.pointerEvents = "auto";
      }
    }
  }

  saveCustomerNameFunction() {
    var status = false;
    console.log("fname");
    console.log(this.custFNameEditValue);
    console.log("lname");
    console.log(this.custLNameEditValue);
    if (this.customer["customer"]["fName"] != this.custFNameEditValue && this.custFNameEditValue != ""  && this.custFNameEditValue != undefined){
      this.customerfName = this.customer["customer"]["fName"] = this.custFNameEditValue;
      status=true;
    } 
    if(this.customer["customer"]["lName"] != this.custLNameEditValue  && this.custLNameEditValue != "" && this.custLNameEditValue != undefined) {      
      this.customerlName = this.customer["customer"]["lName"] = this.custLNameEditValue;
      status=true;
    }
    if(status==true){
      this.customerActionService.updateCustomer(this.customer["customer"]);
      this.cancelCustomerNameFunction();
    }
  }

  cancelCustomerNameFunction() {
    this.editCustomerNameIcon = true;
    this.saveCustomerNameIcon = false;
    this.cancelCustomerNameIcon = false;
    this.customerNameValue =true;
    this.customerNameEditFields = false;
    this.custFNameEditValue = this.custLNameEditValue = "";
  }

  // ------------------------- CUSTOMER NAME PROFILE EDIT FUNCTION ENDS -----------------------------------------------

  // ------------------------- CUSTOMER PRIMARY CONTACT PROFILE EDIT FUNCTION STARTS -----------------------------------------------

  editCustomerPContact() {
    this.customerPContactValue =false;
    this.customerPContactEditInput = true;
    this.editCustomerPContactIcon =false;
    this.saveCustomerPContactIcon = true;
    this.cancelCustomerPContactIcon = true;
  }

  validatePContact(pContact) {
    var contactN = parseInt(pContact.value);
    if (contactN < 9999999999 && contactN.toString() != "" && contactN > 1000000000) {
      pContact.style.border = "none";
      this.customerPContactErrorMessage = false;
      this.custPrContactEditValue = pContact.value;
      document.getElementById("saveCustomerPContactIcon").style.pointerEvents = "auto";
    }
    else {
      pContact.style.border = "3px solid red";
      this.customerPContactErrorMessage = true;
      document.getElementById("saveCustomerPContactIcon").style.pointerEvents = "none";
    }
  }

  saveCustomerPContactFunction() {
    console.log("nadanilaa");
    if (this.customer["customer"]["phone"] != this.custPrContactEditValue) {
      this.customerPNumber = this.customer["customer"]["phone"] = this.custPrContactEditValue;
      this.customerActionService.updateCustomer(this.customer["customer"]);
      this.cancelCustomerPContactFunction();
    }
  }

  cancelCustomerPContactFunction() {
    this.customerPContactValue = true;
    this.customerPContactEditInput = false;
    this.editCustomerPContactIcon = true;
    this.saveCustomerPContactIcon = false;
    this.cancelCustomerPContactIcon = false;
    this.custPrContactEditValue = "";
  }

// ------------------------- CUSTOMER PRIMARY CONTACT PROFILE EDIT FUNCTION ENDS -----------------------------------------------

// ------------------------- CUSTOMER EMAIL PROFILE EDIT FUNCTION STARTS -----------------------------------------------

  editCustomerEmail() {
    this.editCustomerEmailIcon = false;
    this.saveCustomerEmailIcon = true;
    this.cancelCustomerEmailIcon = true;
    this.customerEmailValue = false;
    this.customerEmailEditInput = true;
  }

  validateEmail(email) {
    var emailA = email.value;
    if (emailA != "") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailA)) {
        email.style.border = "none";
        this.customerMailErrorMessage = false;
        this.custEmailEditValue = email.value;
        document.getElementById("saveCustomerEmailIcon").style.pointerEvents = "auto";
      }
      else {
        document.getElementById("saveCustomerEmailIcon").style.pointerEvents = "none";
        email.style.border = "3px solid red";
        this.customerMailErrorMessage = true;
      }
    }
    else {
      this.customerMailErrorMessage = true;
      email.style.border = "3px solid red";
      document.getElementById("saveCustomerEmailIcon").style.pointerEvents = "none";
    }
  }

  saveCustomerEmailFunction() {
    if (this.customer["customer"]["email"] != this.custEmailEditValue) {
      this.customerEmail = this.customer["customer"]["email"] = this.custEmailEditValue;
      this.customerActionService.updateCustomer(this.customer["customer"]);
      this.cancelCustomerEmailFunction();
    }
  }

  cancelCustomerEmailFunction() {
    this.customerEmailValue = true;
    this.editCustomerEmailIcon = true;
    this.saveCustomerEmailIcon = false;
    this.cancelCustomerEmailIcon = false;
    this.customerEmailEditInput = false;
    this.custEmailEditValue = "";
  }

  // ------------------------- CUSTOMER EMAIL PROFILE EDIT FUNCTION ENDS -----------------------------------------------

  // ------------------------- CUSTOMER SECONDARY CONTACT PROFILE EDIT FUNCTION STARTS -----------------------------------------------

  editCustomerSContact() {
    this.customerSContactValue = false;
    this.customerSContactEditInput = true;
    this.editCustomerSContactIcon = false;
    this.saveCustomerSContactIcon = true;
    this.cancelCustomerSContactIcon =  true;
  }

  validateSContact(sContact) {
    var contactN = parseInt(sContact.value);
    if (contactN < 9999999999 && contactN.toString() != "" && contactN > 1000000000) {
      sContact.style.border = "none";
      this.customerSContactErrorMessage = false;
      this.custSecContactEditValue = sContact.value;
      document.getElementById("saveCustomerSContactIcon").style.pointerEvents = "auto";
    }
    else {
      sContact.style.border = "3px solid red";
      this.customerSContactErrorMessage = true;
      document.getElementById("saveCustomerSContactIcon").style.pointerEvents = "none";
    }
  }

  saveCustomerSContactFunction() {
    if (this.customer["customer"]["secPhone"] != this.custSecContactEditValue) {
      this.customerSNumber = this.customer["customer"]["secPhone"] = this.custSecContactEditValue;
      this.customerActionService.updateCustomer(this.customer["customer"]);
      this.cancelCustomerSContactFunction();
    }
  }

  cancelCustomerSContactFunction() {
    this.customerSContactValue = true;
    this.customerSContactEditInput = false;
    this.editCustomerSContactIcon = true;
    this.saveCustomerSContactIcon = false;
    this.cancelCustomerSContactIcon =  false;
    this.custSecContactEditValue = "";
  }

  // ------------------------- CUSTOMER SECONDARY CONTACT PROFILE EDIT FUNCTION ENDS -----------------------------------------------

  // ------------------------- CUSTOMER ADDRESS PROFILE EDIT FUNCTION STARTS -----------------------------------------------

  editCustomerAddress() {
    this.customerAddressValue = false;
    this.customerAddressEditInput = true;
    this.editCustomerAddressIcon = false;
    this.saveCustomerAddressIcon = true;
    this.cancelCustomerAddressIcon = true;
  }

  validateAddress(address) {
    if (address.value == "") {
      address.style.border = "3px solid red";
      this.customerAddressErrorMessage = true;
      document.getElementById("saveCustomerAddressIcon").style.pointerEvents = "none";
    }
    else {
      this.EditlNameStatus = true;
      this.custAddressEditValue = address.value;
      address.style.border = "none";
      this.customerAddressErrorMessage = false;
      document.getElementById("saveCustomerAddressIcon").style.pointerEvents = "auto";
    }
  }

  saveCustomerAddressFunction() {
    if (this.customer["customer"]["cAdd"] != this.custAddressEditValue) {
      this.customerAddress = this.customer["customer"]["cAdd"] = this.custAddressEditValue;
      this.customerActionService.updateCustomer(this.customer["customer"]);
      this.cancelCustomerAddressFunction();
    }
  }

  cancelCustomerAddressFunction() {
    this.customerAddressValue = true;
    this.customerAddressEditInput = false;
    this.editCustomerAddressIcon = true;
    this.saveCustomerAddressIcon = false;
    this.cancelCustomerAddressIcon = false;
    this.custAddressEditValue = "";
  }

  // ------------------------- CUSTOMER ADDRESS PROFILE EDIT FUNCTION ENDS -----------------------------------------------

  // ------------------------- CUSTOMER IMAGE URL PROFILE EDIT FUNCTION STARTS -----------------------------------------------

  changeImage() {
    this.changeImageOption = false;
    this.changeImageEditInput = true;
    this.saveImageLinkIcon = true;
    this.cancelImageLinkIcon = true;
  }

  validateImage(url) {
    if (url.value.match(/\.(jpeg|jpg|gif|png)$/) == null) {
      url.style.border = "3px solid red";
      document.getElementById("saveImageLinkIcon").style.pointerEvents = "none";
    }
    else {
      url.style.border = "none";
      this.custImageEditValue = url.value;
      document.getElementById("saveImageLinkIcon").style.pointerEvents = "auto";
    }
  }

  saveCustomerImageFunction(imageUrl) {
    imageUrl.style.display = "none";
    this.cancelCustomerImageFunction();
    if (this.customer["customer"]["imageUrl"] != imageUrl.value) {
      this.customerImage = this.customer["customer"]["imageUrl"] = imageUrl.value;
      this.customerActionService.updateCustomer(this.customer["customer"]);
    }
  }

  cancelCustomerImageFunction() {
    this.changeImageOption = true;
    this.changeImageEditInput = false;
    this.saveImageLinkIcon = false;
    this.cancelImageLinkIcon = false;
    this.custImageEditValue = "";
  }

  // ------------------------- CUSTOMER IMAGE URL PROFILE EDIT FUNCTION ENDS -----------------------------------------------

  viewTransactions() {
    this.showTransactions = true;
    this.customerProfile =false;
    var response = this.customerActionService.getCustomerTransactionsValues();
    console.log(response);
    this.transactions = response["transactionList"];
  }

  hideTransaction(){
    this.customerProfile =true;
    this.showTransactions = false;
  }

}
