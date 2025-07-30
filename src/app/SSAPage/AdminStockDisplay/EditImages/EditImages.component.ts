import { Component,Input,Output,EventEmitter,ViewChildren } from '@angular/core';
import { EditItemService } from './EditImages.service';

@Component({
  selector: 'edit-images',
  templateUrl: './EditImages.component.html',
  styleUrls: ['./EditImages.component.css']
})

export class EditImagesComponent {
  @Input() item: any;
  @Output() imageUpdates: EventEmitter<any> = new EventEmitter();
  updatedStatus:any;
  offers:any;
  newOffercodeValue:any;
  
  colors:any;
  itemImages:any;
  init:boolean;
  ImageSaveFailed:boolean;  
  constructor(private editItemService:EditItemService){
    this.updatedStatus=this.ImageSaveFailed=false; 
    this.init=false;
  }

  ngDoCheck(){
    if(this.item!=undefined && this.init==false){
      this.init=true;
      this.colors = Object.keys(this.item.item_imagelinks);
      this.itemImages = [];
      for (var i = 0; i < this.colors.length; i++) {
        var obj = { color: this.colors[i], image: this.item["item_imagelinks"][this.colors[i]] };
        this.itemImages.push(obj);
      }
    } 
  }

  saveImage(colorNo,imageNo,url,color){    
    if(url.value.match(/\.(jpeg|jpg|gif|png)$/) == null){
      this.ImageSaveFailed=true;
    }
    else{
      this.item.item_imagelinks[color.innerHTML][imageNo]=url.value;
      this.ImageSaveFailed=false;  
    }
  }
  
}
