import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { map } from 'rxjs/operators';

@Injectable()
export class AppMainService {
  paymentStatusDt: any;
  invoiceID: any;
  paymentResultStatus: any;
  EDCpaymentStatus: boolean;
  responseEDCArray: any;

  CustomerType: any;

  MFdt: any; USdt: any; MVCdt: any; MVCdtInit: any; FSPdtInit: any; FSPdt: any;
  customTransactionsdt: any; weeklyTransactionsdt: any; monthlyTransactionsdt: any;
  dailyTransactionsdt: any; tempTransactionArray: any; Transactionsdt: any;

  loginStatus: any; loginType: any; loginUsingKeyStatus: any; resetEmailAddress: any; customerAdditionStatus: any;
  employeeRegisterStatus: any; productAdditionStatus: any; itemAdditionStatus: any; savePasswordStatus: any;
  customerUpdationStatus: any; saleUpdationStatus: any; POSCustomer: any;

  offerSaveStatus: boolean; itemSaveStatus: any; offerUpdateStatus: any; offerChangedStatus: any; defectiveProductSaveStatus: any;

  adminScannedProductDt: any; customerDetails: any; loggedID: any; itemDetails: any; productDetails: any;
  itemSearchResult: any; currentPageHeading: any; guestDetails: any; defectiveProducts: any;
  allEmployeeDetails: any; allItemCodeList: any; POSCustomerTransaction: any; POSids: any; paymentStatus: any;

  scannedProductDt: any; customerTransactions: any; selectedItemForEdit: any; billItems: any;
  allOffers: any; passwordChangeStatus: boolean; returnCashUpdate: boolean; customerdepositBalance: any;
  totalBillDiscount: any; paymentID: any; obsoleteProducts: any; sessionID: any; customerSessionID: any;

  constructor(private mockHttp: Http, private serviceHttp: Http) {

    this.loginStatus = this.loginUsingKeyStatus = false;
    this.customerAdditionStatus = { success: false, statusReason: "" };
    this.employeeRegisterStatus = this.itemAdditionStatus = false;
    this.currentPageHeading = "Home";
    this.passwordChangeStatus = this.returnCashUpdate = false;
    this.paymentStatusDt = null;

  }

  //Normal Employee Login Call
  userAthentication(username, password) {
    //By DEFAULT SMM LOGIN  
    if (this.loginType == undefined) {
      this.loginType = "SMM";
    }

    var body = { 'username': username, 'password': password, 'loginType': this.loginType };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/login/authentication', body, { headers: headers })
      .subscribe(data => {
        console.log(data.json());
        if (data.json().success == false) {
          this.loginStatus = false;
        }
        else {
          this.loginStatus = true;
          this.loggedID = data.json().emp_login;
          this.sessionID = data.json().sessionID;

          console.log(this.loggedID);
          if (this.loggedID["employee_Role"].toUpperCase() === "ADMIN") {
            this.getAdminRequiredData();
          }
          if (this.loggedID["employee_Role"].toUpperCase() === 'Inventory') {
            this.getAllItems();
          }

        }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  //Employee Login Using KeyCode
  userAthenticationUsingKey(username, key) {
    var body = { 'username': username, 'password': key, 'loginType': this.loginType, 'sessionID': this.sessionID, 'reqID': null };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/login/authenticationUsingKey', body, { headers: headers })
      .subscribe(data => {
        if (data.json().success == false) {
          this.loginUsingKeyStatus = false;
        }
        else {
          this.loginUsingKeyStatus = true;
        }
        this.loggedID = data.json().emp_login;
        this.sessionID = data.json().sessionID;

      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  //To reset Employee password
  resetPassword(username) {

    var body = { 'username': username, 'password': null, 'loginType': this.loginType, 'sessionID': this.sessionID, 'reqID': null };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/login/forgetPassword', body, { headers: headers })
      .subscribe(data => {
        this.resetEmailAddress = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });

  }

  //Data Required when Admin Logs in
  getAdminRequiredData() {
    this.getAllItems();

    this.getDefectiveProducts();

    this.allStaffDataFetching();

    this.getAllOffers();
  }

  allStaffDataFetching() {
    this.serviceHttp.request('http://localhost:8091/employee/getEmployeeDetails/' + this.sessionID)
      .pipe(map(res => res.json()))
      .subscribe(res => {
        this.allEmployeeDetails = res;
      });
  }

  getDefectiveProducts() {
    this.serviceHttp.request('http://localhost:8091/products/getDefectiveProducts/' + this.sessionID)
    .pipe(map(res => res.json())).subscribe(res => {
        this.defectiveProducts = res;
      });
  }

  //Getting All Existing Items Details
  getAllItems() {
    this.serviceHttp.request('http://localhost:8091/products/getAllItems/' + this.sessionID)
      .pipe(map(res => res.json())).subscribe(res => {
        this.allItemCodeList = res;
      });
  }

  //Getting All Existing Offer Details 
  getAllOffers() {
    this.serviceHttp.request('http://localhost:8091/products/getAllOffers/' + this.sessionID)
      .pipe(map(res => res.json())).subscribe(res => {
        this.allOffers = res;
      });
  }

  /* Getting Sales Bill */
  getBill(customerType) {
    this.getAllOffers();
    this.CustomerType = customerType;
    this.billItems = { items: null, customerDt: null };
    var date = new Date();
    var components = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ];

    this.customerSessionID = components.join("");
    var body = { customerSessionID: this.customerSessionID, sessionID: this.sessionID, customerType: customerType };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/billing/getBill', body, { headers: headers })
      .subscribe(data => {
        console.log("calculated bill");
        this.billItems = data.json();
        console.log(this.billItems);
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  flushExistingbill() {
    this.billItems = { items: null, customerDt: null };
  }

  /* Recalculating Bill */
  recalculateBill() {
    if (this.billItems != undefined) {
      var customer = this.billItems.customerDt;
      this.billItems = { items: null, customerDt: customer };

      var body = { customerSessionID: this.customerSessionID, sessionID: this.sessionID };
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.serviceHttp.post('http://localhost:8091/billing/reCalculateBill', body, { headers: headers })
        .subscribe(data => {
          this.billItems.items = data.json().items;
          console.log("recalculated bill dt");
          console.log(this.billItems);
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
      return true;
    }
    else {
      return false;
    }
  }

  sendPaymentLinkToCustomer(req) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/billing/sendPaymentLink', req, { headers: headers })
      .subscribe(data => {
        this.paymentStatusDt = data.json();
        this.invoiceID = this.paymentStatusDt["inv_id"];
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  getPaymentStatus() {
    if (this.paymentStatusDt != null && this.paymentStatusDt != undefined) {
      this.serviceHttp.request('http://localhost:8091/billing/getPaymentStatus/' + this.invoiceID)
        .pipe(map(res => res.json())).subscribe(res => {
          this.paymentResultStatus = res;
          console.log("response came");
          console.log(this.paymentResultStatus);
        });
    }
  }

  // =============================================================================================


  //Adding New Customer  
  addNewCustomer(fname, lname, cdob, gender, pcontact, scontact, caddress, mail, link) {

    var customer = {
      cAdd: caddress, dob: cdob, email: mail, cId: null,
      imageUrl: link, depositCoins: 0, earnedCoins: 10,
      favs: null, fName: fname, gender: gender, lName: lname,
      language: "English", phone: pcontact, viewed: null,
      rewardPoints: 10, secPhone: scontact, securePin: null
    };

    var body = { 'customer': customer, 'sessionID': this.sessionID };
    var headers = new Headers();
    console.log(customer);
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/customer/registration', body, { headers: headers })
      .subscribe(data => {
        this.customerAdditionStatus = data.json();
        console.log("customer register status ");
        console.log(this.customerAdditionStatus);
      }, error => {
        console.log(JSON.stringify(error.json()));
      });

  }

  //Getting Items Details By Scan of Product
  getItemDetailsByID() {
    this.serviceHttp.request('http://localhost:8091/products/singleItemScan/' + this.sessionID)
      .pipe(map(res => res.json())).subscribe(res => {
        this.itemDetails = res;
      });
  }

  /* Setting Mode of Search */
  getItemDetails(input, key) {
    var body = { 'searchInput': input, 'sessionID': this.sessionID, 'reqID': null };
    console.log("body");
    console.log(body);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(headers);
    var httpCallTag;
    if (key == "ITEM NAME") {
      httpCallTag = 'searchByName';
    }
    else if (key == "ITEM CODE") {
      httpCallTag = 'searchByItemCode';
    }
    else {
      httpCallTag = 'searchByBrandName';
    }
    this.serviceHttp.post('http://localhost:8091/products/' + httpCallTag, body, { headers: headers })
      .subscribe(data => {
        this.itemDetails = data.json();
        console.log("item dt");
        console.log(this.itemDetails);
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  //Getting Items by Item Category Search
  getItemDetailsByCategory(group, category, subCategory, nature) {
    var body = { group: group, category: category, subcategory: subCategory, nature: nature, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/products/searchByCategory', body, { headers: headers })
      .subscribe(data => {
        this.itemDetails = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Setting Page Heading */
  setCurrentPageHeading(heading) {
    this.currentPageHeading = heading;
  }

  scanProduct() {
    this.scannedProductDt = null;
    this.serviceHttp.request('http://localhost:8091/products/singleProductScan/' + this.sessionID)
      .pipe(map(res => res.json())).subscribe(res => {
        this.scannedProductDt = res;
      });
  }

  /* Registering New Empolyee */
  registerEmployee(id, fName, lName, type, dob, contact, role, address, email, pan, uid, gender) {
    var employeeDt = { employee_address: address, employee_contact: contact, employee_designation: role, employee_DOB: dob, employee_fname: fName, employee_ID: id, employee_lname: lName, employee_mail: email, employee_type: type, gender: gender, pAN: pan, uID: uid };
    console.log("employeeDt");
    console.log(employeeDt)
    var body = { emp: employeeDt, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // this.serviceHttp.post('http://localhost:8091/employee/addNewEmployee', body, { headers: headers })
    //   .subscribe(data => {
    //     this.employeeRegisterStatus = data.json();
    //     console.log(this.employeeRegisterStatus);
    //   }, error => {
    //     console.log(JSON.stringify(error.json()));
    //   });
  }

  /* Adding Product To DB */
  addProductsToDB(itemCode, itemColor, productSize, expiryDate, itemCount) {
    var invoiceDate = new Date();
    var pdt = { pId: null, color: itemColor, expiry: expiryDate, invoice: invoiceDate, item_code: itemCode, size: productSize, staff: this.loggedID["Employee_Role"], defective: false };
    var body = { pdt: pdt, sessionID: this.sessionID, count: itemCount };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/inventory/addProduct', body, { headers: headers })
      .subscribe(data => {
        this.productAdditionStatus = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Adding Item To DB */
  addItemDtToDB(item) {
    var body = { itemdt: item, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/inventory/addItem', body, { headers: headers })
      .subscribe(data => {
        this.itemAdditionStatus = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  scanCustomerDetails() {
    this.customerDetails = null;
    this.serviceHttp.request('http://localhost:8091/customer/scanCustomer/' + this.sessionID)
      .pipe(map(res => res.json())).subscribe(res => {
        this.customerDetails = res;
      });
  }

  /* Get Customer by Details */
  getCustomerByDetails(fName, dob, contact) {
    var body = { fName: fName, dob: dob, contact: contact, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/customer/getCustomer', body, { headers: headers })
      .subscribe(data => {
        this.customerDetails = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Update Customer Details */
  updateCustomer(customer) {
    var body = { customer: customer, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/customer/updateCustomer', body, { headers: headers })
      .subscribe(data => {
        this.customerUpdationStatus = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Get Customer Transactions */
  getCustomerTransactions() {
    var body = { cId: this.customerDetails["customer"].cId, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/customer/getCustomerTransaction', body, { headers: headers })
      .subscribe(data => {
        this.customerTransactions = data.json();
        console.log(data.json());
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Adding New Offer */
  addOffertoDB(offer) {
    var body = { offer: offer, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/products/addOfferToDB', body, { headers: headers })
      .subscribe(data => {
        this.offerSaveStatus = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Add Product for Resale */
  addProductForResale(product) {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var date = [year, month, day].join('-');

    var expDate = new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000),
      expmonth = '' + (expDate.getMonth() + 1),
      expday = '' + expDate.getDate(),
      expyear = expDate.getFullYear();

    if (expmonth.length < 2) expmonth = '0' + expmonth;
    if (expday.length < 2) expday = '0' + expday;
    var expiryDate = [expyear, expmonth, expday].join('-');

    var pdt = {
      invoice: date,
      item_code: product.item_code,
      pId: product.pid,
      color: product.product_color,
      expiry: expiryDate,
      size: product.product_size,
      staff: "admin",
      defective: false
    };

    var body = { product: pdt, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/products/addProductForResale', body, { headers: headers })
      .subscribe(data => {
        //console.log(data.json());
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Save Product Detail Changes */
  saveProductDtChanges() {
    var body = { product: this.adminScannedProductDt, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/products/saveProductChanges', body, { headers: headers })
      .subscribe(data => {
        //console.log(data.json());
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Save Item Details changes*/
  saveEditedItemDt(item) {
    var itemEdited = {
      item_code: item.item_code,
      item_brand: item.item_brand,
      item_category: item.item_category,
      item_group: item.item_group,
      item_name: item.item_name,
      item_nature: item.item_nature,
      item_manufacturer: item.item_manufacturer,
      item_subcategory: item.item_subcategory,
      item_cp: item.item_cp,
      item_mrp: item.item_mrp,
      item_sp: item.item_sp,
      reward_x: item.reward_x,
      item_tax: item.item_tax,
      offer_id: item.offer_id,
      item_desc: item.item_desc,
      item_imagelinks: item.item_imagelinks
    }
    console.log(itemEdited);
    var body = { itemdt: itemEdited, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/products/saveItem', body, { headers: headers })
      .subscribe(data => {
        this.itemSaveStatus = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Save Items Offer */
  saveUpdation(itemList) {
    if (this.offerChangedStatus == true) {
      var itmList = [{ "defect_flag": false, "item_brand": "", "item_category": "", "item_code": "", "item_cp": "", "item_desc": null, "item_group": "", "item_imagelinks": null, "item_manufacturer": "", "item_mrp": null, "item_name": "", "item_nature": "", "item_sp": null, "item_subcategory": "", "item_tax": null, "offer_id": null, "reward_x": null }];
      itmList.pop();
      for (var i = 0; i < itemList.length; i++) {
        var item = {
          "defect_flag": itemList[i].defect_flag,
          "item_brand": itemList[i].item_brand,
          "item_category": itemList[i].item_category,
          "item_code": itemList[i].item_code,
          "item_cp": itemList[i].item_cp,
          "item_desc": itemList[i].item_desc,
          "item_group": itemList[i].item_group,
          "item_imagelinks": itemList[i].item_imagelinks,
          "item_manufacturer": itemList[i].item_manufacturer,
          "item_mrp": itemList[i].item_mrp,
          "item_name": itemList[i].item_name,
          "item_nature": itemList[i].item_nature,
          "item_sp": itemList[i].item_sp,
          "item_subcategory": itemList[i].item_subcategory,
          "item_tax": itemList[i].item_tax,
          "offer_id": itemList[i].offer_id,
          "reward_x": itemList[i].reward_x
        };
        itmList.push(item);
      }
      var body = { items: itmList, sessionID: this.sessionID };
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.serviceHttp.post('http://localhost:8091/products/updateItemsOffer', body, { headers: headers })
        .subscribe(data => {
          this.offerUpdateStatus = data.json();
        }, error => {
          console.log(JSON.stringify(error.json()));
        });
      this.offerChangedStatus = false;
    }
  }

  /* Search Customer by contact and passcode */
  searchCustomer(contact, passcode) {
    var body = { primary_contact: contact, login_passcode: passcode, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/customer/manualCustomerLogin', body, { headers: headers })
      .subscribe(data => {
        this.billItems.customerDt = data.json().customer;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Save Employee New Password */
  savePassword(username, pass) {
    var body = { 'username': username, 'password': pass, 'loginType': null, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/login/changePassword', body, { headers: headers })
      .subscribe(data => {
        if (data.json() == false) {
          this.passwordChangeStatus = false;
        }
        else {
          this.passwordChangeStatus = true;
        }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  paymentThroughEDC(transaction) {
    console.log("Transaction sending");
    console.log(transaction);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/billing/activateEDC', transaction, { headers: headers })
      .subscribe(data => {
        var response = data["_body"];
        this.responseEDCArray = response.split(",");

        for (var i = 0; i < this.responseEDCArray.length; i++) {
          var newString = this.responseEDCArray[i].replace(/ /g, "");
          this.responseEDCArray[i] = newString.substring(1, newString.length - 1);
        }
        console.log("responseArray");
        console.log(this.responseEDCArray);
        if (this.responseEDCArray[2] == "APPROVED") {
          console.log("SUCCESS");
          this.EDCpaymentStatus = true;
        }

      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Saving Defective Products from customer */
  saveDefectiveProduct(product, returnAmount, transaction) {
    this.customerdepositBalance = this.customerDetails["customer"]["depositCoins"] = (parseInt(this.customerDetails["customer"]["depositCoins"]) + parseInt(returnAmount)).toString();
    this.returnCashUpdate = true;

    //Update Customer Balance
    this.updateCustomer(this.customerDetails["customer"]);

    //Add new Transaction to table
    this.updateExistingTransaction(transaction);
    product["customer_ID"] = this.customerDetails["customer"]["cId"];

    var headers = new Headers();
    var body = { defective: product, sessionID: this.sessionID };
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/products/saveDefectiveProduct', body, { headers: headers })
      .subscribe(data => {
        this.defectiveProductSaveStatus = data.json();
        if (this.defectiveProductSaveStatus == true) {
          this.getDefectiveProducts();
        }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  //Updating Existing Trannsaction Details
  updateExistingTransaction(transaction) {
    var body = { transaction: transaction, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/products/updateExistingTransaction', body, { headers: headers })
      .subscribe(data => {
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Saving Sales after Successful Payment */
  updateTransactionWithCustomer() {
    var body = { customerDt: this.POSCustomer, transactionDt: this.POSCustomerTransaction, productIds: this.POSids, guestdt: null, customerSessionID: this.customerSessionID, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/billing/updateTransaction', body, { headers: headers })
      .subscribe(data => {
        this.saleUpdationStatus = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* Saving Guest Detail in Angular*/
  setGuestDetails(contact, dob) {
    console.log(dob);
    this.guestDetails = {
      "guest_id": (dob + contact.value).replace(/-/g, ""),
      "dob": dob,
      "mobile": contact.value,
      "timestamp": null
    };
  }

  getCustomTransactionDt(dateArray) {
    console.log(dateArray);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/transaction/getTransBtwn', dateArray, { headers: headers })
      .subscribe(data => {
        console.log("transactions service");
        console.log(data.json());
        this.customTransactionsdt = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
    return this.customTransactionsdt;
  }

  //Fetching Last one Month Transactions
  getMonthlyTransactionDetails() {
    var today = new Date();
    var tomorrow = new Date();
    var yesterday = new Date();
    tomorrow.setDate(today.getDate() + 1);
    yesterday.setDate(today.getDate() - 30);
    var tow = tomorrow.toISOString();
    var yest = yesterday.toISOString();
    var body = { 'fromDt': yest, 'toDt': tow, 'limit': 0 };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/transaction/getTransBtwn', body, { headers: headers })
      .subscribe(data => {
        console.log(data.json());
        this.monthlyTransactionsdt = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
    return this.monthlyTransactionsdt;
  }

  // getWeeklyTransactionDt(dateArray){
  //   var tranc ={"dateArray":dateArray};
  //  console.log("transaction service");
  //   console.log(tranc);
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   this.serviceHttp.post('http://localhost:8080/transaction/getTransBtwn',dateArray, {headers: headers})
  //       .subscribe(data => {
  //         this.weeklyTransactionsdt=data.json();
  //         console.log(data.json());
  //       }, error => {
  //         console.log(JSON.stringify(error.json()));
  //   });
  //   return this.weeklyTransactionsdt;
  // }


  /* Save Sales of Guest */
  updateTransactionAsGuest() {
    var body = { customerDt: null, transactionDt: this.POSCustomerTransaction, productIds: this.POSids, guestdt: this.guestDetails, customerSessionID: this.customerSessionID, sessionID: this.sessionID };
    var headers = new Headers();
    console.log("body of sale updation");
    console.log(body);
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/billing/updateTransactionAsGuest', body, { headers: headers })
      .subscribe(data => {
        this.saleUpdationStatus = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  saveTransactionDt(customer, guest, transaction, ids) {
    this.guestDetails = guest;
    this.POSCustomer = customer;
    this.POSCustomerTransaction = transaction;
    this.POSids = ids;
  }

  /* Print and Mail Service in sales */
  printBill(msg) {
    this.paymentStatusDt = null;
    var temp = this.POSCustomerTransaction;
    var email;
    var userFirstName, userLastName, userContact;
    if (this.guestDetails == undefined) {
      email = this.billItems.customerDt.email;
      userFirstName = this.billItems.customerDt.fName;
      userLastName = this.billItems.customerDt.lName;
      userContact = this.billItems.customerDt.phone;
    }
    else {
      email = "";
      userFirstName = "Guest";
      userLastName = "";
      userContact = this.guestDetails.mobile;
    }

    console.log("customer");
    console.log(this.billItems.customerDt);

    console.log(this.guestDetails);
    console.log("going to print bill");
    var body = { totDiscount: this.totalBillDiscount, message: msg, cName: userFirstName, lName: userLastName, contact: userContact, cMail: email, transaction: temp, customerSessionID: this.customerSessionID, sessionID: this.sessionID };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/billing/sendPaymentSucccess', body, { headers: headers })
      .subscribe(data => {
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  /* When Logout is Done */
  logoutService() {
    console.log("app main service");
    // this.customerSessionID = "";
    // this.sessionID = "";
    // this.serviceHttp.request('http://localhost:8091/login/logout')
    //   .pipe(map(res => res.json())).subscribe(res => {

    //   });
  }


  cancelPurchase() {
    this.customerSessionID = "";
    this.billItems = { items: null, customerDt: null };
    this.serviceHttp.request('http://localhost:8091/billing/cancel')
      .pipe(map(res => res.json())).subscribe(res => {
      });
  }

  clearAllCurrentSaleData() {
    /*this.serviceHttp.request('http://localhost:8080/billing/cancel')
    .pipe(map(res => res.json())).subscribe(res => {
     
    });*/
    //this.billItems={items:null,customerDt:null};
  }

  saveTransactions() {
    if (this.guestDetails == null) {
      this.updateTransactionWithCustomer();
    }
    else {
      this.updateTransactionAsGuest();
    }
  }

  checkData() { }


  //get fastest selling products
  getFSPDetails(dates) {
    console.log("getting fast products");
    console.log(new Date());
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/reports/getFastSellWLimit', dates, { headers: headers })
      .subscribe(data => {
        console.log("getting response");
        console.log(data.json());
        this.FSPdt = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });

  }


  getFastProducts() {
    return this.FSPdt;
  }
  geMVCDetails(dateParam) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/reports/getBestCustWLimit', dateParam, { headers: headers })
      .subscribe(data => {
        console.log("transactions service");
        console.log(data.json());
        this.MVCdt = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });

  }
  getMVCDt() {
    return this.MVCdt;
  }

  getUnderStockDetails() {
    this.serviceHttp.request('http://localhost:8091/reports/getUnderStockItems')
      .pipe(map(res => res.json())).subscribe(res => {
        this.USdt = res;
      });
  }

  getusDt() {
    return this.USdt;
  }

  getMostFavProdDetails() {

    this.serviceHttp.request('http://localhost:8091/reports/getMostFavs')
      .pipe(map(res => res.json())).subscribe(res => {
        this.MFdt = res;
      });


  }
  getusMostFavDt() {
    return this.MFdt;
  }

  getObsoleteProducts() {
    return this.obsoleteProducts;
  }

  getOBPDetailsbyValue(dateParam) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/reports/getObsoleteVB', dateParam, { headers: headers })
      .subscribe(data => {
        console.log("Obsolete Products by Value");
        console.log(data.json());
        this.obsoleteProducts = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });

  }

  getOBPDetailsbyQuantity(dateParam) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.serviceHttp.post('http://localhost:8091/reports/getObsoleteQB', dateParam, { headers: headers })
      .subscribe(data => {
        console.log("Obsolete Products by Quantity");
        console.log(data.json());
        this.obsoleteProducts = data.json();
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

}

