import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApplyOffersService } from './ApplyOffers.service';

@Component({
  selector: 'apply-offers',
  templateUrl: './ApplyOffers.component.html',
  styleUrls: ['./ApplyOffers.component.css']
})

export class ApplyOffersComponent {
  @Input() offerItems: any;
  @Output() offerUpdates: EventEmitter<any> = new EventEmitter();
  updatedStatus: any;
  offers: any;
  newOffercodeValue: any;

  constructor(private applyOfferService: ApplyOffersService) {
    this.updatedStatus = false;
    this.offers = [{
      defect_flag: null, item_brand: null, item_category: null, item_code: null, item_cp: null, item_desc: null, item_group: null, item_imagelinks: null
      , item_manufacturer: null, item_mrp: null, item_name: null, item_nature: null, item_sp: null
      , item_subcategory: null, item_tax: null, offer_id: ["null"], reward_x: null
    }];
    var response = this.applyOfferService.getAllOffers();
    if(response !=undefined){
    this.offers = response.offer;
    var flag = true;
    if (this.offers != null) {
      for (var o = 0; o < this.offers.length; o++) {
        if (this.offers[o].offer_type == "General Offers") {
          flag = false;
        }
        if (flag == false) {
          this.offers[o] = this.offers[o + 1];
        }
      }
      if (flag == false) {
        this.offers.pop();
      }
    }
  }
  }

  ngDoCheck() {
    var response = this.applyOfferService.getAllOffers();
    this.offers = response.offer;
  }

  editOffer(itemNo, offerNo) {
    document.getElementById("editOffer" + itemNo + offerNo).style.display = "none";
    document.getElementById("saveOffer" + itemNo + offerNo).style.display = "block";
    document.getElementById("offersSelect" + itemNo + offerNo).style.display = "block";
    document.getElementById("offerCode" + itemNo + offerNo).style.display = "none";
  }

  selectNewOffer(existingOffer, currentItem, offerNo, offerCode, sameOfferMessage, itemMessage, comboMessage, save) {
    var firstCharExistingOffer = existingOffer.value.charAt(0);
    var existingOfferCodeType;

    if (firstCharExistingOffer == "3") {
      existingOfferCodeType = "Combo";
    }
    else if (firstCharExistingOffer == "N") {
      existingOfferCodeType = "No offer";
    }
    else {
      existingOfferCodeType = "ItemSpecific";
    }

    var firstCharSelectedOffer = offerCode.value.charAt(0);
    var selectedOfferCodeType;
    this.newOffercodeValue = offerCode.value;
    if (firstCharSelectedOffer == "3") {
      selectedOfferCodeType = "Combo";
    }
    else {
      selectedOfferCodeType = "ItemSpecific";
    }

    if (existingOfferCodeType != selectedOfferCodeType) {
      if (existingOfferCodeType == "Combo") {
        document.getElementById(comboMessage.id).style.display = "block";
        document.getElementById(sameOfferMessage.id).style.display = "none";
        document.getElementById(itemMessage.id).style.display = "none";
        document.getElementById(save.id).style.pointerEvents = "none";
      }
      else if (existingOfferCodeType == "No offer") {
        for (var ot = 0; ot < this.offerItems.length; ot++) {
          if (this.offerItems[ot].item_code == currentItem.item_code) {
            var offExistStatus = false;
            for (var iOf = 0; iOf < this.offerItems[ot].offer_id.length; iOf++) {
              if (this.offerItems[ot].offer_id[iOf] == this.newOffercodeValue) {
                offExistStatus = true;
              }
            }
            if (offExistStatus == false) {
              document.getElementById(comboMessage.id).style.display = "none";
              document.getElementById(sameOfferMessage.id).style.display = "none";
              document.getElementById(itemMessage.id).style.display = "none";
              document.getElementById(save.id).style.pointerEvents = "auto";
            }
            else {
              document.getElementById(comboMessage.id).style.display = "none";
              document.getElementById(sameOfferMessage.id).style.display = "block";
              document.getElementById(itemMessage.id).style.display = "none";
              document.getElementById(save.id).style.pointerEvents = "none";
            }
          }
        }
      }
      else {
        document.getElementById(comboMessage.id).style.display = "none";
        document.getElementById(sameOfferMessage.id).style.display = "none";
        document.getElementById(itemMessage.id).style.display = "block";
        document.getElementById(save.id).style.pointerEvents = "none";
      }
    }
    else {
      document.getElementById(comboMessage.id).style.display = "none";
      document.getElementById(sameOfferMessage.id).style.display = "none";
      document.getElementById(itemMessage.id).style.display = "none";
      document.getElementById(save.id).style.pointerEvents = "auto";
      this.newOffercodeValue = offerCode.value;
    }
  }

  saveOffer(offerDt, itemNo, offerNo) {
    if (this.newOffercodeValue != undefined) {
      for (var ot = 0; ot < this.offerItems.length; ot++) {
        if (this.offerItems[ot].item_code == offerDt.item_code) {
          this.offerItems[ot].offer_id[offerNo] = this.newOffercodeValue;
          this.updatedStatus = true;
        }
      }
    }
    document.getElementById("editOffer" + itemNo + offerNo).style.display = "block";
    document.getElementById("saveOffer" + itemNo + offerNo).style.display = "none";
    document.getElementById("offersSelect" + itemNo + offerNo).style.display = "none";
    document.getElementById("offerCode" + itemNo + offerNo).style.display = "block";
    if (this.updatedStatus == true) {
      this.applyOfferService.setStatusUpdate(this.updatedStatus);
      this.offerUpdates.emit(this.offerItems);
    }
  }

  selectOfferToApplyAll(offer) {
    if (offer.value != "" && offer.value != undefined && offer.value != "Select any Offer") {
      document.getElementById("applyOfferSubmit").style.pointerEvents = "auto";
      document.getElementById("applyOfferSubmit").style.background = "#0071BB";
    }
    else {
      document.getElementById("applyOfferSubmit").style.pointerEvents = "none";
      document.getElementById("applyOfferSubmit").style.background = "grey";
    }
  }

  applyOfferToAll(offer) {
    var firstChar = offer.value.charAt(0);
    if (firstChar == "3") {
      for (var i = 0; i < this.offerItems.length; i++) {
        var addStatus = false;

        for (var o = 0; o < this.offerItems[i].offer_id.length; o++) {
          var c = this.offerItems[i].offer_id[o].charAt(0);
          if (c == "3") {
            this.offerItems[i].offer_id[o] = offer.value;
            addStatus = true;
          }
        }

        if (addStatus == false) {
          var NoOfferStatus = false;
          for (var o = 0; o < this.offerItems[i].offer_id.length; o++) {
            var c = this.offerItems[i].offer_id[o].charAt(0);
            if (c == "N" && NoOfferStatus == false) {
              this.offerItems[i].offer_id[o] = offer.value;
              NoOfferStatus = true;
            }
          }
        }
      }
    }
    else {
      for (var i = 0; i < this.offerItems.length; i++) {
        var addStatus = false;

        for (var o = 0; o < this.offerItems[i].offer_id.length; o++) {
          var c = this.offerItems[i].offer_id[o].charAt(0);
          if (c == "2") {
            this.offerItems[i].offer_id[o] = offer.value;
            addStatus = true;
          }
        }

        if (addStatus == false) {
          for (var o = 0; o < this.offerItems[i].offer_id.length; o++) {
            var c = this.offerItems[i].offer_id[o].charAt(0);
            if (c == "N") {
              this.offerItems[i].offer_id[o] = offer.value;
              addStatus = true;
            }
          }
        }
      }
    }
    document.getElementById("offerAddedMessage").style.display = "block";

    setTimeout(() => {
      document.getElementById("offerAddedMessage").style.display = "none";
    }, 3000);
  }

}
