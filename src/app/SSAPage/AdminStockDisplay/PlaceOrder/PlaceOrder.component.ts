import { Component,Input } from '@angular/core';

@Component({
  selector: 'place-order',
  templateUrl: './PlaceOrder.component.html',
  styleUrls: ['./PlaceOrder.component.css']
})
export class PlaceOrderComponent {
	@Input() offerItems: any;
  
  	ngDoCheck(){
  		/*console.log("testing");
		console.log(this.offerItems);*/  	
  	}
}
