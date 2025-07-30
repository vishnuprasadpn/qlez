import { Component } from '@angular/core';
import { AdminSDProductService } from './AdminProductDisplay.service';

@Component({
  selector: 'admin-product-display',
  templateUrl: './AdminProductDisplay.component.html',
  styleUrls: ['./AdminProductDisplay.component.css']
})
export class AdminProductDisplayComponent {
  	viewProductOverlayStatus:boolean;
  	productDt:any;
	response:any;
	changesMadeStatus:any;

	productItemcode:any;
	pdtColor:any;
	productName:any;
	productSize:any;
	productExpiry:any;
	xsStatus:boolean;
	sStatus:boolean;
	mStatus:boolean;
	lStatus:boolean;
	xlStatus:boolean;
	xxlStatus:boolean;

	constructor(private adminSDProductService:AdminSDProductService){
		this.productDt={invoice_date: null,item_code: null,pid: null,product_color: null,product_expiry: null,product_size: null,staff_id: null};
		this.viewProductOverlayStatus = false;
		this.xsStatus= false;
		this.sStatus=false;
		this.mStatus=false;
		this.lStatus=false;
		this.xlStatus=false;
		this.xxlStatus=false;
		this.changesMadeStatus=false;
	}

	getProductDetails(){
		document.getElementById("loadingProduct").style.display="block";
		this.adminSDProductService.scanProduct();
		setTimeout(() => {
			this.response = this.adminSDProductService.getScannedProductDt();
			if(this.response["success"] == true){
				this.productDt = this.response["product"];
				console.log(this.productDt);
				document.getElementById("productTable").style.display ="block";
				document.getElementById("failedMessage").style.display ="none";
			}	
			else{
				document.getElementById("failedMessage").style.display ="block";
			}

			document.getElementById("loadingProduct").style.display="none";
		}, 10000);
	}

	editProduct(){
		this.pdtColor = this.productDt["color"];

		this.productExpiry = this.productDt["expiry"].replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$2-$1");
		this.productItemcode = this.productDt["item_code"];
		this.productSize = this.productDt["size"];
		if(this.productSize == "XS"){
			this.xsStatus= true;
			this.sStatus=false;
			this.mStatus=false;
			this.lStatus=false;
			this.xlStatus=false;
			this.xxlStatus=false;
		}
		else if(this.productSize == "S"){
			this.xsStatus= false;
			this.sStatus=true;
			this.mStatus=false;
			this.lStatus=false;
			this.xlStatus=false;
			this.xxlStatus=false;
		}
		else if(this.productSize == "M"){
			this.xsStatus= false;
			this.sStatus=false;
			this.mStatus=true;
			this.lStatus=false;
			this.xlStatus=false;
			this.xxlStatus=false;
		}
		else if(this.productSize== "L"){
			this.xsStatus= false;
			this.sStatus=false;
			this.mStatus=false;
			this.lStatus=true;
			this.xlStatus=false;
			this.xxlStatus=false;
		}
		else if(this.productSize=="XL"){
			this.xsStatus= false;
			this.sStatus=false;
			this.mStatus=false;
			this.lStatus=false;
			this.xlStatus=true;
			this.xxlStatus=false;
		}
		else if(this.productSize == "XXL"){
			this.xsStatus= false;
			this.sStatus=false;
			this.mStatus=false;
			this.lStatus=false;
			this.xlStatus=false;
			this.xxlStatus=true;
		}
	  	if(this.viewProductOverlayStatus == false){
			document.getElementById("productEditOverlay").style.height = "100%";	
			this.viewProductOverlayStatus = true;
		}
		else{
			document.getElementById("productEditOverlay").style.height = "0%";
			this.viewProductOverlayStatus = false;
			this.adminSDProductService.setAdminScannedProductDetails(this.productDt);
			if(this.changesMadeStatus==true){
				this.adminSDProductService.saveProductChanges();
			}			
		}	
	}

	editItemcode(){
		document.getElementById("productItemCode").style.pointerEvents="auto";
  		document.getElementById("productItemCode").style.background="#66AAD6";
  		document.getElementById("productItemCode").style.color="#fff";
  		document.getElementById("saveItemcode").style.display ="block";
		document.getElementById("editItemcode").style.display ="none";
	}

	validateItemcode(itemcode){
		if(itemcode.value!=""){
			document.getElementById("productItemCode").style.border="none";
  			document.getElementById("saveItemcode").style.background ="green";
  			document.getElementById("saveItemcode").style.pointerEvents ="auto";
  			this.productItemcode = itemcode.value;
  			this.productDt["item_code"] = this.productItemcode;
  		}
  		else{
			document.getElementById("productItemCode").style.border="3px solid red";
  			document.getElementById("saveItemcode").style.background ="grey";
  			document.getElementById("saveItemcode").style.pointerEvents ="none";
  		}		
	}
	
	saveItemcode(){
		document.getElementById("productItemCode").style.pointerEvents="none";
  		document.getElementById("productItemCode").style.background="#fff";
  		document.getElementById("productItemCode").style.color="#000";
  		document.getElementById("saveItemcode").style.display ="none";
		document.getElementById("editItemcode").style.display ="block";  		
		this.changesMadeStatus=true;
	}

	editColor(){	
		document.getElementById("productColor").style.pointerEvents="auto";
  		document.getElementById("productColor").style.background="#66AAD6";
  		document.getElementById("productColor").style.color="#fff";
  		document.getElementById("saveColor").style.display ="block";
		document.getElementById("editColor").style.display ="none";
	}
	validateColor(color){
		if(color.value!=""){
			document.getElementById("productColor").style.border="none";
  			document.getElementById("saveColor").style.background ="green";
  			document.getElementById("saveColor").style.pointerEvents ="auto";
  			this.pdtColor = color.value;
  			this.productDt["color"] = this.pdtColor;
  		}
  		else{
			document.getElementById("productColor").style.border="3px solid red";
  			document.getElementById("saveColor").style.background ="grey";
  			document.getElementById("saveColor").style.pointerEvents ="none";
  		}		
	}
	saveColor(){
		document.getElementById("productColor").style.pointerEvents="none";
  		document.getElementById("productColor").style.background="#fff";
  		document.getElementById("productColor").style.color="#000";
  		document.getElementById("saveColor").style.display ="none";
		document.getElementById("editColor").style.display ="block";  			
		this.changesMadeStatus=true;
	}

	editSize(){		
  		document.getElementById("productSize").style.pointerEvents="auto";
		document.getElementById("productSize").style.background="#66AAD6";
  		document.getElementById("productSize").style.color="#fff";
		document.getElementById("saveSize").style.display ="block";
		document.getElementById("editSize").style.display ="none";
	}

	changeSize(size){
		this.productSize = size.value;
		this.productDt["size"] = this.productSize;
	}

	saveSize(){
		document.getElementById("productSize").style.pointerEvents="none";
  		document.getElementById("productSize").style.background="#fff";
  		document.getElementById("productSize").style.color="#000";
  		document.getElementById("saveSize").style.display ="none";
		document.getElementById("editSize").style.display ="block";  					
		this.changesMadeStatus=true;
	}

	editExpiryDate(){
		document.getElementById("productExpiry").style.pointerEvents="auto";
		document.getElementById("productExpiry").style.background="#66AAD6";
  		document.getElementById("productExpiry").style.color="#fff";
		document.getElementById("saveExpiryDate").style.display ="block";
		document.getElementById("editExpiryDate").style.display ="none";
	}

	validateDate(date){
		var m = date.value.match(/(\d{4})-(\d{2})-(\d{2})/);
		var thisYear = new Date().getFullYear(); //YEAR NOW
		var maxYear = 2025; //MAX YEAR
		var minYear	= thisYear; //MIN YEAR
		// YEAR CHECK
		if(m!= null){
			if( (m[1].length < 4) || m[1] > maxYear || m[1] > thisYear){
				document.getElementById("productExpiry").style.border="3px solid red";
  				document.getElementById("saveExpiryDate").style.background ="grey";
  				document.getElementById("saveExpiryDate").style.pointerEvents ="none";
	  		}
	  		else{
	  			if( (m[2].length < 2) || m[2] < 1 || m[2] > 12){
					document.getElementById("productExpiry").style.border="3px solid red";
	  				document.getElementById("saveExpiryDate").style.background ="grey";
	  				document.getElementById("saveExpiryDate").style.pointerEvents ="none";
		  		}
		  		else{
		  			if( (m[3].length < 2) || m[3] < 1 || m[3] > 31){
						document.getElementById("productExpiry").style.border="3px solid red";
  						document.getElementById("saveExpiryDate").style.background ="grey";
  						document.getElementById("saveExpiryDate").style.pointerEvents ="none";
			  		}
			  		else{
			  			if((m[2]==2) && (m[3] >28)){
							document.getElementById("productExpiry").style.border="3px solid red";
  							document.getElementById("saveExpiryDate").style.background ="grey";
 			 				document.getElementById("saveExpiryDate").style.pointerEvents ="none";
				  		}
				  		else{
				  			if((m[1]<minYear)){
								document.getElementById("productExpiry").style.border="3px solid red";
				  				document.getElementById("saveExpiryDate").style.background ="grey";
				  				document.getElementById("saveExpiryDate").style.pointerEvents ="none";		
				  			}
				  			else{
								document.getElementById("productExpiry").style.border="none";
				  				document.getElementById("saveExpiryDate").style.background ="green";
				  				document.getElementById("saveExpiryDate").style.pointerEvents ="auto";
				  				this.productExpiry = date.value;
				  				this.productDt["expiry"] = this.productExpiry;
				  			}
				  		}
				  	}	
		  		}
	  		}
	  	}
	  	else{	
	  		document.getElementById("productExpiry").style.border="3px solid red";
			document.getElementById("saveExpiryDate").style.background ="grey";
			document.getElementById("saveExpiryDate").style.pointerEvents ="none";		
	  	}
	}

	saveExpiryDate(){
		document.getElementById("productExpiry").style.pointerEvents="none";
  		document.getElementById("productExpiry").style.background="#fff";
  		document.getElementById("productExpiry").style.color="#000";
  		document.getElementById("saveExpiryDate").style.display ="none";
		document.getElementById("editExpiryDate").style.display ="block";  			
		this.changesMadeStatus=true;
	}
}
