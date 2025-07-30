import { Component, Input, ViewChildren, OnInit } from '@angular/core';
import { ItemEditService } from './EditItem.service';
@Component({
	selector: 'edit-item',
	templateUrl: './EditItem.component.html',
	styleUrls: ['./EditItem.component.css']
})
export class EditItemComponent {
	@Input() itemdt: any;
	@ViewChildren('productColor') allColors;

	itemname: any;
	itembrand: any;
	itemmanufacturer: any;
	itemMrp: any;
	itemCp: any;
	itemSp: any;
	itemtax: any;
	itemGroup: any;
	itemCategory: any;
	itemSubCategory: any;
	itemNature: any;
	itemImages = [{}];
	response: any;
	//items received after request
	scannedItemDt: any;
	dataupdated: boolean;
	initializedData:boolean;

	womenGroupStatus: boolean;
	menGroupStatus: boolean;
	topCategoryStatus: boolean;
	bottomsCategoryStatus: boolean;
	shoesCategoryStatus: boolean;

	tShirtSubCategoryStatus: boolean;
	shirtSubCategoryStatus: boolean;
	jacketSubCategoryStatus: boolean;
	shortsSubCategoryStatus: boolean;
	trousersSubCategoryStatus: boolean;
	leggingsSubCategoryStatus: boolean;
	shoesSubCategoryStatus: boolean;
	shoeAccSubCategoryStatus: boolean;
	skirtSubCategoryStatus: boolean;

	longSleevedTShirtStatus: boolean;
	shortSleevedTShirtStatus: boolean;
	longSleevedPoloShirtStatus: boolean;
	shortSleevedPoloShirtStatus: boolean;
	downJacketStatus: boolean;
	jacketSelectStatus: boolean;
	bermudaShortsStatus: boolean;
	boardShortsStatus: boolean;
	breechesStatus: boolean;
	overtrousersStatus: boolean;
	paddedCyclingShortsStatus: boolean;
	runningShortsStatus: boolean;
	shoesSelectedStatus: boolean;
	slippersStatus: boolean;
	insolesStatus: boolean;
	lacesStatus: boolean;
	cropTopStatus: boolean;
	trouserSelectStatus: boolean;
	skirtsSelectStatus: boolean;
	skortStatus: boolean;
	colors: any;
	//Save Status
	tempColor: any;
	ItemNameSaveStatus: boolean;
	ItemBrandSaveStatus: boolean;
	ItemManufactureSaveStatus: boolean;
	ItemMrpSaveStatus: boolean;
	ItemCpSaveStatus: boolean;
	ItemSpSaveStatus: boolean;
	ItemColorSaveStatus: boolean;
	ItemGroupSaveStatus: boolean;
	ItemCategorySaveStatus: boolean;
	ItemSubCategorySaveStatus: boolean;
	ItemNatureSaveStatus: boolean;
	ItemTaxSaveStatus: boolean;
	
	imageArray: any;
	itemColorReset: any;
	colorList: any;

	groupInput:boolean;
	groupSelect:boolean;
	categoryInput:boolean;
	categorySelect:boolean;
	subCategoryInput:boolean;
	subCategorySelect:boolean;
	natureInput:boolean;
	natureSelect:boolean;
	

	itemGroupStatus:boolean;
	//Dropdown managing 
	menStatus: any; womenStatus: any;
	topStatus: any; bottomStatus: any; shoeStatus: any;

	tShirtStatus: any; shirtStatus: any; jacketStatus: any; shortsStatus: any;
	trousersStatus: any; leggingsStatus: any; shoesStatus: any; shoeAccStatus: any;
	skirtsStatus: any; cropStatus: any; nTrousersStatus: any;


	editItemNameIcon:boolean;
	saveItemNameIcon:boolean;
	cancelItemNameIcon:boolean;
	editItemBrandIcon:boolean;
	saveItemBrandIcon:boolean;
	cancelItemBrandIcon:boolean;
	editItemManufacturerIcon:boolean;
	saveItemManufacturerIcon:boolean;
	cancelItemManufacturerIcon:boolean;
	editItemMrpIcon:boolean;
	saveItemMrpIcon:boolean;
	cancelItemMrpIcon:boolean;
	editItemCpIcon:boolean;
	saveItemCpIcon:boolean;
	cancelItemCpIcon:boolean;
	editItemSpIcon:boolean;
	saveItemSpIcon:boolean;
	cancelItemSpIcon:boolean;
	editItemTaxIcon:boolean;
	saveItemTaxIcon:boolean;
	cancelItemTaxIcon:boolean;
	editItemGroupIcon:boolean;
	saveItemGroupIcon:boolean;
	cancelItemGroupIcon:boolean;
	editItemCategoryIcon:boolean;
	saveItemCategoryIcon:boolean;
	cancelItemCategoryIcon:boolean;
	editItemSubCategoryIcon:boolean;
	saveItemSubCategoryIcon:boolean;
	cancelItemSubCategoryIcon:boolean;
	editItemNatureIcon:boolean;
	saveItemNatureIcon:boolean;
	cancelItemNatureIcon:boolean;

	itemNameError:boolean;
	itemNameSaveError:boolean;
	itemBrandError:boolean;
	itemBrandSaveError:boolean;
	itemManufactureError:boolean;
	itemManufactureSaveError:boolean;
	itemMrpError:boolean;
	itemMrpSaveError:boolean;
	itemMrpLowError:boolean;
	itemCpError:boolean;
	itemCpExceedMrp:boolean;
	itemCpLessthanSp:boolean;
	itemCpSaveError:boolean;
	itemSpError:boolean;
	itemSpExceedMrp:boolean;
	itemSpLessthanCp:boolean;
	itemSpSaveError:boolean;
	itemGroupSaveError:boolean;
	itemCategorySaveError:boolean;
	itemSubCategoryError:boolean;
	itemSubCategorySaveError:boolean;
	itemNatureError:boolean;
	itemNatureSaveError:boolean;
	itemTaxError:boolean;
	itemTaxExceededError:boolean;

	constructor(private editItemService: ItemEditService) {
		this.dataupdated = this.initializedData = false;this.womenGroupStatus = false;
		this.menGroupStatus = false;this.topCategoryStatus = false;this.bottomsCategoryStatus = false;this.shoesCategoryStatus = false;
		this.colorList = ["Aliceblue", "Antiquewhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "Blanchedalmond", "Blue", "Blueviolet", "Brown", "Burlywood", "Cadetblue", "Chartreuse", "Chocolate", "Coral", "Cornflowerblue", "Cornsilk", "Crimson", "Cyan", "Darkblue", "Darkcyan", "Darkgoldenrod", "Darkgray", "Darkgreen", "Darkgrey", "Darkkhaki", "Darkmagenta", "Darkolivegreen", "Darkorange", "Darkorchid", "Darkred", "Darksalmon", "Darkseagreen", "Darkslateblue", "Darkslategray", "Darkslategrey", "Darkturquoise", "Darkviolet", "Deeppink", "Deepskyblue", "Dimgray", "Dimgrey", "Dodgerblue", "Firebrick", "Floralwhite", "Forestgreen", "Fuchsia", "Gainsboro", "Ghostwhite", "Gold", "Goldenrod", "Gray", "Green", "Greenyellow", "Grey", "Honeydew", "Hotpink", "Indianred", "Indigo", "Ivory", "Khaki", "Lavender", "Lavenderblush", "Lawngreen", "Lemonchiffon", "Lightblue", "Lightcoral", "Lightcyan", "Lightgoldenrodyellow", "Lightgray", "Lightgreen", "Lightgrey", "Lightpink", "Lightsalmon", "Lightseagreen", "Lightskyblue", "Lightslategray", "Lightsteelblue", "Lightyellow", "Lime", "Limegreen", "Linen", "Magenta", "Maroon", "Mediumaquamarine", "Mediumblue", "Mediumorchid", "Mediumpurple", "Mediumseagreen", "Mediumslateblue", "Mediumspringgreen", "Mediumturquoise", "Mediumvioletred", "Midnightblue", "Mintcream", "Mistyrose", "Moccasin", "Navajowhite", "Navy", "Oldlace", "Olive", "Olivedrab", "Orange", "Orangered", "Orchid", "Palegoldenrod", "Palegreen", "Paleturquoise", "Palevioletred", "Papayawhip", "Peachpuff", "Peru", "Pink", "Plum", "Powderblue", "Purple", "Rebeccapurple", "Red", "Rosybrown", "Royalblue", "Saddlebrown", "Salmon", "Sandybrown", "Seagreen", "Seashell", "Sienna", "Silver", "Skyblue", "Slateblue", "Slategray", "Slategrey", "Snow", "Springgreen", "Steelblue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "Whitesmoke", "Yellow", "Yellowgreen"];
		this.tShirtSubCategoryStatus = false;this.shirtSubCategoryStatus = false;this.jacketSubCategoryStatus = false;this.shortsSubCategoryStatus = false;
		this.trousersSubCategoryStatus = false;this.leggingsSubCategoryStatus = false;this.shoesSubCategoryStatus = false;this.shoeAccSubCategoryStatus = false;this.skirtSubCategoryStatus = false;

		this.longSleevedTShirtStatus = false;this.shortSleevedTShirtStatus = false;this.longSleevedPoloShirtStatus = false;this.shortSleevedPoloShirtStatus = false;this.downJacketStatus = false;this.jacketSelectStatus = false;this.bermudaShortsStatus = false;this.boardShortsStatus = false;this.breechesStatus = false;this.overtrousersStatus = false;
		this.paddedCyclingShortsStatus=false;this.runningShortsStatus = false;this.shoesSelectedStatus = false;this.slippersStatus = false;this.insolesStatus = false;
		this.lacesStatus = false;this.cropTopStatus = false;this.trouserSelectStatus = false;this.skirtsSelectStatus = false;this.skortStatus = false;

		this.editItemNameIcon=true;
		this.saveItemNameIcon=this.cancelItemNameIcon=false;
		this.editItemBrandIcon=true;
		this.saveItemBrandIcon=this.cancelItemBrandIcon=false;
		this.editItemManufacturerIcon=true;
		this.saveItemManufacturerIcon=this.cancelItemManufacturerIcon=false;
		this.editItemMrpIcon=true;
		this.saveItemMrpIcon=this.cancelItemMrpIcon=false;
		this.editItemCpIcon=true;
		this.saveItemCpIcon=this.cancelItemCpIcon=false;
		this.editItemSpIcon=true;
		this.saveItemSpIcon=this.cancelItemSpIcon=false;
		this.editItemTaxIcon=true;
		this.saveItemTaxIcon=this.cancelItemTaxIcon=false;
		this.editItemGroupIcon=true;
		this.saveItemGroupIcon=this.cancelItemGroupIcon=false;
		this.editItemCategoryIcon=true;
		this.saveItemCategoryIcon=this.cancelItemCategoryIcon=false;
		this.editItemSubCategoryIcon=true;
		this.saveItemSubCategoryIcon=this.cancelItemSubCategoryIcon=false;
		this.editItemNatureIcon=true;
		this.saveItemNatureIcon=this.cancelItemNatureIcon=false;

		this.itemNameError=this.itemNameSaveError=false;
		this.itemBrandError=this.itemBrandSaveError=false
		this.itemManufactureError=this.itemManufactureSaveError=false;
		this.itemMrpError=this.itemMrpLowError=this.itemMrpSaveError=false;
		this.itemCpError=this.itemCpExceedMrp=this.itemCpLessthanSp=this.itemCpSaveError=false;
		this.itemSpError=this.itemSpExceedMrp=this.itemSpLessthanCp=this.itemSpSaveError=false;
		this.itemTaxError=this.itemTaxExceededError=false;
		this.itemGroupSaveError=this.itemCategorySaveError=false;
		this.itemNatureError=this.itemNatureSaveError=false;
		this.groupInput=true;this.groupSelect=false;
		this.categoryInput=true;this.categorySelect=false;
		this.subCategoryInput=true;this.subCategorySelect=false;
		this.natureInput=true;this.natureSelect=false;
	}

	ngDoCheck() {
		if (this.itemdt != undefined && this.initializedData ==false) {
			this.initializedData=true;
			this.itemname = this.itemdt.item_name;
			this.itembrand = this.itemdt.item_brand;
			this.itemmanufacturer = this.itemdt.item_manufacturer;
			this.itemMrp = Number(this.itemdt.item_mrp);
			this.itemCp = Number(this.itemdt.item_cp);
			this.itemSp = Number(this.itemdt.item_sp);
			this.itemtax = Number(this.itemdt.item_tax);
			this.itemGroup = this.itemdt.item_group;
			this.itemCategory = this.itemdt.item_category;
			this.itemSubCategory = this.itemdt.item_subcategory;
			this.itemNature = this.itemdt.item_nature;

			this.itemImages = this.itemdt.item_imagelinks;
			this.colors = Object.keys(this.itemdt.item_imagelinks);
			this.imageArray = [];
			
			for (var i = 0; i < this.colors.length; i++) {
				var obj = { color: this.colors[i], image: this.itemImages[this.colors[i]] };
				this.imageArray.push(obj);
			}
			
			this.setGroup();

			this.setCategory();

			this.setSubCategory();

			this.setNature();
		}
		this.submit();
	}

	editItemName(name) {
		this.editItemNameIcon=false;
		this.saveItemNameIcon=true;
		this.cancelItemNameIcon=true;
		this.itemNameSaveError=false;
		this.ItemNameSaveStatus = false;
		this.itemBrandError=false;
		name.style.pointerEvents="auto";
	}

	validateItemName(name) {
		if (name.value != ""){
			this.itemname = name.value;
			this.itemNameError=false;
			if(this.itemdt.item_name == name.value) {
				this.dataupdated = true;
			}
			else{
				this.ItemNameSaveStatus = true;
				this.itemdt.item_name = name.value;
			}
			this.editItemNameIcon=true;
			this.saveItemNameIcon=false;
			this.cancelItemNameIcon=false;
			name.style.pointerEvents="none";
		}
		else{
			this.itemNameError=true;
		}
		this.itemNameSaveError=false;
		this.ItemNameSaveStatus=true;
	}

	saveItemName(name) {
		this.validateItemName(name);
	}

	cancelItemName(name){
		this.itemNameSaveError=false;
		this.cancelItemNameIcon=false;
		this.editItemNameIcon=true;
		this.saveItemNameIcon=false;
		this.itemNameError=false;
		name.value = this.itemdt.item_name;
		name.style.pointerEvents="none";
		this.ItemNameSaveStatus=true;
	}

	editBrand(brand){		
		this.ItemBrandSaveStatus = false;
		this.editItemBrandIcon=false;
		this.saveItemBrandIcon=true;
		this.cancelItemBrandIcon=true;
		this.itemBrandSaveError=false;
		this.itemBrandError=false;		
		brand.style.pointerEvents="auto";
	}

	validateItemBrand(brand) {
		if (brand.value != "") {
			this.itembrand = brand.value;
			this.itemBrandError=false;
			if (this.itemdt.item_brand == brand.value) {
				this.dataupdated = true;
			}
			else {
				this.ItemBrandSaveStatus = true;
				this.itemdt.item_brand = brand.value;
			}
			this.editItemBrandIcon=true;
			this.saveItemBrandIcon=false;
			this.cancelItemBrandIcon=false;
			brand.style.pointerEvents="none";
		}
		else {
			this.itemBrandError=true;
		}
		this.itemBrandSaveError=false;
		this.ItemBrandSaveStatus = true;
	}

	saveBrand(brand) {
		this.validateItemBrand(brand);
	}

	cancelItemBrand(brand) {
		this.ItemBrandSaveStatus = true;
		this.editItemBrandIcon=true;
		this.saveItemBrandIcon=false;
		this.cancelItemBrandIcon=false;
		this.itemBrandError=false;
		this.itemBrandSaveError=false;
		brand.value = this.itemdt.item_brand;
		brand.style.pointerEvents="none";
	}

	editManufacturer(manufacture){
		this.ItemManufactureSaveStatus = false;
		this.editItemManufacturerIcon=false;
		this.saveItemManufacturerIcon=true;
		this.cancelItemManufacturerIcon=true;
		this.itemManufactureSaveError=false;
		manufacture.style.pointerEvents="auto";
	}

	validateManufacturer(manufacture){
		if (manufacture.value != "") {
			this.itemmanufacturer = manufacture.value;
			this.itemManufactureError=false;
			if (this.itemdt.item_manufacturer == manufacture.value) {
				this.dataupdated = true;
			}
			else {
				this.ItemManufactureSaveStatus = true;
				this.itemdt.item_manufacturer = manufacture.value;
			}
			this.editItemManufacturerIcon=true;
			this.saveItemManufacturerIcon=false;
			this.cancelItemManufacturerIcon=false;
			manufacture.style.pointerEvents="none";
		}
		else {
			this.itemManufactureError=true;
		}
		this.itemManufactureSaveError=false;
		this.ItemManufactureSaveStatus = true;
	}

	saveManufacturer(manufacture) {
		this.validateManufacturer(manufacture);		
	}

	cancelManufacturer(manufacture) {
		this.editItemManufacturerIcon=true;
		this.saveItemManufacturerIcon=false;
		this.cancelItemManufacturerIcon=false;
		this.itemManufactureSaveError=false;
		manufacture.value = this.itemdt.item_manufacturer;
		manufacture.style.pointerEvents="none";
		this.ItemManufactureSaveStatus = true;
	}

	validateMRP(mrp) {
		this.itemMrpError=false;
		var itemMRP = mrp.value;

		//checking whether mrp field is empty or less than one
		if(isNaN(mrp.value)){
			this.itemMrpError=true;
			this.itemMrpLowError=false;
			this.itemSpError=false;
			this.itemCpError=false;
			mrp.value=0;
		}
		else if(itemMRP == "" || itemMRP < 1) {
			this.itemMrpError=true;
			this.itemMrpLowError=false;
			this.itemSpError=false;
			this.itemCpError=false;
		}
		//if mrp field is not empty or greater than one then we need to compare with CP and SP
		else {
			this.itemMrpError=false;
			mrp.value = Number(mrp.value).toFixed(2)
			this.itemMrp = parseFloat(mrp.value);
			//if SP field is not empty then we need to check MRP is grater than SP or not
			//if SP is grater error message should show   

			if (this.itemSp != 0 && this.itemSp > this.itemMrp) {
				this.itemMrpLowError=true;
				this.itemCpExceedMrp=false;
				this.itemSpExceedMrp=false;
				this.itemSpLessthanCp=false;
				this.itemCpLessthanSp=false;
			}
			else {
				this.itemMrpLowError=false;
				this.itemCpExceedMrp=false;
				this.itemCpLessthanSp=false;
				this.itemSpExceedMrp=false;
				this.itemSpLessthanCp=false;

				if (this.itemdt.item_mrp == mrp.value) {
					this.dataupdated = true;
				}
				else {
					this.ItemMrpSaveStatus = true;
					this.itemdt.item_mrp = mrp.value;
				}
				this.editItemMrpIcon=true;
				this.saveItemMrpIcon=false;
				this.cancelItemMrpIcon=false;
				mrp.style.pointerEvents="none";
			}
		}
		this.ItemMrpSaveStatus=true;
		this.itemMrpSaveError=false;
	}

	editItemMrp(mrp) {
		this.ItemMrpSaveStatus = false;
		this.editItemMrpIcon=false;
		this.saveItemMrpIcon=true;
		this.cancelItemMrpIcon=true;
		mrp.style.pointerEvents="auto";
	}

	saveItemMrp(mrp) {
		this.validateMRP(mrp);
	}

	cancelItemMrp(mrp) {
		mrp.value = this.itemdt.item_mrp;
		this.itemMrpLowError=false;
		this.itemCpExceedMrp=false;
		this.itemCpLessthanSp=false;
		this.itemSpExceedMrp=false;
		this.itemSpLessthanCp=false;
		this.itemMrpError=false;

		this.ItemMrpSaveStatus=true;
		this.itemMrpSaveError=false;
		this.editItemMrpIcon=true;
		this.saveItemMrpIcon=false;
		this.cancelItemMrpIcon=false;
		mrp.style.pointerEvents="none";
	}

	validateItemCP(cp) {
		this.resetCp();
		cp.value = Number(cp.value).toFixed(2);
		var itemCP = cp.value;
		if (isNaN(cp.value)) {
			this.itemCpError=true;
			this.itemCpLessthanSp=false;
			this.itemCpExceedMrp=false;
			cp.value=0;
		}
		// checking wether that field is empty or not  if its empty then  error message should be shown
		else if (itemCP == ""){	
			this.itemCpError=true;
			this.itemCpLessthanSp=false;
			this.itemCpExceedMrp=false;
		}
		// if CP is grater than MRP then  error message should be shown 
		else if (parseFloat(cp.value) > parseFloat(this.itemMrp)) {
			this.itemCpError=false;
			this.itemCpLessthanSp=false;
			this.itemCpExceedMrp=true;
		}
		//if CP is less than SP then Error message should be shown 
		else if (parseFloat(this.itemSp) < parseFloat(cp.value)) {
			this.itemCpError=false;
			this.itemCpLessthanSp=false;
			this.itemCpExceedMrp=true;
		}
		// if the input is valid then CP status should be true
		else{
			this.itemCpLessthanSp=false;
			this.itemCpError=false;
			this.itemCp = parseFloat(cp.value);
			if (this.itemdt.item_cp == cp.value) {
				this.dataupdated = true;
			}
			else {
				this.ItemCpSaveStatus = true;
				this.itemdt.item_cp = cp.value;
			}
			this.editItemCpIcon=true;
			this.saveItemCpIcon=false;
			this.cancelItemCpIcon=false;
			cp.style.pointerEvents="none";
		}
	}

	editItemCp(cp) {
		this.ItemCpSaveStatus = false;
		this.editItemCpIcon=false;
		this.saveItemCpIcon=true;
		this.cancelItemCpIcon=true;
		cp.style.pointerEvents="auto";
	}

	saveItemCp(cp) {
		this.validateItemCP(cp);
	}

	cancelItemCp(cp) {
		cp.value = this.itemdt.item_cp;
		this.editItemCpIcon=true;
		this.saveItemCpIcon=false;
		this.cancelItemCpIcon=false;
		cp.style.pointerEvents="none";
		this.resetCp();
	}

	resetCp(){
		this.itemCpLessthanSp=false;
		this.itemCpExceedMrp=false;
		this.itemCpError=false;
		this.itemSpExceedMrp=false;
		this.itemSpLessthanCp=false;
		this.itemSpError=false;
		this.itemMrpLowError=false;
		this.ItemCpSaveStatus=true;
		this.itemCpSaveError=false;
	}

	validateSP(sp) {
		//setting all the errors hide
		this.resetSp();

		sp.value = Number(sp.value).toFixed(2);
		var itemSP = sp.value;
		//checking wether the field is empty or not
		if (isNaN(sp.value)) {
			this.itemSpError=true;
			this.itemSpLessthanCp=false;
			this.itemSpExceedMrp=false;
			sp.value=0;
		}
		else if (itemSP == "") {
			this.itemSpError=true;
			this.itemSpLessthanCp=false;
			this.itemSpExceedMrp=false;
		}
		//if its not Empty then checking entered value is grater than MRP or not 
		//if its grater then error message should be shown
		else if (parseFloat(itemSP) > parseFloat(this.itemMrp)) {
			this.itemSpExceedMrp=true;
			this.itemSpLessthanCp=false;
			this.itemSpError=false;
		}
		// checking the  entered value is less than CP 
		//if its lesser then error message should be shown
		else if (parseFloat(itemSP) < parseFloat(this.itemCp)) {
			this.itemSpLessthanCp=true;
			this.itemSpError=false;
		}
		//if the entered value is valid then sp status should be true
		else {
			this.itemSpExceedMrp=false;
			this.itemSpError=false;
			this.itemSpExceedMrp=false;
			this.itemSp = parseFloat(itemSP);
			if (this.itemdt.item_sp == sp.value) {
				this.dataupdated = true;
			}
			else {
				this.ItemSpSaveStatus = true;
				this.itemdt.item_sp = sp.value;
			}
			this.editItemSpIcon=true;
			this.saveItemSpIcon=false;
			this.cancelItemSpIcon=false;
			sp.style.pointerEvents="none";
		}
	}

	editItemSp(sp) {
		this.ItemSpSaveStatus = false;
		this.editItemSpIcon=false;
		this.saveItemSpIcon=true;
		this.cancelItemSpIcon=true;
		sp.style.pointerEvents="auto";
	}

	saveItemSp(sp) {
		this.validateSP(sp);
	}

	cancelItemSp(sp) {
		this.editItemSpIcon=true;
		this.saveItemSpIcon=false;
		this.cancelItemSpIcon=false;
		sp.value = this.itemSp;
		sp.style.pointerEvents="none";
		this.resetSp();
	}

	resetSp(){
		this.itemCpLessthanSp=false;
		this.itemCpExceedMrp=false;
		this.itemSpError=false;
		this.itemSpExceedMrp=false;
		this.itemSpLessthanCp=false;
		this.itemMrpLowError=false;
		this.ItemSpSaveStatus=true;
		this.itemSpSaveError=false;
	}

	validateItemTax(tax) {
		this.resetTax();
		var itemTx = tax.value;
		if(isNaN(tax.value) ||itemTx == ""){
			this.itemTaxError=true;
			this.itemTaxExceededError=false;		
		}
		else if(parseFloat(itemTx) > 99) {
			tax.value = Number(tax.value).toFixed(2);
			this.itemTaxExceededError=true;
		}
		else {
			this.itemtax = itemTx;
			tax.value = Number(tax.value).toFixed(2);

			if (this.itemdt.item_tax == tax.value) {
				this.dataupdated = true;
			}
			else {
				this.ItemTaxSaveStatus = true;
				this.itemdt.item_tax = tax.value;
			}
			this.editItemTaxIcon=true;
			this.saveItemTaxIcon=false;
			this.cancelItemTaxIcon=false;
			tax.style.pointerEvents="none";
			this.resetTax();
		}
	}

	editItemTax(tax) {
		this.ItemTaxSaveStatus = false;
		this.editItemTaxIcon=false;
		this.saveItemTaxIcon=true;
		this.cancelItemTaxIcon=true;
		tax.style.pointerEvents="auto";
	}

	saveItemTax(tax) {
		this.validateItemTax(tax);
	}

	cancelItemTax(tax) {
		tax.value = this.itemtax;
		this.resetTax();
		this.editItemTaxIcon=true;
		this.saveItemTaxIcon=false;
		this.cancelItemTaxIcon=false;
		tax.style.pointerEvents="none";
	}

	resetTax(){
		this.itemTaxError=false;
		this.itemTaxExceededError=false;
		this.ItemTaxSaveStatus=true;
	}

	selectedItemEditGroup(group) {
		this.ItemGroupSaveStatus=false;
		this.itemGroup = group.value;
	}

	editItemGroup() {
		this.groupInput=false;
		this.groupSelect=true;
		this.editItemGroupIcon=false;
		this.saveItemGroupIcon=true;
		this.cancelItemGroupIcon=true;
	}

	saveItemGroup() {	
		this.ItemGroupSaveStatus=true;
		this.itemGroupSaveError=false;
		this.groupInput=true;
		this.groupSelect=false;
		this.editItemGroupIcon=true;
		this.saveItemGroupIcon=false;
		this.cancelItemGroupIcon=false;
		this.itemdt.item_group =this.itemGroup;
		this.setGroup();
	}

	cancelItemGroup() {
		this.ItemGroupSaveStatus=true;
		this.itemGroupSaveError=false;
		this.groupInput=true;
		this.groupSelect=false;
		this.editItemGroupIcon=true;
		this.saveItemGroupIcon=false;
		this.cancelItemGroupIcon=false;
	}

	setGroup(){
		if (this.itemGroup.toLowerCase() == "women") {
			this.womenGroupStatus = true;
			this.menGroupStatus = false;
		}
		else {
			this.womenGroupStatus = false;
			this.menGroupStatus = true;
		}
	}

	selectedItemEditCategory(category) {
		this.ItemCategorySaveStatus=false;
		this.itemCategory = category.value;
	}

	editItemCategory() {
		this.categoryInput=false;
		this.categorySelect=true;
		this.editItemCategoryIcon=false;
		this.saveItemCategoryIcon=true;
		this.cancelItemCategoryIcon=true;
	}

	saveItemCategory() {
		this.ItemCategorySaveStatus = true;
		this.itemCategorySaveError=false;
		this.itemCategory
		this.categoryInput=true;
		this.categorySelect=false;
		this.editItemCategoryIcon=true;
		this.saveItemCategoryIcon=false;
		this.cancelItemCategoryIcon=false;
		if(this.itemCategory!=this.itemdt.item_category){
			this.ItemNatureSaveStatus=false;
			this.ItemSubCategorySaveStatus=false;
			this.itemNatureError=true;
			this.itemSubCategoryError=true;
			this.itemdt.item_category=this.itemCategory;
			this.setCategory();
		}
	}

	cancelItemCategory() {
		this.ItemCategorySaveStatus=true;
		this.itemCategorySaveError=false;
		this.categoryInput=true;
		this.categorySelect=false;
		this.editItemCategoryIcon=true;
		this.saveItemCategoryIcon=false;
		this.cancelItemCategoryIcon=false;
	}

	setCategory(){
		if (this.itemCategory.toLowerCase() == "tops") {
			this.topCategoryStatus = true;
			this.bottomsCategoryStatus = false;
			this.shoesCategoryStatus = false;
		}
		else if (this.itemCategory.toLowerCase() == "bottoms") {
			this.topCategoryStatus = false;
			this.bottomsCategoryStatus = true;
			this.shoesCategoryStatus = false;
		}
		else {
			this.topCategoryStatus = false;
			this.bottomsCategoryStatus = false;
			this.shoesCategoryStatus = true;
		}
	}

	selectedItemEditSubCategory(subCategory) {
		this.ItemSubCategorySaveStatus=false;
		this.itemSubCategory = subCategory.value;
		this.itemSubCategoryError = false;
		this.itemSubCategorySaveError=false;
	}

	editItemSubCategory() {
		this.subCategoryInput=false;
		this.subCategorySelect=true;
		this.editItemSubCategoryIcon=false;
		this.saveItemSubCategoryIcon=true;
		this.cancelItemSubCategoryIcon=true;
	}

	saveItemSubCategory() {
		this.ItemSubCategorySaveStatus = true;
		this.subCategoryInput=true;
		this.subCategorySelect=false;
		this.editItemSubCategoryIcon=true;
		this.saveItemSubCategoryIcon=false;
		this.cancelItemSubCategoryIcon=false;
		this.itemSubCategorySaveError=false;
		if(this.itemSubCategory!=this.itemdt.item_subcategory){
			this.itemdt.item_subcategory=this.itemSubCategory;
			this.itemNatureError=true;
			this.ItemNatureSaveStatus=false;
			this.setSubCategory();
		}
	}

	cancelItemSubCategory() {
		this.ItemSubCategorySaveStatus = true;
		this.itemSubCategorySaveError=false;
		this.subCategoryInput=true;
		this.subCategorySelect=false;
		this.editItemSubCategoryIcon=true;
		this.saveItemSubCategoryIcon=false;
		this.cancelItemSubCategoryIcon=false;	
	}

	setSubCategory(){
		if (this.itemSubCategory.toLowerCase() == "t-shirt") {
			this.tShirtSubCategoryStatus = true;
			this.shirtSubCategoryStatus = false;
			this.jacketSubCategoryStatus = false;
			this.shortsSubCategoryStatus = false;
			this.trousersSubCategoryStatus = false;
			this.leggingsSubCategoryStatus = false;
			this.shoesSubCategoryStatus = false;
			this.shoeAccSubCategoryStatus = false;
			this.skirtSubCategoryStatus = false;
		}
		else if (this.itemSubCategory.toLowerCase() == "shirt") {
			this.tShirtSubCategoryStatus = false;
			this.shirtSubCategoryStatus = true;
			this.jacketSubCategoryStatus = false;
			this.shortsSubCategoryStatus = false;
			this.trousersSubCategoryStatus = false;
			this.leggingsSubCategoryStatus = false;
			this.shoesSubCategoryStatus = false;
			this.shoeAccSubCategoryStatus = false;
			this.skirtSubCategoryStatus = false;
		}
		else if (this.itemSubCategory.toLowerCase() == "jacket") {
			this.tShirtSubCategoryStatus = false;
			this.shirtSubCategoryStatus = false;
			this.jacketSubCategoryStatus = true;
			this.shortsSubCategoryStatus = false;
			this.trousersSubCategoryStatus = false;
			this.leggingsSubCategoryStatus = false;
			this.shoesSubCategoryStatus = false;
			this.shoeAccSubCategoryStatus = false;
			this.skirtSubCategoryStatus = false;
		}
		else if (this.itemSubCategory.toLowerCase() == "shorts") {
			this.tShirtSubCategoryStatus = false;
			this.shirtSubCategoryStatus = false;
			this.jacketSubCategoryStatus = false;
			this.shortsSubCategoryStatus = true;
			this.trousersSubCategoryStatus = false;
			this.leggingsSubCategoryStatus = false;
			this.shoesSubCategoryStatus = false;
			this.shoeAccSubCategoryStatus = false;
			this.skirtSubCategoryStatus = false;
		}
		else if (this.itemSubCategory.toLowerCase() == "trousers") {
			this.tShirtSubCategoryStatus = false;
			this.shirtSubCategoryStatus = false;
			this.jacketSubCategoryStatus = false;
			this.shortsSubCategoryStatus = false;
			this.trousersSubCategoryStatus = true;
			this.leggingsSubCategoryStatus = false;
			this.shoesSubCategoryStatus = false;
			this.shoeAccSubCategoryStatus = false;
			this.skirtSubCategoryStatus = false;
		}
		else if (this.itemSubCategory.toLowerCase() == "leggings") {
			this.tShirtSubCategoryStatus = false;
			this.shirtSubCategoryStatus = false;
			this.jacketSubCategoryStatus = false;
			this.shortsSubCategoryStatus = false;
			this.trousersSubCategoryStatus = false;
			this.leggingsSubCategoryStatus = true;
			this.shoesSubCategoryStatus = false;
			this.shoeAccSubCategoryStatus = false;
			this.skirtSubCategoryStatus = false;
		}
		else if (this.itemSubCategory.toLowerCase() == "shoes") {
			this.tShirtSubCategoryStatus = false;
			this.shirtSubCategoryStatus = false;
			this.jacketSubCategoryStatus = false;
			this.shortsSubCategoryStatus = false;
			this.trousersSubCategoryStatus = false;
			this.leggingsSubCategoryStatus = false;
			this.shoesSubCategoryStatus = true;
			this.shoeAccSubCategoryStatus = false;
			this.skirtSubCategoryStatus = false;
		}
		else if (this.itemSubCategory.toLowerCase() == "shoes accessories") {
			this.tShirtSubCategoryStatus = false;
			this.shirtSubCategoryStatus = false;
			this.jacketSubCategoryStatus = false;
			this.shortsSubCategoryStatus = false;
			this.trousersSubCategoryStatus = false;
			this.leggingsSubCategoryStatus = false;
			this.shoesSubCategoryStatus = false;
			this.shoeAccSubCategoryStatus = true;
			this.skirtSubCategoryStatus = false;
		}
		else {
			this.tShirtSubCategoryStatus = false;
			this.shirtSubCategoryStatus = false;
			this.jacketSubCategoryStatus = false;
			this.shortsSubCategoryStatus = false;
			this.trousersSubCategoryStatus = false;
			this.leggingsSubCategoryStatus = false;
			this.shoesSubCategoryStatus = false;
			this.shoeAccSubCategoryStatus = false;
			this.skirtSubCategoryStatus = true;
		}
	}

	selectedItemEditNature(nature) {
		this.itemNature = nature.value;
		this.ItemNatureSaveStatus=false;
		this.itemNatureError = false;
		this.itemNatureSaveError=false;
	}

	editItemNature() {
		this.natureInput=false;
		this.natureSelect=true;
		this.editItemNatureIcon=false;
		this.saveItemNatureIcon=true;
		this.cancelItemNatureIcon=true;
	}

	saveItemNature() {
		this.ItemNatureSaveStatus = true;
		this.itemNatureSaveError=false;
		this.natureInput=true;
		this.natureSelect=false;
		this.editItemNatureIcon=true;
		this.saveItemNatureIcon=false;
		this.cancelItemNatureIcon=false;
		this.itemdt.item_nature = this.itemNature;
		this.itemNatureSaveError=false;
		this.setNature();
	}

	cancelItemNature() {
		this.ItemNatureSaveStatus = true;
		this.itemNatureSaveError=false;
		this.natureInput=true;
		this.natureSelect=false;
		this.editItemNatureIcon=true;
		this.saveItemNatureIcon=false;
		this.cancelItemNatureIcon=false;	
	}

	setNature(){
		if (this.itemNature.toLowerCase() == "long-sleeved t-shirt") {
			this.longSleevedTShirtStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "short-sleeved t-shirt") {
			this.shortSleevedTShirtStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "long-sleeved polo shirt") {
			this.longSleevedPoloShirtStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "short-sleeved polo shirt") {
			this.shortSleevedPoloShirtStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "down jacket") {
			this.downJacketStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "jacket") {
			this.jacketSelectStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "bermuda shorts") {
			this.bermudaShortsStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "board shorts") {
			this.boardShortsStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "breeches") {
			this.breechesStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "overtrousers") {
			this.overtrousersStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "padded cycling shorts") {
			this.paddedCyclingShortsStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "running shorts") {
			this.runningShortsStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "shoes") {
			this.shoesSelectedStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "slippers") {
			this.slippersStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "insoles") {
			this.insolesStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "laces") {
			this.lacesStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "crop top") {
			this.cropTopStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "trousers") {
			this.trouserSelectStatus = true;
		}
		else if (this.itemNature.toLowerCase() == "skirt") {
			this.skirtsSelectStatus = true;
		}
		else {
			this.skortStatus = true;
		}
	}

	submit() {
		if ((this.ItemNameSaveStatus == false) || (this.ItemBrandSaveStatus == false) || (this.ItemManufactureSaveStatus == false) || (this.ItemMrpSaveStatus == false) || (this.ItemCpSaveStatus == false) || (this.ItemSpSaveStatus == false) || (this.ItemGroupSaveStatus == false) || (this.ItemCategorySaveStatus == false) || (this.ItemSubCategorySaveStatus == false) || (this.ItemNatureSaveStatus == false) || (this.ItemTaxSaveStatus == false)) {
			document.getElementById("closebtnEdit").style.pointerEvents="none";
			if (this.ItemNameSaveStatus == false) {
				this.itemNameSaveError=true;
			}
			if (this.ItemBrandSaveStatus == false) {
				this.itemBrandSaveError=true;
			}
			if (this.ItemManufactureSaveStatus == false){
				this.itemManufactureSaveError=true;
			}
			if (this.ItemMrpSaveStatus == false) {
				this.itemMrpSaveError=true;
			}
			if (this.ItemCpSaveStatus == false) {
				this.ItemCpSaveStatus=true;
			}
			if (this.ItemSpSaveStatus == false) {
				this.saveItemSpIcon=true;
			}
			if (this.ItemGroupSaveStatus == false) {
				this.itemGroupSaveError=true;
			}
			if (this.ItemCategorySaveStatus == false) {
				this.itemCategorySaveError=true;
			}
			if (this.ItemSubCategorySaveStatus == false) {
				this.itemSubCategorySaveError=true;
			}
			if (this.ItemNatureSaveStatus == false) {
				this.ItemNatureSaveStatus=true;
			}
			if (this.ItemTaxSaveStatus == false) {
				this.ItemTaxSaveStatus=true;
			}
		}
		else{
			document.getElementById("editItemContainer").style.marginTop="0px";
			document.getElementById("closebtnEdit").style.pointerEvents="auto";
		}
	}

	cancel() {
		
		document.getElementById("applyOfferOverlay").style.height = "0%";
	}

	editImagesOverlayAction(action){
		if (action!='close') {
			document.getElementById("editImagesOverlay").style.height = "100%";
		}
		else {
			document.getElementById("editImagesOverlay").style.height = "0%";
		}
	}
}
