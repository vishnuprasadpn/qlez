import { Component ,Input} from '@angular/core';
import { SuccessPageService } from './SuccessPage.service';

@Component({
  selector: 'payment-success',
  templateUrl: './SuccessPage.component.html',
  styleUrls: ['./SuccessPage.component.css']
})

export class SuccessPageComponent {
  
  constructor(){}

  ngOnInit(){
    console.log("success");
    // document.getElementById("printSuccessThankMessage").style.display="block";
    // document.getElementById("printSuccessMessage").style.display="block";
  }
  
}
