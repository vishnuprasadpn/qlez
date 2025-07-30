import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
clientLogo:boolean;

  constructor(private router: Router,private footerService:FooterService) {
    this.clientLogo=false;
   }

  ngOnInit() {
  }

  ngAfterViewInit(){
  	var heading =this.footerService.getCurrentPageHeading();
  	if(heading=="Store Name"){
      this.clientLogo=false;
  		// document.getElementById("clientLogo").style.display="none";
  	}
  }

}
