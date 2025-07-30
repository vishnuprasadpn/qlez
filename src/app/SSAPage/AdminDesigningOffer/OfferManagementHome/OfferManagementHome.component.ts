import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-OfferManagementHome',
  templateUrl: './OfferManagementHome.component.html',
  styleUrls: ['./OfferManagementHome.component.css']
})
export class OfferManagementHomeComponent implements OnInit {

  defaultSection:boolean;
  generalOffers:boolean;
  comboOffers:boolean;
  brandOffers:boolean;

  constructor() {
    this.defaultSection = true;
   }

  ngOnInit() {
  }

  goTOBrandOffers(){
    this.brandOffers = true;
    this.defaultSection = this.comboOffers = this.generalOffers = false;
  }
  goTOComboOffers(){
    this.comboOffers = true;
    this.defaultSection = this.brandOffers = this.generalOffers = false;
  }
  goTOGeneralOffers(){
    this.generalOffers = true;
    this.defaultSection = this.brandOffers = this.comboOffers = false;
  }

  goTOMenu(){
    this.defaultSection = true;
    this.brandOffers = this.comboOffers = this.generalOffers = false;
  }
}
