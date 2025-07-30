import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProductAdditionService } from './ProductAddition.service';

@Component({
  selector: 'product-addition',
  templateUrl: './ProductAddition.component.html',
  styleUrls: ['./ProductAddition.component.css']
})
export class ProductAdditionComponent {
	loadingProgress:boolean;
	successMessage:boolean;
	failedMessage:boolean;
	countErrorMessage:boolean;
	itemcodeErrorMessage:boolean;
	wrongItemcodeMessage:boolean;
	selectNewColorLabel:boolean;
	itemColorErrorMessage:boolean;
	sizeErrorMessage:boolean;
	dateErrorMessage:boolean;
	refreshText:boolean;spinRefreshIcon:boolean;


	singleEntryOverlayStatus:boolean;
	bulkEntryOverlayStatus:boolean;
	productAdditionStatus:boolean;

	itemcodeStatus:boolean;
	itemcolorStatus:boolean;
	itemsizeStatus:boolean;
	expiryDateStatus:boolean;
	bulkCountValue:boolean;

	itemCodeValue:any;
	itemColorValue:any;
	productSizeValue:any;
	expiryDateValue:any;
	itemCount:any;
	colors:any;
	idCountScanned:any;
	allcolors:any;
	itemsCodesList:any;
	colorValue:any;
	constructor(private productAdditionService:ProductAdditionService){
		this.refreshText =true;
		this.singleEntryOverlayStatus = false;
		this.bulkEntryOverlayStatus = false;
		this.itemcodeStatus = false;
		this.itemcolorStatus = false;
		this.itemsizeStatus = false;
		this.expiryDateStatus = false;
		this.idCountScanned=1;
		this.allcolors=["Aliceblue","Antiquewhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","Blanchedalmond","Blue","Blueviolet","Brown","Burlywood","Cadetblue","Chartreuse","Chocolate","Coral","Cornflowerblue","Cornsilk","Crimson","Cyan","Darkblue","Darkcyan","Darkgoldenrod","Darkgray","Darkgreen","Darkgrey","Darkkhaki","Darkmagenta","Darkolivegreen","Darkorange","Darkorchid","Darkred","Darksalmon","Darkseagreen","Darkslateblue","Darkslategray","Darkslategrey","Darkturquoise","Darkviolet","Deeppink","Deepskyblue","Dimgray","Dimgrey","Dodgerblue","Firebrick","Floralwhite","Forestgreen","Fuchsia","Gainsboro","Ghostwhite","Gold","Goldenrod","Gray","Green","Greenyellow","Grey","Honeydew","Hotpink","Indianred","Indigo","Ivory","Khaki","Lavender","Lavenderblush","Lawngreen","Lemonchiffon","Lightblue","Lightcoral","Lightcyan","Lightgoldenrodyellow","Lightgray","Lightgreen","Lightgrey","Lightpink","Lightsalmon","Lightseagreen","Lightskyblue","Lightslategray","Lightsteelblue","Lightyellow","Lime","Limegreen","Linen","Magenta","Maroon","Mediumaquamarine","Mediumblue","Mediumorchid","Mediumpurple","Mediumseagreen","Mediumslateblue","Mediumspringgreen","Mediumturquoise","Mediumvioletred","Midnightblue","Mintcream","Mistyrose","Moccasin","Navajowhite","Navy","Oldlace","Olive","Olivedrab","Orange","Orangered","Orchid","Palegoldenrod","Palegreen","Paleturquoise","Palevioletred","Papayawhip","Peachpuff","Peru","Pink","Plum","Powderblue","Purple","Rebeccapurple","Red","Rosybrown","Royalblue","Saddlebrown","Salmon","Sandybrown","Seagreen","Seashell","Sienna","Silver","Skyblue","Slateblue","Slategray","Slategrey","Snow","Springgreen","Steelblue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","Whitesmoke","Yellow","Yellowgreen"];
		this.bulkCountValue=false;	
		//this.itemsCodesList = this.productAdditionService.getAllItemCodesList().itemCodeList;
	}

	selectColor(color){
		console.log("selecte d color");
		this.colorValue=color.value;
		console.log(color.value);
		console.log("sdadadasdad");
		if(this.selectNewColorLabel){
			this.selectNewColorLabel = false;
			document.getElementById("colorIcon").style.paddingTop="24px";
		}
		if(color.value!="Select Color" && color.value!=""){
			this.itemColorErrorMessage = false;
			this.itemColorValue=color.value;
			this.itemcolorStatus = true;
			if(color.value=="addNewColor"){
				document.getElementById("colorIcon").style.paddingTop="51px";
				document.getElementById("newColorSelector").style.display="block";
				this.selectNewColorLabel = true;
				document.getElementById("selectEColor").style.display="none";
				this.itemcolorStatus=false;
			}
		}
		else{
			this.itemColorErrorMessage = true;
		}
	}

	validateItemCode(itemcode){
		this.itemCodeValue = itemcode.value;
  		if(this.itemCodeValue==""){
			  this.itemcodeErrorMessage =true;
			  this.wrongItemcodeMessage = false;
  		}
  		else{
  			var validItemcode = false;
  			var category;
  			for(var i=0;i<this.itemsCodesList.length;i++){
  				if(this.itemsCodesList[i].itemCode==this.itemCodeValue){
  					category=this.itemsCodesList[i].itemCategory;
  					this.colors= Object.keys(this.itemsCodesList[i].item_imagelinks);
  					validItemcode =true;
  				}
  			}

  			if(validItemcode==true){
				  this.wrongItemcodeMessage = false;
  				this.itemcodeStatus = true;

  				document.getElementById("selectEColor").style.pointerEvents="auto";
  				document.getElementById("newColorSelector").style.pointerEvents="auto";
  				document.getElementById("clothSizeSelector").style.pointerEvents="auto";
  				document.getElementById("shoeSizeSelector").style.pointerEvents="auto";
  				document.getElementById("productExpiryInput").style.pointerEvents="auto";
  			}
  			else{
				  this.wrongItemcodeMessage =true;
  				document.getElementById("selectEColor").style.pointerEvents="none";
  				document.getElementById("newColorSelector").style.pointerEvents="none";
  				document.getElementById("clothSizeSelector").style.pointerEvents="none";
  				document.getElementById("shoeSizeSelector").style.pointerEvents="none";
  				document.getElementById("productExpiryInput").style.pointerEvents="none";
  				
  			}

  			if(category=="SHOES" ||category=="Shoes"){
  				document.getElementById("shoeSizeSelector").style.display="block";
  				document.getElementById("clothSizeSelector").style.display="none";
  			}
  			else{
  				document.getElementById("clothSizeSelector").style.display="block";
  				document.getElementById("shoeSizeSelector").style.display="none";
  			}

			  this.itemcodeErrorMessage = false;
  		}
	}

	refreshItemList(itemcode){
		this.spinRefreshIcon = true;
		this.refreshText =false;
		this.productAdditionService.refreshItemList();
		setTimeout(() => {
			this.itemsCodesList=this.productAdditionService.getAllItemCodesList().itemCodeList;
			this.spinRefreshIcon = false;
			this.refreshText =true;
			this.validateItemCode(itemcode);
		}, 4000);		
	}

	clothSizeSelected(size){	
		this.itemsizeStatus = true;
		this.sizeErrorMessage = false;
	}

	shoeSizeSelected(size){
		this.itemsizeStatus = true;
		this.sizeErrorMessage = false;
	}

	validateDate(date){
		var m = date.value.match(/(\d{4})-(\d{2})-(\d{2})/);
		var thisYear = new Date().getFullYear(); //YEAR NOW
		var maxYear = thisYear+5; //MAX YEAR
		var minYear	= thisYear; //MIN YEAR
		var cdate = new Date().getDate();
		var cmonth= new Date().getMonth();
		this.dateErrorMessage = false;
		// YEAR CHECK
		if(m != null){
			document.getElementById("expiryDateLabel").style.display="none";
			if( (m[1].length < 4) || m[1] > maxYear || m[1] > thisYear){
				this.dateErrorMessage = true;
	  		}
	  		else{
	  			if( (m[2].length < 2) || m[2] < 1 || m[2] > 12 || m[2]<cmonth){
					this.dateErrorMessage = true;	  
		  		}
		  		else{
		  			if( (m[3].length < 2) || m[3] < 1 || m[3] > 31 || m[3]<cdate){
						this.dateErrorMessage = true;
			  		}
			  		else{
			  			if((m[2]==2) && (m[3] >28)){
							this.dateErrorMessage = true;
						}
				  		else{
				  			if((m[1]<minYear)){
								this.dateErrorMessage = true;
							}
				  			else{
								  this.expiryDateStatus = true;
								  this.dateErrorMessage = false;
				  			}
				  		}
				  	}	
		  		}
	  		}		
	  	}						
	  	else{
			this.dateErrorMessage = true;
		}
	}

	resetValue(){
		document.getElementById("selectEColor").style.display="block";
		document.getElementById("newColorSelector").style.display="none";
		this.selectNewColorLabel = false;
	}

	addProduct(itemCode,itemColor,allColor,clothSize,shoeSize,expiryDate){
		if(this.itemCount==undefined || this.itemCount == null){
			this.itemCount=1;
		}
		if(clothSize.value!="Select Size"){
			this.productSizeValue=clothSize.value;
		}
		else{
			this.productSizeValue=shoeSize.value;
		}
		this.validateItemCode(itemCode);
		this.validateDate(expiryDate);
		
		if(this.itemsizeStatus==false){
			this.sizeErrorMessage = true;
		}
		else{
			this.sizeErrorMessage = false;
		}
		
		if(this.itemsizeStatus== true && this.itemcodeStatus == true && this.itemcolorStatus == true && this.expiryDateStatus==true){	
			this.itemCodeValue = itemCode.value;
			this.expiryDateValue = expiryDate.value;  
			this.productAdditionService.addProduct(this.itemCodeValue,this.itemColorValue,this.productSizeValue,this.expiryDateValue,this.itemCount);				
			this.loadingProgress = true;
			document.getElementById("productAddDiv").style.pointerEvents="none";
			setTimeout(() => {
				this.productAdditionStatus = this.productAdditionService.getBulkAdditionStatus();
				this.idCountScanned = this.productAdditionStatus["count"];
				if(this.productAdditionStatus!=undefined){
					if(this.productAdditionStatus["status"] == true){
						this.successMessage =true;
						this.failedMessage = false;
						this.countErrorMessage = false;
						this.itemCount = 1;
					}
					else{
						if(this.productAdditionStatus["reason"]=="Count Miss-match"){
							this.countErrorMessage = true;
							this.failedMessage = false;
							this.successMessage = false;
						}
						else{
							this.countErrorMessage =  false;
							this.successMessage = false;
							this.failedMessage = true;	
						}
					}
				}
				else{
					this.countErrorMessage = false;
					this.successMessage = false;
					this.failedMessage = false;
				}
				this.loadingProgress = false;
				document.getElementById("bulkEntryOverlay").style.height = "0%";
				document.getElementById("productAddDiv").style.pointerEvents="auto";
				this.bulkEntryOverlayStatus = false;
			}, 15000);	
		}
	}

	bulkEntry(){
		if(this.itemsizeStatus== true && this.itemcodeStatus == true && this.itemcolorStatus == true && this.expiryDateStatus==true){
			if(this.bulkEntryOverlayStatus == false){
				document.getElementById("bulkEntryOverlay").style.height = "100%";	
				this.bulkEntryOverlayStatus = true;
			}
			else{
				document.getElementById("bulkEntryOverlay").style.height = "0%";
				this.bulkEntryOverlayStatus = false;
			}
		}
		else{
			if(this.itemsizeStatus== false){
				this.sizeErrorMessage = true;		
			}
			if(this.itemcolorStatus==false){
				this.itemColorErrorMessage = true;
			}
			if(this.expiryDateStatus==false){
				document.getElementById("dateErrorMessage").style.display="block";
			}
			if(this.itemcodeStatus==false){
				this.itemcodeErrorMessage = true;
  			}
		}
	}

	validateCount(count){
		if(count.value !=""){
			if(isNaN(count.value)){
				this.bulkCountValue=true;
			}
			else{
				this.bulkCountValue=false;
			}
		}
		else{
			this.bulkCountValue=true;
		}
	}

	addBulkItems(count,itemCode,itemColor,allColor,clothSize,shoeSize,expiryDate){
		this.validateCount(count);
		if(this.bulkCountValue!=true){
			this.itemCount = count.value;
			this.addProduct(itemCode,itemColor,allColor,clothSize,shoeSize,expiryDate);	
		}
	}

	clearAll(itemCode,productColor,allColor,clothSize,shoeSize){
		
		itemCode.value="";
		this.colorValue=productColor.value=allColor.value="Select Color";
		//expiryDate.value="";
		clothSize.value="Select Size";
		shoeSize.value="Select Size";
		this.singleEntryOverlayStatus = false;
		this.bulkEntryOverlayStatus = false;
		this.itemcodeStatus = false;
		this.itemcolorStatus = false;
		this.itemsizeStatus = false;
		this.expiryDateStatus = false;
		this.idCountScanned=1;
		this.successMessage = false;
	}

}