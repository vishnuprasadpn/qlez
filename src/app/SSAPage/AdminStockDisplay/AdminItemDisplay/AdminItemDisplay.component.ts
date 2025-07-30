import { Component, OnInit, ViewChildren } from '@angular/core';
import { AdminSDItemService } from './AdminItemDisplay.service';

@Component({
	selector: 'admin-item-display',
	templateUrl: './AdminItemDisplay.component.html',
	styleUrls: ['./AdminItemDisplay.component.css']
})
export class AdminItemDisplayComponent {
	@ViewChildren('selector') allselectors;
	@ViewChildren('productColor') allColors;

	itemDisplayMenu:boolean;
	searchByIDSection:boolean;
	searchByCategory:boolean;
	searchByValue:boolean;
	noSearchKeyError:boolean;
	loadingProgress:boolean;
	noItemFound:boolean;
	connectionError:boolean;
	dataView:boolean;
	itemFullDetail:boolean;

	selectGroup:boolean;
	selectCategory:boolean;
	selectSubCategory:boolean;
	selectAOP:boolean;
	AOPSelectTD:boolean;
	categorySelectTD:boolean;
	SubCategorySelectTD:boolean;

	searchType:any;
	totalCount:any;

	selecteditem: any;
	applyToItems: any;
	searchKey: any;
	updatedOfferItems: any;

	response: any;
	//items received after request
	scannedItemDt: any;
	itemCount: any;
	selectedItems: any;

	sizes: any;
	colors: any;
	dropDownID: any;
	selectedItemStatus: boolean;
	itemEditOverlayStatus: boolean;
	//Value from each dropdown
	groupValue: any;
	categoryValue: any;
	subCategoryValue: any;
	natureValue: any;

	groupStatus: any;
	category: any;
	subCategory: any;
	nature: any;
	warning: any;
	//Dropdown managing 
	menStatus: any; womenStatus: any;
	topStatus: any; bottomStatus: any; shoeStatus: any;

	tShirtStatus: any; shirtStatus: any; jacketStatus: any; shortsStatus: any;
	trousersStatus: any; leggingsStatus: any; shoesStatus: any; shoeAccStatus: any;
	skirtsStatus: any; cropStatus: any; nTrousersStatus: any; skortStatus: any;
	Otype: boolean;
	Oby: any;
	modal: any;

	selectAllBoxStatus: boolean;
	// Get the image and insert it inside the modal - use its "alt" text as a caption
	img: any;
	modalImg: any;
	captionText: any;

	constructor(private adminSDItemService: AdminSDItemService) {
		this.searchType = this.searchKey = "";
		this.itemDisplayMenu=true;
		this.totalCount = 0;
		this.searchByIDSection=this.searchByCategory=this.loadingProgress=this.noSearchKeyError=false;

		
		this.Otype = false;
		this.warning = false;
		this.selectedItemStatus = false;
		this.itemCount = 0;
		this.itemEditOverlayStatus = false;
		this.selectedItems = [{
			defect_flag: null, item_brand: null,
			item_category: null, item_code: null, item_cp: null, item_desc: null,
			item_group: null, item_imagelinks: null, item_manufacturer: null,
			item_mrp: null, item_name: null, item_nature: null, item_sp: null,
			item_subcategory: null, item_tax: null, offer_id: null, reward_x: null
		}];
		this.selectedItems.pop();
		this.selectAllBoxStatus = true;

		this.groupStatus = false;
		this.category = false;
		this.subCategory = false;
		this.nature = false;
	}

	ngAfterViewInit() {
		this.resetTable();
		this.menStatus = false; this.womenStatus = false; this.topStatus = true; this.bottomStatus = true; this.shoeStatus = true;
		this.sizes = [];
		this.colors = [];
	}

	// resetTable() {
	// 	this.scannedItemDt = [{
	// 		defect_flag: null, item_brand: null,
	// 		item_category: null, item_code: null, item_cp: null, item_desc: null,
	// 		item_group: null, item_imagelinks: null, item_manufacturer: null,
	// 		item_mrp: null, item_name: null, item_nature: null, item_sp: null,
	// 		item_subcategory: null, item_tax: null, offer_id: null, reward_x: null
	// 	}];
	// }

	// selectedKey(key) {
	// 	var keyValue = key.value;
	// 	if (keyValue == "Category Vise") {
	// 		document.getElementById("categoryViseDiv").style.display = "block";
	// 		document.getElementById("searchInputDiv").style.display = "none";
	// 		document.getElementById("scanButtonDiv").style.display = "none";
	// 	}
	// 	else if (keyValue == "Scan Product") {
	// 		document.getElementById("scanButtonDiv").style.display = "block";
	// 		document.getElementById("categoryViseDiv").style.display = "none";
	// 		document.getElementById("searchInputDiv").style.display = "none";

	// 	}
	// 	else {
	// 		document.getElementById("searchInputDiv").style.display = "block";
	// 		document.getElementById("scanButtonDiv").style.display = "none";
	// 		document.getElementById("categoryViseDiv").style.display = "none";

	// 	}
	// 	this.searchKey = key.value;
	// }

	// keyInputUpdating(keyInput) {
	// 	if (keyInput != "") {
	// 		document.getElementById("noSearchKeyError").style.display = "none";
	// 	}
	// }

	// searchProducts(searchKeyValue) {
	// 	document.getElementById("actionButtonDiv").style.display = "none";
	// 	if (searchKeyValue.value != "") {
	// 		document.getElementById("valueTable").style.display = "none";
	// 		document.getElementById("headingTable").style.display = "none";

	// 		document.getElementById("loading").style.display = "block";
	// 		document.getElementById("noSearchKeyError").style.display = "none";
	// 		this.adminSDItemService.getProducts(this.searchKey, searchKeyValue.value);
	// 		setTimeout(() => {
	// 			this.response = this.adminSDItemService.getItemDt();
	// 			if (this.response["success"] == true) {
	// 				this.resetTable();
	// 				document.getElementById("valueTable").style.display = "block";
	// 				document.getElementById("headingTable").style.display = "block";
	// 				for (var j = 0; j < this.response["itemList"].length; j++) {
	// 					this.scannedItemDt[j] = this.response["itemList"][j]["item"];
	// 					this.scannedItemDt[j]["colors"] = Object.keys(this.response["itemList"][j]["item"]["item_imagelinks"]);
	// 					this.scannedItemDt[j]["image"] = this.response["itemList"][j]["item"]["item_imagelinks"][this.scannedItemDt[j]["colors"][0]][0];
	// 					this.scannedItemDt[j]["sizes"] = Object.keys(this.response["itemList"][j]["sizeCount"]);
	// 					this.scannedItemDt[j]["sizeCounts"] = this.response["itemList"][j]["sizeCount"];
	// 					var productCount = 0;
	// 					for (var i = 0; i < this.scannedItemDt[j]["sizes"].length; i++) {
	// 						productCount = this.scannedItemDt[j]["sizeCounts"][this.scannedItemDt[j]["sizes"][i]] + productCount;
	// 					}
	// 					this.scannedItemDt[j]["productCount"] = productCount;
	// 				}
	// 				document.getElementById("productNotFoundErrorMessage").style.display = "none";
	// 			}
	// 			else {
	// 				document.getElementById("productNotFoundErrorMessage").style.display = "block";
	// 			}
	// 			document.getElementById("loading").style.display = "none";
	// 		}, 8000);
	// 	}
	// 	else {
	// 		document.getElementById("noSearchKeyError").style.display = "block";
	// 	}
	// }

	// scanProductID() {
	// 	document.getElementById("actionButtonDiv").style.display = "none";
	// 	document.getElementById("valueTable").style.display = "none";
	// 	document.getElementById("headingTable").style.display = "none";

	// 	document.getElementById("loading").style.display = "block";
	// 	this.adminSDItemService.scanProduct();
	// 	setTimeout(() => {
	// 		this.response = this.adminSDItemService.getItemDt();
	// 		if (this.response["success"] == true) {
	// 			this.resetTable();
	// 			document.getElementById("valueTable").style.display = "block";
	// 			document.getElementById("headingTable").style.display = "block";

	// 			this.scannedItemDt[0] = this.response["itemList"][0]["item"];
	// 			this.scannedItemDt[0]["colors"] = Object.keys(this.response["itemList"][0]["item"]["item_imagelinks"]);
	// 			this.scannedItemDt[0]["image"] = this.response["itemList"][0]["item"]["item_imagelinks"][this.scannedItemDt[0]["colors"][0]][0];
	// 			this.scannedItemDt[0]["sizes"] = Object.keys(this.response["itemList"][0]["sizeCount"]);
	// 			this.scannedItemDt[0]["sizeCounts"] = this.response["itemList"][0]["sizeCount"];
	// 			var productCount = 0;
	// 			for (var i = 0; i < this.scannedItemDt[0]["sizes"].length; i++) {
	// 				productCount = this.scannedItemDt[0]["sizeCounts"][this.scannedItemDt[0]["sizes"][i]] + productCount;
	// 			}
	// 			this.scannedItemDt[0]["productCount"] = productCount;
	// 			document.getElementById("productNotFoundErrorMessage").style.display = "none";
	// 		}
	// 		else {
	// 			document.getElementById("productNotFoundErrorMessage").style.display = "block";
	// 		}
	// 		document.getElementById("loading").style.display = "none";
	// 	}, 10000);
	// }

	// showCountDetails(item, index) {
	// 	if (document.getElementById(index).style.display == "block") {
	// 		document.getElementById(index).style.display = "none";
	// 	}
	// 	else {
	// 		console.log("scaned itm dt");
	// 		console.log(this.scannedItemDt);
	// 		for (var i = 0; i < this.scannedItemDt.length; i++) {
	// 			console.log("scannedItemDt in loop");
	// 			console.log(item["item_code"]);
	// 			if (this.scannedItemDt[i]["item_code"] == item["item_code"]) {
	// 				this.allColors.toArray().find((e) => {
	// 					//e.nativeElement.setAttribute("style","background:"+this.scannedItemDt[i].colors[j].toLowerCase());
	// 					var row = parseInt("" + e.nativeElement.id / 10);
	// 					var colorN = e.nativeElement.id % 2;
	// 					console.log("row");
	// 					console.log(row);
	// 					console.log("native")

	// 					console.log("cno");
	// 					console.log(colorN);
	// 					if (index == row) {

	// 						e.nativeElement.setAttribute("style", "background:" + this.scannedItemDt[i]["colors"][colorN].toLowerCase());
	// 					}
	// 				});
	// 			}
	// 		}
	// 		document.getElementById(index).style.display = "block";
	// 	}
	// }

	// selectedGroup(group) {
	// 	this.groupStatus = true;
	// 	this.groupValue = group.value;
	// 	document.getElementById("categoryKey").style.display = "block";
	// 	document.getElementById("subCategoryKey").style.display = "none";

	// 	if (this.groupValue == "Men") {
	// 		this.menStatus = true; this.womenStatus = false; this.shortsStatus = false;
	// 		this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.trousersStatus = false;
	// 		this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
	// 	}
	// 	else {
	// 		this.womenStatus = true; this.menStatus = false; this.shortsStatus = false;
	// 		this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.trousersStatus = false;
	// 		this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
	// 	}
	// }

	// selectedCategory(category) {
	// 	this.category = true;
	// 	document.getElementById("subCategoryKey").style.display = "block";
	// 	document.getElementById("nature").style.display = "none";
	// 	this.shortsStatus = false; this.tShirtStatus = false; this.shirtStatus = false;
	// 	this.jacketStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
	// 	this.categoryValue = category.value;

	// 	if (this.categoryValue == "Tops") {
	// 		this.topStatus = true; this.bottomStatus = false; this.shoeStatus = false;
	// 	}
	// 	else if (this.categoryValue == "Bottoms") {
	// 		this.bottomStatus = true; this.topStatus = false; this.shoeStatus = false;
	// 	}
	// 	else {
	// 		this.shoeStatus = true; this.bottomStatus = false; this.topStatus = false;
	// 	}
	// }

	// selectedSubCategory(subCategory) {
	// 	this.subCategory = true;
	// 	document.getElementById("nature").style.display = "block";
	// 	this.subCategoryValue = subCategory.value;

	// 	if (this.subCategoryValue == "T-Shirt") {
	// 		this.tShirtStatus = true; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;

	// 	} else if (this.subCategoryValue == "Shirt") {
	// 		this.shirtStatus = true; this.tShirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;

	// 	} else if (this.subCategoryValue == "Jacket") {
	// 		this.jacketStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;

	// 	} else if (this.subCategoryValue == "Shorts") {
	// 		this.shortsStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;

	// 	} else if (this.subCategoryValue == "Trousers") {
	// 		this.trousersStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;

	// 	} else if (this.subCategoryValue == "Leggings") {
	// 		this.leggingsStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;

	// 	} else if (this.subCategoryValue == "Shoes") {
	// 		this.shoesStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;

	// 	} else if (this.subCategoryValue == "Shoes Accessories") {
	// 		this.shoeAccStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.skirtsStatus = false;

	// 	} else {
	// 		this.skirtsStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false;

	// 	}
	// }

	// selectedNature(nature) {
	// 	this.nature = true;
	// 	this.natureValue = nature.value;
	// 	document.getElementById("categorySearchButton").style.pointerEvents = "auto";
	// }

	// getItemsByCategory() {
	// 	if (this.groupStatus == false || this.category == false || this.subCategory == false || this.nature == false) {
	// 		console.log("g" + this.groupStatus);
	// 		console.log("c" + this.category);
	// 		console.log("s" + this.subCategory);
	// 		console.log("n" + this.nature);

	// 		this.warning = true;

	// 	}
	// 	else {
	// 		document.getElementById("actionButtonDiv").style.display = "none";
	// 		document.getElementById("valueTable").style.display = "none";
	// 		document.getElementById("headingTable").style.display = "none";
	// 		document.getElementById("loading").style.display = "block";
	// 		this.adminSDItemService.getItemsByCategory(this.groupValue, this.categoryValue, this.subCategoryValue, this.natureValue);
	// 		setTimeout(() => {
	// 			this.response = this.adminSDItemService.getItemDt();
	// 			if (this.response["success"] == true) {
	// 				this.resetTable();
	// 				document.getElementById("valueTable").style.display = "block";
	// 				document.getElementById("headingTable").style.display = "block";

	// 				for (var j = 0; j < this.response["itemList"].length; j++) {
	// 					this.scannedItemDt[j] = this.response["itemList"][j]["item"];
	// 					this.scannedItemDt[j]["colors"] = Object.keys(this.response["itemList"][j]["item"]["item_imagelinks"]);
	// 					this.scannedItemDt[j]["image"] = this.response["itemList"][j]["item"]["item_imagelinks"][this.scannedItemDt[j]["colors"][0]][0];
	// 					this.scannedItemDt[j]["sizes"] = Object.keys(this.response["itemList"][j]["sizeCount"]);
	// 					this.scannedItemDt[j]["sizeCounts"] = this.response["itemList"][j]["sizeCount"];
	// 					var productCount = 0;
	// 					for (var i = 0; i < this.scannedItemDt[j]["sizes"].length; i++) {
	// 						productCount = this.scannedItemDt[j]["sizeCounts"][this.scannedItemDt[j]["sizes"][i]] + productCount;
	// 					}
	// 					this.scannedItemDt[j]["productCount"] = productCount;
	// 				}
	// 				document.getElementById("productNotFoundErrorMessage").style.display = "none";
	// 			}
	// 			else {
	// 				document.getElementById("productNotFoundErrorMessage").style.display = "block";
	// 			}
	// 			document.getElementById("loading").style.display = "none";
	// 		}, 5000);
	// 	}
	// }

	selectAll(selectAllBox) {
		for (var i = 0; i < this.scannedItemDt.length; i++) {
			this.selectedItems.pop();
		}
		if (this.selectAllBoxStatus == true) {
			this.allselectors.toArray().find((allS) => {
				allS.nativeElement.setAttribute("style", "background:blue;");
			});
			selectAllBox.setAttribute("style", "background:blue;");
			this.selectAllBoxStatus = false;
			for (var i = 0; i < this.scannedItemDt.length; i++) {
				this.selectedItems.push(this.scannedItemDt[i]);
				this.itemCount = this.itemCount + 1;
			}
		}
		else {
			this.allselectors.toArray().find((allS) => {
				allS.nativeElement.setAttribute("style", "background:none;");
			});
			selectAllBox.setAttribute("style", "background:none;");
			this.selectAllBoxStatus = true;
		}
	}

	select(selector, selectAll, item) {
		if (document.getElementById(selector.id).style.background == "blue") {
			document.getElementById(selector.id).style.background = "none";
			if (this.itemCount != 0) {
				var flag = true;
				for (var itm = 0; itm < this.selectedItems.length; itm++) {
					if (this.selectedItems[itm]["item_code"] == item.item_code) {
						flag = false;
					}
					if (flag == false) {
						this.selectedItems[itm] = this.selectedItems[itm + 1];
					}
				}
				if (flag == false) {
					this.selectedItems.pop();
				}
			}
			else {
				document.getElementById("actionButtonDiv").style.display = "none";
			}
			selectAll.setAttribute("style", "background:none;");
			this.selectAllBoxStatus = true;
		}
		else {
			document.getElementById(selector.id).style.background = "blue";
			this.selectedItems.push(item);
			this.itemCount = this.itemCount + 1;
		}

		if (this.selectedItems.length >= 1) {
			document.getElementById("actionButtonDiv").style.display = "block";
		}
		else {
			document.getElementById("actionButtonDiv").style.display = "none";
		}
	}

	editItem(item) {
		if (item != 'close') {
			document.getElementById("itemEditOverlay").style.height = "100%";
			this.selecteditem = item;
		}
		else {
			document.getElementById("itemEditOverlay").style.height = "0%";
			console.log("selected item");
			console.log(this.selecteditem);
			this.adminSDItemService.saveItemDt(this.selecteditem);
		}
	}

	applyOffers(option) {
		if (option != 'close') {
			document.getElementById("applyOfferOverlay").style.height = "100%";
		}
		else {
			document.getElementById("applyOfferOverlay").style.height = "0%";
			this.adminSDItemService.saveUpdatedOffer(this.updatedOfferItems);
		}
	}

	placeOrder(option) {
		if (option != 'close') {
			document.getElementById("placeOrderOverlay").style.height = "100%";
		}
		else {
			document.getElementById("placeOrderOverlay").style.height = "0%";
			//this.adminSDItemService.saveItemDt(this.selecteditem);
		}
	}

	// sort(Item, icon) {
	// 	this.Otype = Item;
	// 	document.getElementById(icon).className = "";
	// 	if (this.Oby == false) {


	// 		this.Oby = true;
	// 		document.getElementById(icon).className += " fa fa-caret-up";
	// 	}
	// 	else {
	// 		document.getElementById(icon).className = " ";
	// 		document.getElementById(icon).className += " fa fa-caret-down";
	// 		this.Oby = false;
	// 	}
	// }

	// imagePopup(imgpath) {
	// 	this.modal = document.getElementById('myModal');
	// 	// Get the image and insert it inside the modal - use its "alt" text as a caption
	// 	this.modalImg = document.getElementById("img01");
	// 	this.captionText = document.getElementById("caption");
	// 	//var span = document.getElementsByClassName("close")[0];
	// 	this.modal.style.display = "block";
	// 	this.modalImg.src = imgpath;
	// }

// --------------------------------------------------------------------------------------------------



	goTOMenu(){
		this.searchByIDSection = this.noSearchKeyError = this.searchByValue = this.searchByCategory = this.connectionError = this.noItemFound = false;
		this.itemDisplayMenu = true;
		this.selectGroup = this.selectCategory = this.selectSubCategory = this.selectAOP = false;
		this.AOPSelectTD = this.categorySelectTD = this.SubCategorySelectTD =false;
	}	

	tryAgain(){
		console.log(this.searchByCategory);
		console.log(this.searchByIDSection);
		console.log(this.searchByValue);
		if(this.searchType=="ITEM NAME" || this.searchType=="ITEM CODE" || this.searchType=="ITEM BRAND"  ){
			this.itemDisplayMenu = this.searchByCategory = this.searchByIDSection = this.noItemFound = this.connectionError = false;
			this.searchByValue = true;
		}
		else if(this.searchType == "SCAN PRODUCT"){
			this.searchByIDSection = true;
			this.itemDisplayMenu = this.searchByCategory = this.searchByValue = this.noItemFound = this.connectionError = false;
		}
		else{
			this.searchByCategory =true;
			this.itemDisplayMenu = this.searchByValue = this.searchByIDSection = this.noItemFound = this.connectionError = false;
		}
		this.dataView = false;
	}

	selectSearchByID(){
		this.searchByIDSection = true;
		this.itemDisplayMenu = this.searchByCategory = this.searchByValue = false;
		this.searchType = "SCAN PRODUCT";
	}

	selectSearchByItemName(){	
		this.searchByValue = true;		
		this.itemDisplayMenu = this.searchByCategory = this.searchByIDSection = false;
		this.searchType = "ITEM NAME";
		console.log(this.searchType);
	}

	selectSearchByItemCode(){	
		this.searchByValue = true;
		this.itemDisplayMenu = this.searchByCategory = this.searchByIDSection = false;
		this.searchType = "ITEM CODE";
	}

	selectSearchByBrandName(){	
		this.searchByValue = true;
		this.itemDisplayMenu = this.searchByCategory = this.searchByIDSection = false;
		this.searchType = "ITEM BRAND";
	}

	selectSearchByCategory(){	
		this.searchByCategory = true;
		this.itemDisplayMenu = this.searchByIDSection = this.searchByValue = false;
		this.searchType = "ITEM CATEGORY";
	}

	keyInputUpdating(keyInput) {
		if (keyInput.value != "") {
			this.searchKey = keyInput.value.toUpperCase();
			this.noSearchKeyError=false;
		}
	}

	resetTable() {
		console.log("resetTable");
		this.scannedItemDt = [{
			defect_flag: null, item_brand: null,
			item_category: null, item_code: null, item_cp: null, item_desc: null,
			item_group: null, item_imagelinks: null, item_manufacturer: null,
			item_mrp: null, item_name: null, item_nature: null, item_sp: null,
			item_subcategory: null, item_tax: null, offer_id: null, reward_x: null
		}];
	}

	searchProducts() {
		if (this.searchKey != "") {
			this.loadingProgress = true;
			this.searchByIDSection = this.noSearchKeyError = this.searchByValue = this.itemDisplayMenu = false;
			
			this.adminSDItemService.getProducts(this.searchKey, (this.searchType).toUpperCase());
			setTimeout(() => {
				this.response = this.adminSDItemService.getItemDt();
				if(this.response!=undefined){
					this.connectionError = false;
					if (this.response["success"] == true) {
						this.resetTable();
						this.noItemFound = false;
						this.dataView = true;
						this.totalCount = this.response["itemList"].length;
						for (var j = 0; j < this.response["itemList"].length; j++) {
							this.scannedItemDt[j] = this.response["itemList"][j]["item"];
							this.scannedItemDt[j]["colors"] = Object.keys(this.response["itemList"][j]["item"]["item_imagelinks"]);
							this.scannedItemDt[j]["image"] = this.response["itemList"][j]["item"]["item_imagelinks"][this.scannedItemDt[j]["colors"][0]][0];
							this.scannedItemDt[j]["sizes"] = Object.keys(this.response["itemList"][j]["sizeCount"]);
							this.scannedItemDt[j]["sizeCounts"] = this.response["itemList"][j]["sizeCount"];
							var productCount = 0;
							for (var i = 0; i < this.scannedItemDt[j]["sizes"].length; i++) {
								productCount = this.scannedItemDt[j]["sizeCounts"][this.scannedItemDt[j]["sizes"][i]] + productCount;
							}
							this.scannedItemDt[j]["productCount"] = productCount;
						}
					}
					else {
						this.dataView= false;
						this.noItemFound = true;
					}
				}
				else{
					this.connectionError = true;
				}
				this.loadingProgress = false;
			}, 8000);
		}
		else {
			this.noSearchKeyError=true;
		}
	}

	scanProductID() {
		this.adminSDItemService.scanProduct();
		this.loadingProgress =true;
		setTimeout(() => {
			this.response = this.adminSDItemService.getItemDt();
			if(this.response!=undefined){
				this.connectionError = false;
				if (this.response["success"] == true) {
					this.resetTable();
					this.noItemFound = false;
					this.dataView = true;
					this.totalCount = this.response["itemList"].length;

					this.scannedItemDt[0] = this.response["itemList"][0]["item"];
					this.scannedItemDt[0]["colors"] = Object.keys(this.response["itemList"][0]["item"]["item_imagelinks"]);
					this.scannedItemDt[0]["image"] = this.response["itemList"][0]["item"]["item_imagelinks"][this.scannedItemDt[0]["colors"][0]][0];
					this.scannedItemDt[0]["sizes"] = Object.keys(this.response["itemList"][0]["sizeCount"]);
					this.scannedItemDt[0]["sizeCounts"] = this.response["itemList"][0]["sizeCount"];
					
					var productCount = 0;
					
					for (var i = 0; i < this.scannedItemDt[0]["sizes"].length; i++) {
						productCount = this.scannedItemDt[0]["sizeCounts"][this.scannedItemDt[0]["sizes"][i]] + productCount;
					}
					this.scannedItemDt[0]["productCount"] = productCount;
				}
				else {
					this.dataView= false;
					this.noItemFound = true;		
				}
			}
			else{
				this.connectionError = true;
				
			}
			this.loadingProgress = false;
		
		}, 9000);

	}

	showCountDetails(item, index) {

		console.log("showCountDetails");	
		console.log("item");
		console.log(item);
		console.log("index");
		console.log(index);
		if (document.getElementById(index).style.display == "block") {
			console.log("index");
			document.getElementById(index).style.display = "none";
		}
		else {
			console.log("else");
			for (var i = 0; i < this.scannedItemDt.length; i++) {
				
				if (this.scannedItemDt[i]["item_code"] == item["item_code"]) {
					console.log(this.scannedItemDt[i]["colors"]);
					this.allColors.toArray().find((e) => {
						// e.nativeElement.setAttribute("style","background:"+this.scannedItemDt[i].colors[j].toLowerCase());
						var row = parseInt("" + e.nativeElement.id / 10);
						var colorN = e.nativeElement.id % 2;
						console.log("row :"+row);
						if (index == row) {
							console.log(this.scannedItemDt[i]["colors"][colorN]);
							e.nativeElement.setAttribute("style", "background:" + this.scannedItemDt[i]["colors"][colorN].toLowerCase());
						}
					});
				}
			}
			document.getElementById(index).style.display = "block";
		}

	}

	selectedGroup(group, category) {
		this.selectGroup = true;
		this.groupValue = group.value;
		this.categorySelectTD =true;
		this.SubCategorySelectTD = this.AOPSelectTD = false;
		
		if (this.groupValue == "Men") {
			this.menStatus = true; this.womenStatus = false; this.shortsStatus = false;
			this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.trousersStatus = false;
			this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		}
		else {
			this.womenStatus = true; this.menStatus = false; this.shortsStatus = false;
			this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.trousersStatus = false;
			this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		}
	}

	selectedCategory(category, subCategory) {
		this.selectCategory = true;
		this.SubCategorySelectTD =true;
		this.AOPSelectTD = false;
		this.shortsStatus = false; this.tShirtStatus = false; this.shirtStatus = false;
		this.jacketStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		this.categoryValue = category.value;

		if (this.categoryValue == "Tops") {
			this.topStatus = true; this.bottomStatus = false; this.shoeStatus = false;
		}
		else if (this.categoryValue == "Bottoms") {
			this.bottomStatus = true; this.topStatus = false; this.shoeStatus = false;
		}
		else {
			this.shoeStatus = true; this.bottomStatus = false; this.topStatus = false;
		}
	}

	selectedSubCategory(subCategory, nature) {
		this.selectSubCategory = true;
		this.AOPSelectTD = true;
		this.subCategoryValue = subCategory.value;
		
		if (this.subCategoryValue == "T-Shirt") {
			this.tShirtStatus = true; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		} else if (this.subCategoryValue == "Shirt") {
			this.shirtStatus = true; this.tShirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		} else if (this.subCategoryValue == "Jacket") {
			this.jacketStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		} else if (this.subCategoryValue == "Shorts") {
			this.shortsStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		} else if (this.subCategoryValue == "Trousers") {
			this.trousersStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		} else if (this.subCategoryValue == "Leggings") {
			this.leggingsStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		} else if (this.subCategoryValue == "Shoes") {
			this.shoesStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		} else if (this.subCategoryValue == "Shoes Accessories") {
			this.shoeAccStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.skirtsStatus = false;
		} else {
			this.skirtsStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false;
		}
	}

	selectedNature(nature) {
		this.selectAOP = true;
		this.natureValue = nature.value;
	}

	getItemsByCategory() {
		console.log("Search by Category");
		console.log("Group :" + this.groupValue);
		console.log("Category :" + this.categoryValue);
		console.log("SubCatgeory :" + this.subCategoryValue);
		console.log("Nature :" + this.natureValue);
		this.response = null;
		this.searchByCategory = false;
		this.adminSDItemService.getItemsByCategory(this.groupValue, this.categoryValue, this.subCategoryValue, this.natureValue);
		this.loadingProgress = true;
		setTimeout(() => {
			this.response = this.adminSDItemService.getItemDt();
			if(this.response!=undefined){
				this.connectionError=false;
				if (this.response["success"] == true) {
					this.resetTable();
					this.noItemFound = false;
					this.dataView = true;
		
					this.totalCount = this.response["itemList"].length;
					for (var j = 0; j < this.response["itemList"].length; j++) {
						this.scannedItemDt[j] = this.response["itemList"][j]["item"];
						this.scannedItemDt[j]["colors"] = Object.keys(this.response["itemList"][j]["item"]["item_imagelinks"]);
						this.scannedItemDt[j]["image"] = this.response["itemList"][j]["item"]["item_imagelinks"][this.scannedItemDt[j]["colors"][0]][0];
						this.scannedItemDt[j]["sizes"] = Object.keys(this.response["itemList"][j]["sizeCount"]);
						this.scannedItemDt[j]["sizeCounts"] = this.response["itemList"][j]["sizeCount"];
						var productCount = 0;
						for (var i = 0; i < this.scannedItemDt[j]["sizes"].length; i++) {
							productCount = this.scannedItemDt[j]["sizeCounts"][this.scannedItemDt[j]["sizes"][i]] + productCount;
						}
						this.scannedItemDt[j]["productCount"] = productCount;
					}
				}
				else {
					this.noItemFound = true;
					this.dataView = false;
					console.log("No product found");
				}
			}
			else{
				this.connectionError=true;
			}
			this.loadingProgress= false;
		}, 5000);
	}

	imagePopup(imgpath) {
		// console.log("imagePopup");
		// this.modal = document.getElementById('myModal');
		// // Get the image and insert it inside the modal - use its "alt" text as a caption
		// this.modalImg = document.getElementById("img01");
		// this.captionText = document.getElementById("caption");
		// //var span = document.getElementsByClassName("close")[0];
		// this.modal.style.display = "block";
		// this.modalImg.src = imgpath;
		
	}

	viewItem(item){
		console.log("item selected");
		console.log(item);
		this.dataView = false;
		this.itemFullDetail =true;
	}

	testClick(){
		this.dataView = true;
		this.itemFullDetail =false;
	}

	sort(Item, icon) {
		this.Otype = Item;
		document.getElementById(icon).className = "";
		if (this.Oby == false) {
			this.Oby = true;
			document.getElementById(icon).className += " fa fa-caret-up";
		}
		else {
			document.getElementById(icon).className = " ";
			document.getElementById(icon).className += " fa fa-caret-down";
			this.Oby = false;
		}
	}

}

