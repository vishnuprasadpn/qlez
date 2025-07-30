import { Component, OnInit } from '@angular/core';
import { AppMainService } from '../../app.mainService';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-most-fav-product',
  templateUrl: './most-fav-product.component.html',
  styleUrls: ['./most-fav-product.component.css']
})
export class MostFavProductComponent implements OnInit {
  Otype:any;
  Oby:any;
  
  MFPTableStatus: boolean;
  FSPTableStatus: boolean;
  loading:boolean;
  MFPArray: [{}];
  responce: any;
  itemDt:[{}];
  constructor(private router: Router, private appService: AppMainService) {
    this.appService.currentPageHeading = "Most Favorite Product";
    this.MFPTableStatus=false;
    this.MFPArray=[{ "count": null, "item_code": null }];
   }

  ngOnInit() {
   
  }
  ngDoCheck() {
    this.responce=this.appService.getusMostFavDt();

    if ( this.responce!= undefined) {
      console.log( this.responce);
      this.refiningValues();
    }
    else {
      console.log("false");
      this.MFPTableStatus = false;
      // this.mvcTableStatus = false;
    }
   

  }
  refiningValues()
  {
    this.MFPTableStatus = true;
    for(let i=0;i<this.responce.length;i++)
    {
        this.itemDt=this.responce[i].item;
        console.log(this.responce[i]["count"]);
      var temp=this.responce[i];
        this.MFPArray[i] = { "count":this.responce[i]["count"], "item_code":this.itemDt["item_code"]};
    }

  }
  backToBRHome(){
    this.router.navigate(['/BuisnessReportHome']);
  }
}
