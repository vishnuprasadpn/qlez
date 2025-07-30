import { Component } from '@angular/core';
import { ItemAdditionService } from './ItemAddition.service';

@Component({
	selector: 'item-addition',
	templateUrl: './ItemAddition.component.html',
	styleUrls: ['./ItemAddition.component.css']
})

export class ItemAdditionComponent {
	itemCodeErrorMessage:boolean;itemBrandErrorMessage:boolean;itemNameErrorMessage:boolean;
	itemManufacturerErrorMessage:boolean;itemMRPErrorMessage:boolean;itemMRPLowMessage:boolean;
	itemCPErrorMessage:boolean;itemCPExceedMRPMessage:boolean;itemCPLessthanSPMessage:boolean;
	itemSPErrorMessage:boolean;itemSPExceedMRPMessage:boolean;itemSPLessthanCPMessage:boolean;
	itemTaxErrorMessage:boolean;itemTaxExceededMessage:boolean;selectGroupMessage:boolean;
	selectCatgeoryMessage:boolean;selectSubCatgeoryMessage:boolean;selectNatureMessage:boolean;
	mainHeadErrorMessage:boolean;subHeadErrorMessage:boolean;descriptionErrorMessage:boolean;
	colorErrorMessage:boolean;imageLinksErrorMessage:boolean;

	// DIV VIEWS 
	loadingProgress:boolean;successMessage:boolean;failedMessage:boolean;
	noFeaturesMessage:boolean;noImagesMessage:boolean;
	addFeatureOverlayStatus: boolean;addImagesOverlayStatus: boolean;

	//declaring all the inputs as boolean
	defaultNature: boolean;
	itemCodeStatus: boolean;itemBrandStatus: boolean;itemNameStatus: boolean;itemManufacturerStatus: boolean;
	itemMRPStatus: boolean;itemSPStatus: boolean;itemTaxStatus: boolean;itemGroupStatus: boolean;
	itemCategoryStatus: boolean;itemSubCategoryStatus: boolean;itemNatureStatus: boolean;
	itemFeatureStatus: boolean;itemColorStatus: boolean;itemImagesStatus: boolean;
	imageLinksStatus: boolean;itemCPStatus: boolean;itemAdditionstatus: boolean;
	addFeatureSaveStatus: boolean;mainHeadStatus: boolean;subHeadStatus: boolean;featureDescStatus: boolean;

	//initializing count as zero  
	count = 0;

	//INPUT VALUE STORAGE
	itemCodeValue: any;itemBrandValue: any;itemNameValue: any;itemManufacturerValue: any;
	itemMRPValue: any;itemSPValue: any;itemCPValue: any;itemTaxValue: any;itemGroupValue: any;
	itemCategoryValue: any;itemSubCategoryValue: any;itemNatureValue: any;itemImagesValue: any;
	currentColor: any;currentMainHeading: any;currentSubHeading: any;currentDescription: any;
	links: any;images: any;itemFeature: any;subHead: any;
	
	//Dropdown managing 
	menStatus: any; womenStatus: any;
	topStatus: any; bottomStatus: any; shoeStatus: any;

	tShirtStatus: any; shirtStatus: any; jacketStatus: any; shortsStatus: any;
	trousersStatus: any; leggingsStatus: any; shoesStatus: any; shoeAccStatus: any;
	skirtsStatus: any; cropStatus: any; nTrousersStatus: any; skortStatus: any;

	colors: any;validNumber: any;

	constructor(private itemAdditionService: ItemAdditionService) {
		this.resetAll();
		this.colors = ["Aliceblue", "Antiquewhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "Blanchedalmond", "Blue", "Blueviolet", "Brown", "Burlywood", "Cadetblue", "Chartreuse", "Chocolate", "Coral", "Cornflowerblue", "Cornsilk", "Crimson", "Cyan", "Darkblue", "Darkcyan", "Darkgoldenrod", "Darkgray", "Darkgreen", "Darkgrey", "Darkkhaki", "Darkmagenta", "Darkolivegreen", "Darkorange", "Darkorchid", "Darkred", "Darksalmon", "Darkseagreen", "Darkslateblue", "Darkslategray", "Darkslategrey", "Darkturquoise", "Darkviolet", "Deeppink", "Deepskyblue", "Dimgray", "Dimgrey", "Dodgerblue", "Firebrick", "Floralwhite", "Forestgreen", "Fuchsia", "Gainsboro", "Ghostwhite", "Gold", "Goldenrod", "Gray", "Green", "Greenyellow", "Grey", "Honeydew", "Hotpink", "Indianred", "Indigo", "Ivory", "Khaki", "Lavender", "Lavenderblush", "Lawngreen", "Lemonchiffon", "Lightblue", "Lightcoral", "Lightcyan", "Lightgoldenrodyellow", "Lightgray", "Lightgreen", "Lightgrey", "Lightpink", "Lightsalmon", "Lightseagreen", "Lightskyblue", "Lightslategray", "Lightsteelblue", "Lightyellow", "Lime", "Limegreen", "Linen", "Magenta", "Maroon", "Mediumaquamarine", "Mediumblue", "Mediumorchid", "Mediumpurple", "Mediumseagreen", "Mediumslateblue", "Mediumspringgreen", "Mediumturquoise", "Mediumvioletred", "Midnightblue", "Mintcream", "Mistyrose", "Moccasin", "Navajowhite", "Navy", "Oldlace", "Olive", "Olivedrab", "Orange", "Orangered", "Orchid", "Palegoldenrod", "Palegreen", "Paleturquoise", "Palevioletred", "Papayawhip", "Peachpuff", "Peru", "Pink", "Plum", "Powderblue", "Purple", "Rebeccapurple", "Red", "Rosybrown", "Royalblue", "Saddlebrown", "Salmon", "Sandybrown", "Seagreen", "Seashell", "Sienna", "Silver", "Skyblue", "Slateblue", "Slategray", "Slategrey", "Snow", "Springgreen", "Steelblue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "Whitesmoke", "Yellow", "Yellowgreen"];
		this.itemAdditionstatus = this.defaultNature = false;
		this.validNumber = new RegExp(/^\d*\.?\d*$/);
	}
	
	resetAll() {
		//LOCAL STORAGE INITIALISING
		this.successMessage = this.failedMessage = this.addFeatureOverlayStatus = this. addImagesOverlayStatus = false;
		this.itemFeature = new Object();
		this.itemImagesValue = new Object();
		this.images = [""];
		this.subHead = new Object();
		this.resetAllFormInputStatus();
	}

	resetAllFormInputStatus(){
		//FORM INPUT VALUE STATUS
		this.itemCodeStatus = false;this.itemBrandStatus = false;this.itemNameStatus = false;
		this.itemManufacturerStatus = false;this.itemMRPStatus = false;	this.itemCPStatus = false;
		this.itemSPStatus = false;this.itemTaxStatus = false;this.itemGroupStatus = false;
		this.itemCategoryStatus = false;this.itemSubCategoryStatus = false;this.itemNatureStatus = false;
		this.itemImagesStatus = false;this.itemFeatureStatus = false;
		this.mainHeadStatus = false;this.subHeadStatus = false;this.featureDescStatus = false;

		//DROPDOWN SELECTOR VALUE STATUS
		this.menStatus = false;this.womenStatus = false;
		this.topStatus = true;this.bottomStatus = true;	this.shoeStatus = true;
		this.addFeatureOverlayStatus = false;this.addImagesOverlayStatus = false;
	}

	//ITEMCODE VALIDATION
	validateItemCode(itemCode) {
		
		var itemcode = itemCode.value;
		if (itemcode == "") {
			this.itemCodeErrorMessage = true;
			this.itemCodeStatus = false;
		}
		else {
			this.itemCodeErrorMessage = false;
			this.itemCodeValue = itemcode.toUpperCase();
			this.itemCodeStatus = true;
		}
	}
	selectItemCode() {	this.itemCodeErrorMessage = false;	}

	//ITEM-BRAND VALIDATION 
	validateItemBrand(itemBrand) {
		var itembrand = itemBrand.value;
		if (itembrand == "") {
			this.itemBrandErrorMessage = true;
			this.itemBrandStatus = false;
		}
		else {
			this.itemBrandErrorMessage = false;
			this.itemBrandStatus = true;
			this.itemBrandValue = itembrand.toUpperCase();
		}
	}
	selectItemBrand() {	this.itemBrandErrorMessage = false;	}

	//ITEM-NAME VALIDATION
	validateItemName(itemName) {
		var itemname = itemName.value;
		if (itemname == "") {
			this.itemNameErrorMessage = true;
			this.itemNameStatus = false;
		}
		else {
			this.itemNameErrorMessage = false;
			this.itemNameValue = itemname.toUpperCase();
			this.itemNameStatus = true;
		}
	}
	selectItemName() {	this.itemNameErrorMessage = false;	}

	//ITEM-MANUFACTURER VALIDATION
	validateItemManufacturer(itemManufacture) {
		var itemM = itemManufacture.value;
		if (itemM == "") {
			this.itemManufacturerErrorMessage = true;
			this.itemManufacturerStatus = false;
		}
		else {
			this.itemManufacturerErrorMessage = false;
			this.itemManufacturerValue = itemM.toUpperCase();
			this.itemManufacturerStatus = true;
		}
	}
	selectItemManufacturer() {	this.itemManufacturerErrorMessage = false;	}

	//ITEM-MRP VALIDATION
	validateItemMRP(itemMrp) {
		itemMrp.value = Number(itemMrp.value).toFixed(2);
		var itemMRP = itemMrp.value;

		//checking whether mrp field is empty or less than one
		if (isNaN(itemMRP)) {
			this.itemMRPErrorMessage = true;
			this.itemMRPStatus = this.itemMRPLowMessage = false;
		}
		else if (itemMRP == "" || itemMRP < 1) {
			this.itemMRPErrorMessage = true;
			this.itemMRPStatus = this.itemMRPLowMessage = false;
		}
		//if mrp field is not empty or greater than one then we need to compare with CP and SP
		else {
			this.itemMRPErrorMessage = false;
			this.itemMRPValue = parseFloat(itemMRP);

			//if SP field is not empty then we need to check MRP is grater than SP or not
			//if SP is grater error message should show   
			if (this.itemSPValue != 0 && this.itemSPValue > this.itemMRPValue) {
				this.itemMRPLowMessage = true;
			}
			else if (this.itemCPValue != 0 && this.itemCPValue > this.itemMRPValue) {
				this.itemMRPLowMessage = true;				
			}
			else {
				this.itemSPExceedMRPMessage = this.itemCPExceedMRPMessage =	this.itemMRPLowMessage = false;
				this.itemMRPStatus = true;
			}
		}
	}
	selectItemMRP() {	this.itemMRPLowMessage = this.itemMRPErrorMessage = false;	}

	//ITEM-CP VALIDATION
	validateItemCP(itemCp) {
		itemCp.value = Number(itemCp.value).toFixed(2);
		var itemCP = itemCp.value;
		// checking whether that field is empty or NaN
		if (isNaN(itemCP) || itemCP == "") {
			this.itemCPErrorMessage = true;
			this.itemCPStatus = this.itemCPLessthanSPMessage = this.itemCPExceedMRPMessage = false;
		}
		// if CP is grater than MRP then  error message should be shown 
		else if (parseFloat(itemCp.value) > parseFloat(this.itemMRPValue)) {
			this.itemCPExceedMRPMessage = true;
			this.itemCPStatus = this.itemCPLessthanSPMessage = this.itemCPErrorMessage = false;
		}
		//if CP is less than SP then Error message should be shown 
		else if (parseFloat(this.itemSPValue) < parseFloat(itemCp.value)) {
			this.itemCPLessthanSPMessage = true;
			this.itemCPStatus = this.itemMRPLowMessage = this.itemCPExceedMRPMessage = this.itemCPErrorMessage = false;
		}
		else {
			this.itemCPLessthanSPMessage = this.itemCPErrorMessage = this.itemSPLessthanCPMessage = this.itemMRPLowMessage = false;
			this.itemCPValue = parseFloat(itemCp.value);
			this.itemCPStatus = true;
		}
	}
	selectItemCP() {	this.itemCPLessthanSPMessage = this.itemCPExceedMRPMessage = this.itemCPErrorMessage = false;	}

	//ITEM-SP VALIDATION
	validateItemSP(itemSp) {
		itemSp.value = Number(itemSp.value).toFixed(2);
		var itemSP = itemSp.value;
		//checking wether the field is empty or not
		if (isNaN(itemSp.value) || itemSP == "") {
			this.itemSPErrorMessage = true;
			this.itemSPStatus = this.itemSPLessthanCPMessage = this.itemSPExceedMRPMessage = false;
		}
		//if its not Empty then checking entered value is grater than MRP or not 
		else if (parseFloat(itemSP) > parseFloat(this.itemMRPValue)) {
			this.itemSPExceedMRPMessage = true;
			this.itemSPStatus =	this.itemSPLessthanCPMessage = this.itemSPErrorMessage = false;
		}
		// checking the  entered value is less than CP 
		else if (parseFloat(itemSP) < parseFloat(this.itemCPValue)) {
			this.itemSPLessthanCPMessage = true;
			this.itemSPStatus = this.itemSPErrorMessage = this.itemMRPLowMessage = false;
		}
		else {	
			this.itemSPErrorMessage = this.itemSPExceedMRPMessage = this.itemCPLessthanSPMessage = this.itemMRPLowMessage = false;
			this.itemSPValue = parseFloat(itemSP);
			this.itemSPStatus = true;
		}
	}
	selectItemSP() {	this.itemSPErrorMessage = this.itemSPExceedMRPMessage = this.itemSPLessthanCPMessage = false;	}

	validateItemTax(itemTax) {
		//this.itemTaxExceededMessage = false;
		//this.itemTaxErrorMessage = false;

		var itemTx = itemTax.value;
		if (isNaN(itemTax.value) || itemTx == "DEFAULT") {
			this.itemTaxErrorMessage = true;
			this.itemTaxStatus = false;
			this.itemTaxExceededMessage = false;
		}
		//tax should be less than 100
		// else if (parseFloat(itemTx) > 99) {
		// 	itemTax.value = Number(itemTax.value).toFixed(2);
		// 	this.itemTaxExceededMessage = true;
		// 	this.itemTaxStatus = false;
		// }
		else {
			this.itemTaxErrorMessage = this.itemTaxExceededMessage = false;
			this.itemTaxValue = itemTx;
			this.itemTaxStatus = true;
		}
	}
	selectItemTax() {	this.itemTaxExceededMessage = this.itemTaxErrorMessage = false;	}

	validateGroup(group, categoryKey, subCategoryKey, nature) {
		
		this.itemGroupStatus = true;
		this.itemGroupValue = group.value.toUpperCase();
		
		categoryKey.value = "Select Any Category";
		subCategoryKey.value = "Select Any Sub-category";
		nature.value = "Select Any Nature";

		categoryKey.style.pointerEvents = "none";
		subCategoryKey.style.pointerEvents = "none";
		nature.style.pointerEvents = "none";
		
		if (this.itemGroupValue != "" && this.itemGroupValue != undefined && this.itemGroupValue != null) {
			categoryKey.style.pointerEvents = "auto";
		}
		else {
			categoryKey.style.pointerEvents = "none";
		}


		if (this.itemGroupValue == "Men") {
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
	selectGroup() {	this.selectGroupMessage = false;	}

	//validating selected category
	validateCategory(category, subCategoryKey, nature) {

		this.itemCategoryStatus = true;
		this.itemCategoryValue = category.value.toUpperCase();
		this.defaultNature = true;

		//initially subcategory and nature should show 
		subCategoryKey.value = "Select Any Sub-category";
		nature.value = "Select Any Nature";

		//if item category is not empty then subcategory should be enabled
		if (this.itemCategoryValue != "" && this.itemCategoryValue != undefined && this.itemCategoryValue != null) {
			subCategoryKey.style.pointerEvents = "auto";
		}

		//if category is empty then subcategory and nature should be disabled
		else {
			subCategoryKey.style.pointerEvents = "none";
			nature.style.pointerEvents = "none";
		}


		this.shortsStatus = false; this.tShirtStatus = false; this.shirtStatus = false;
		this.jacketStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;

		//enabling subcategory according to the category
		if (this.itemCategoryValue == "Tops") {
			this.topStatus = true; this.bottomStatus = false; this.shoeStatus = false;
		}
		else if (this.itemCategoryValue == "Bottoms") {
			this.bottomStatus = true; this.topStatus = false; this.shoeStatus = false;
		}
		else {
			this.shoeStatus = true; this.bottomStatus = false; this.topStatus = false;
		}
	}
	selectCategory() {	this.selectCatgeoryMessage = false;	}

	//validating sub category value 
	validateSubCategory(subCategory,nature) {

		//Enabling subcategory status true
		this.itemSubCategoryStatus = true;
		this.itemSubCategoryValue = subCategory.value.toUpperCase();

		//making nature value to default that is choose any nature
		this.defaultNature = true;

		//checking wether the subcategoty value is not empty if its not empty then enabling nature field
		if (this.itemSubCategoryValue != "" && this.itemSubCategoryValue != undefined && this.itemSubCategoryValue != null) {
			nature.style.pointerEvents = "auto";
		}

		//if subcategory is empty then nature field should be disable 
		else {
			nature.style.pointerEvents = "none";
		}

		//enabling naute according to sub category
		if (this.itemSubCategoryValue == "T-Shirt") {
			this.tShirtStatus = true; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		}
		else if (this.itemSubCategoryValue == "Shirt") {
			this.shirtStatus = true; this.tShirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		}
		else if (this.itemSubCategoryValue == "Jacket") {
			this.jacketStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		}
		else if (this.itemSubCategoryValue == "Shorts") {
			this.shortsStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		}
		else if (this.itemSubCategoryValue == "Trousers") {
			this.trousersStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		}
		else if (this.itemSubCategoryValue == "Leggings") {
			this.leggingsStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.shoesStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		}
		else if (this.itemSubCategoryValue == "Shoes") {
			this.shoesStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoeAccStatus = false; this.skirtsStatus = false;
		}
		else if (this.itemSubCategoryValue == "Shoes Accessories") {
			this.shoeAccStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.skirtsStatus = false;
		}
		else {
			this.skirtsStatus = true; this.tShirtStatus = false; this.shirtStatus = false; this.jacketStatus = false; this.shortsStatus = false; this.trousersStatus = false; this.leggingsStatus = false; this.shoesStatus = false; this.shoeAccStatus = false;
		}
	}
	selectSubCategory() {	this.selectSubCatgeoryMessage = false;	}

	//validating nature 
	validateNature(nature) {	
		this.itemNatureStatus = true; 
		this.itemNatureValue = nature.value.toUpperCase();
	}
	selectNature() {	this.selectNatureMessage = false;	}

	//function for opening feature overlay 
	addFeatures(itemEntryForm) {
		//this.mainHeadErrorMessage = this.subHeadErrorMessage = this.descriptionErrorMessage = this.noFeaturesMessage = false;
		
		//checking wether overlay is open or not if the overlay is closed then it shouls be open
		if (!this.addFeatureOverlayStatus) {
			this.addFeatureOverlayStatus = true;
			itemEntryForm.style.display = "none";
		}
		else {
			this.addFeatureOverlayStatus = false;
			itemEntryForm.style.display = "block";
			//mainHeadFeature.value = subHeadFeature.value = featureDescription.value = "";
		}
	}

	//add image overlay opening and closing fn 
	addImages(itemEntryForm) {
		this.itemColorStatus = this.imageLinksStatus = this.colorErrorMessage = this.imageLinksErrorMessage = false;

		//if overlay is closed then it should be open
		if (this.addImagesOverlayStatus == false) {
			itemEntryForm.style.display = "none";
			this.addImagesOverlayStatus = true;
		}
		else {
			itemEntryForm.style.display = "block";
			this.addImagesOverlayStatus = false;
		}
	}

	//validating main heading of feature
	validateMainHeadFeature(heading) {
		//if heading is empty then error msg should be popup
		if (heading.value == "") {
			this.mainHeadErrorMessage = true;
		}
		else {
			this.mainHeadErrorMessage = false;
			this.mainHeadStatus = true;
			this.currentMainHeading = heading.value.toUpperCase();
		}
	}

	//Validating sub feature
	validateSubHeadFeature(subHeading) {
		if (subHeading.value == "") {
			this.subHeadErrorMessage = true;
		}
		else {
			this.subHeadErrorMessage = false;
			this.subHeadStatus = true;
			this.currentSubHeading = subHeading.value.toUpperCase();
		}
	}

	//validating discription
	validateDescription(descrp) {
		if (descrp.value == "") {
			this.descriptionErrorMessage = true;
		}
		else {
			this.descriptionErrorMessage = false;
			this.featureDescStatus = true;
			this.currentDescription = descrp.value.toUpperCase();
		}
	}

	//save feature
	saveFeature(mainHeadFeature, subHeadFeature, featureDecription, option, newSub,itemEntryForm) {
		this.noFeaturesMessage = false;		
		this.count = this.count++;
		this.subHead[this.currentSubHeading] = this.currentDescription;
		console.log("start feature");
		console.log(this.subHead);
		//checking all the Feature fields are valid or not
		if (this.subHeadStatus != true || this.featureDescStatus != true || this.mainHeadStatus != true) {
			if (this.subHeadStatus != true) {
				this.subHeadErrorMessage = true;
			}
			if (this.featureDescStatus != true) {
				this.descriptionErrorMessage = true;
			}
			if (this.mainHeadStatus != true) {
				this.mainHeadErrorMessage = true;
			}
		}
		else {
			this.subHeadErrorMessage = this.descriptionErrorMessage = this.mainHeadErrorMessage = false;

			//for adding additional subfeature 
			if (newSub == 'new-sub') {
				subHeadFeature.value = featureDecription.value = "";
				this.itemFeature[this.currentMainHeading] = this.subHead;
			}

			//closing overlay
			if (option == 'close') {
				mainHeadFeature.value = subHeadFeature.value = featureDecription.value = "";			
				this.addFeatureOverlayStatus = false;
				this.itemFeature[this.currentMainHeading] = this.subHead;
				itemEntryForm.style.display = "block";
			}

			//Adding  additional main feature
			if (option == 'new-main') {
				this.itemFeature[this.currentMainHeading] = this.subHead;
				mainHeadFeature.value = subHeadFeature.value = featureDecription.value = "";
				this.subHead = new Object();
			}
			featureDecription.value = "";
			this.subHeadStatus = this.featureDescStatus = false;
			this.itemFeatureStatus = true;
		}
	}

	//validating color
	validateItemColor(color) {
		if (color.value != "" && color.value != "Select Color") {
			this.itemColorStatus = true;
			this.currentColor = color.value.toUpperCase();
			this.colorErrorMessage = false;
		}
		else {
			this.colorErrorMessage = true;
		}
	}

	//validating links
	validateLinks(links) {
		if (links.value == "") {
			this.imageLinksErrorMessage = true;
		}
		else {
			this.imageLinksErrorMessage = false;
			this.imageLinksStatus = true;
			this.links = links.value.toUpperCase();
		}
	}

	//SAVE IMAGE VALUES LOCALLY
	saveProductImages(color, links, option,itemEntryForm) {
		this.validateItemColor(color);
		this.validateLinks(links);

		if (this.itemColorStatus == true && this.imageLinksStatus == true) {
			var images = [];

			this.noImagesMessage = false;
			this.links.split(/\s*,\s*/).forEach(function (imgLink) {
				images.push(imgLink);
			});

			var imgObj = new Object();
			this.itemImagesValue[this.currentColor] = images;

			if (this.itemImagesValue.length != 0) {
				this.itemImagesStatus = true;
			}
			else {
				this.itemImagesStatus = false;
			}

			if (option == 'close') {
				itemEntryForm.style.display = "block";
				this.addImagesOverlayStatus = false;
			}
			color.value = "";
			links.value = "";
		}
	}

	//SAVE ITEM TO DATABASE
	saveItem(itemCode, itemBrand, itemName, itemManufacturer, itemMRP, itemCP, itemSP, itemTax, groupKey, categoryKey, subCategoryKey, nature,itemEntryForm) {
		this.validateItemCode(itemCode);
		this.validateItemBrand(itemBrand);
		this.validateItemName(itemName);
		this.validateItemManufacturer(itemManufacturer);

		if (itemMRP.value != "" && itemMRP.value != NaN) {
			this.validateItemMRP(itemMRP);
		}
		else {
			this.itemMRPErrorMessage = true;
		}

		if (itemSP.value != "" && itemSP.value != NaN) {
			this.validateItemSP(itemSP);
		}
		else {
			this.itemSPErrorMessage = true;
		}

		if (itemCP.value != "" && itemCP.value != NaN) {
			this.validateItemCP(itemCP);
		}
		else {
			this.itemCPErrorMessage = false;
		}

		this.validateItemTax(itemTax);

		if (groupKey.value == "Select Any Group") {
			this.selectGroupMessage =  true;
		}

		if (categoryKey.value == "Select Any Category") {
			this.selectCatgeoryMessage = true;
		}

		if (subCategoryKey.value == "Select Any Sub-category") {
			this.selectSubCatgeoryMessage = true;
		}

		if (nature.value == "Select Any Nature") {
			this.selectNatureMessage = true;
		}

		if (this.itemFeatureStatus == false) {
			this.noFeaturesMessage = true;
		}
		if (this.itemImagesStatus == false) {
			this.noImagesMessage = true;
		}

		//checking all the fields
		if (this.itemCodeStatus == true && this.itemBrandStatus == true && this.itemNameStatus == true && this.itemManufacturerStatus == true && this.itemSPStatus == true && this.itemTaxStatus == true && this.itemGroupStatus == true && this.itemCategoryStatus == true && this.itemSubCategoryStatus == true && this.itemNatureStatus == true && this.itemImagesStatus == true && this.itemFeatureStatus == true) {
			this.loadingProgress = true;
			itemEntryForm.style.display = "none";
			var item = {
				item_brand: this.itemBrandValue,
				item_category: this.itemCategoryValue,
				item_code: this.itemCodeValue,
				item_cp: this.itemCPValue,
				item_desc: this.itemFeature,
				item_group: this.itemGroupValue,
				item_imagelinks: this.itemImagesValue,
				item_manufacturer: this.itemManufacturerValue,
				item_mrp: this.itemMRPValue,
				item_name: this.itemNameValue,
				item_nature: this.itemNatureValue,
				item_sp: this.itemSPValue,
				item_subcategory: this.itemSubCategoryValue,
				item_tax: this.itemTaxValue,
				offer_id: null,
				reward_x: 0
			}
			
			console.log("items details");
			console.log(item);
			//passing all the values to addition service
			this.itemAdditionService.addItem(item);

			setTimeout(() => {
				this.itemAdditionstatus = this.itemAdditionService.getItemAdditionStatus();
				if (this.itemAdditionstatus == true) {
					this.successMessage = true;
					this.failedMessage = false;
				}
				else {
					this.failedMessage =true;
					this.successMessage = false;
				}
				this.loadingProgress = false;

			}, 8000);
			this.resetAll();
		}
	}

	clearAll(itemCode, itemBrand, itemName, itemManufacturer, itemMRP, itemCP, itemSP, itemTax, group, category, subCategory, nature,itemEntryForm) {
		itemEntryForm.style.display = "block";
		itemBrand.value = itemCode.value = itemName.value = itemManufacturer.value = "";
		itemMRP.value = itemCP.value = itemSP.value = itemTax.value = "";
		group.value = "Select Any Group";
		category.value = "Select Any Category";
		subCategory.value = "Select Any Sub-category";
		nature.value = "Select Any Nature";

		this.itemCodeErrorMessage =	this.itemBrandErrorMessage = this.itemNameErrorMessage = this.itemManufacturerErrorMessage = false;
		this.itemCPLessthanSPMessage = this.itemMRPErrorMessage = this.itemCPErrorMessage = this.itemSPErrorMessage = false;
		this.itemTaxErrorMessage = this.selectGroupMessage = this.selectCatgeoryMessage = this.selectSubCatgeoryMessage = false;
		this.selectNatureMessage = this.noFeaturesMessage = this.noImagesMessage = this.loadingProgress = false;
		this.itemMRPLowMessage = this.itemSPExceedMRPMessage = this.itemCPExceedMRPMessage = false;

		this.resetAll();
	}

	//failed or success message
	// closeMessage(itemCode, itemBrand, itemName, itemManufacturer, itemMRP, itemCP, itemSP, itemTax, group, category, subCategory, nature, callFor) {
	// 	if (this.itemAdditionstatus == false) {
	// 		this.failedMessage = false;
	// 	}
	// 	else {
	// 		this.successMessage = false;
	// 		this.itemAdditionstatus = false;
	// 		this.clearAll(itemCode, itemBrand, itemName, itemManufacturer, itemMRP, itemCP, itemSP, itemTax, group, category, subCategory, nature);
	// 	}
	// }

	cancelImageEntry(itemEntryForm){
		this.addImagesOverlayStatus = false;
		itemEntryForm.style.display = "block";
	}

}