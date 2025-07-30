import { Component, OnInit, ViewChildren,ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { SDItemService } from './SDItem.service';

@Component({
	selector: 'sd-item',
	templateUrl: './SDItem.component.html',
	styleUrls: ['./SDItem.component.css']
})

export class SDItemComponent {
	itemDisplayMenu:boolean; searchByIDSection:boolean;	searchByValue:boolean; noSearchKeyError:boolean;
	loadingProgress:boolean; searchByCategory:boolean; searchType:any; searchKey: any; dataView:boolean;
	noItemFound:boolean; connectionError:boolean;

	//INFO MESSAGE SPAN's
	selectGroup:boolean; selectCategory:boolean; selectSubCategory:boolean; selectAOP:boolean;
	categorySelectTD:boolean; SubCategorySelectTD:boolean; AOPSelectTD:boolean;

	totalCount:any;

	@ViewChildren('productColor') allColors;
	displayedColumns = ['position', 'name', 'weight', 'symbol'];
	  
	response: any;
	
	//items received after request
	scannedItemDt: any; sizes: any;	colors: any; dropDownID: any;

	//Value from each dropdown
	groupValue: any; categoryValue: any; subCategoryValue: any;	natureValue: any;

	//Dropdown managing 
	menStatus: any; womenStatus: any; topStatus: any; bottomStatus: any; shoeStatus: any;

	tShirtStatus: any; shirtStatus: any; jacketStatus: any; shortsStatus: any;
	trousersStatus: any; leggingsStatus: any; shoesStatus: any; shoeAccStatus: any;
	skirtsStatus: any; cropStatus: any; nTrousersStatus: any; skortStatus: any;
	modal: any;	Otype: boolean;	Oby: any;

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	img: any; modalImg: any; captionText: any;

	constructor(private sdItemService: SDItemService) { 
		this.searchType = this.searchKey = "";
		this.itemDisplayMenu=true;
		this.totalCount = 0;
		this.searchByIDSection= this.searchByCategory= this.loadingProgress= this.noSearchKeyError=false;
	}

	ngOnInit() {
		// this.resetTable();
		this.menStatus = false; this.womenStatus = false; this.topStatus = true; this.bottomStatus = true; this.shoeStatus = true;
		this.sizes = [];this.colors = [];
	}

	goTOMenu(){
		this.searchByIDSection = this.noSearchKeyError = this.searchByValue = this.searchByCategory = this.connectionError = this.noItemFound = false;
		this.itemDisplayMenu = true;
		this.selectGroup = this.selectCategory = this.selectSubCategory = this.selectAOP = false;
		this.AOPSelectTD = this.categorySelectTD = this.SubCategorySelectTD =this.dataView =false;
	}	

	tryAgain(){
		console.log(this.searchByCategory);
		console.log(this.searchByIDSection);
		console.log(this.searchByValue);
		this.dataView = false;
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
			
			this.sdItemService.getProducts(this.searchKey, (this.searchType).toUpperCase());
			setTimeout(() => {
				this.response = this.sdItemService.getItemDt();
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
		this.sdItemService.scanProduct();
		this.loadingProgress =true;
		setTimeout(() => {
			this.response = this.sdItemService.getItemDt();
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
		if (document.getElementById(index).style.display == "block") {
			document.getElementById(index).style.display = "none";
		}
		else {
			for (var i = 0; i < this.scannedItemDt.length; i++) {
				
				if (this.scannedItemDt[i]["item_code"] == item["item_code"]) {
					console.log(this.scannedItemDt[i]["colors"]);
					this.allColors.toArray().find((e) => {
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
		console.log("Group : " + this.groupValue);
		console.log("Category : " + this.categoryValue);
		console.log("SubCatgeory : " + this.subCategoryValue);
		console.log("Nature : " + this.natureValue);
		this.response = null;
		this.searchByCategory = false;
		this.sdItemService.getItemsByCategory(this.groupValue, this.categoryValue, this.subCategoryValue, this.natureValue);
		this.loadingProgress = true;
		setTimeout(() => {
			this.response = this.sdItemService.getItemDt();
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
		console.log("imagePopup");
		this.modal = document.getElementById('myModal');
		// Get the image and insert it inside the modal - use its "alt" text as a caption
		this.modalImg = document.getElementById("img01");
		this.captionText = document.getElementById("caption");
		//var span = document.getElementsByClassName("close")[0];
		this.modal.style.display = "block";
		this.modalImg.src = imgpath;
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
