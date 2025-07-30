import {Injectable} from "@angular/core";
import { AppMainService } from '../../app.mainService';

@Injectable()
export class SDProductService {

	constructor(private appService: AppMainService) {}

	scanProduct(){
		this.appService.scanProduct()
	}


	getScannedProductDt(){
		return this.appService.scannedProductDt;
	}
}