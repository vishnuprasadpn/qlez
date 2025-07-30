import { Component } from '@angular/core';
import { AdminReturnExchangeService } from './AdminReturnExchange.service';
@Component({
  selector: 'admin-return-exchange',
  templateUrl: './AdminReturnExchange.component.html',
  styleUrls: ['./AdminReturnExchange.component.css']
})
export class AdminReturnExchangeComponent {
  defectiveProducts: any;
  confirmDefectiveIDs: any;
  itemDetailDisplay:boolean;

  tableStatus: any;
  loadingProgress:boolean;
  showLoading:boolean;
  noDefectiveProductsStatus:boolean;
  noResponseError:boolean;
  response:any;
  productDt:any;
  viewList:boolean;
  viewProductDetails:boolean;

  constructor(private adminReturnExchangeService: AdminReturnExchangeService) {
    this.defectiveProducts = [{ customer_ID: null, defect_comments: null, defective: false, invoice_date: null, item_code: null, pid: null, product_color: null, product_size: null, return_date: null }];
    this.confirmDefectiveIDs = [];
    this.confirmDefectiveIDs.pop();
    this.loadingProgress = this.viewList = true;
   

    this.showLoading = this.noDefectiveProductsStatus = this.noResponseError = this.tableStatus = false;
    this.response = this.adminReturnExchangeService.getDefectiveProducts();
    if(this.response==undefined){
      setTimeout(() => {
        this.loadingProgress = false;   
        this.noResponseError = true; 
      }, 2000);
    }
  }

  ngDoCheck(){
    if(this.viewList){
      this.response = this.adminReturnExchangeService.getDefectiveProducts();
      if(this.response!=undefined){
        setTimeout(() => {
          this.loadingProgress = this.viewList = false;   
          this.getData(); 
        }, 2000);
      }

      if(this.loadingProgress){
        setTimeout(() => {
          this.loadingProgress = false;
          if(this.response==undefined){
            this.noResponseError = true;
            this.viewList = false;
          } 
        }, 8000);
      }
    }
    else{
      if(this.viewProductDetails){
        console.log("sdsdasdas");
        this.loadingProgress = true;
        setTimeout(() => {
          var itemDispDt = this.adminReturnExchangeService.getItemDt();
          console.log("this");
          console.log(itemDispDt);
          this.viewProductDetails = this.loadingProgress = false;
          if(itemDispDt!=undefined){
            console.log(this.productDt);
            this.productDt = itemDispDt["itemList"][0]["item"];
            this.noResponseError = false;
            this.itemDetailDisplay = true;
          }
          else{
            this.noResponseError = true;
          }
        }, 10000); 
      }
    }
  }

  showList(){
    this.itemDetailDisplay = false;
    this.tableStatus = true;
  }

  getData(){
    if (this.response["success"] != false) {
      this.noDefectiveProductsStatus = this.noResponseError = false;
      this.tableStatus = true;
      for (var pCount = 0; pCount < this.response["defective"].length; pCount++) {
        this.defectiveProducts[pCount] = this.response["defective"][pCount];
      }
    }
    else {
      this.tableStatus = false;
      this.noDefectiveProductsStatus = true;
    }
  }

  notDefective(product, id) {
    this.adminReturnExchangeService.sendForSale(product);
    id.style.display = "none";
  }

  getReturnedProducts(){
    this.loadingProgress = this.viewList = true;
    this.noResponseError = this.tableStatus = false;    
    this.adminReturnExchangeService.getDefectiveProductsAgain();
    // setTimeout(() => {
    //   this.loadingProgress = false;   
    //   this.getData(); 
    // }, 3000); 
  }

  viewProductDt(product){
    console.log("product");
    console.log(product);
    this.viewProductDetails = true;
    this.adminReturnExchangeService.getProductDts(product["item_code"],"ITEM CODE");
    this.viewList = this.tableStatus = false;
    this.loadingProgress = true;
  }

}
