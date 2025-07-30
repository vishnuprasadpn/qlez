import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import { NgVirtualKeyboardModule } from '@protacon/ng-virtual-keyboard';
import { routing } from './app.routing';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angular2-qrcode';

// material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import {
  MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,MatCheckboxModule,
  MatChipsModule,MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,
  MatGridListModule,MatIconModule,MatInputModule,MatListModule,MatMenuModule,MatNativeDateModule,
  MatPaginatorModule,MatProgressBarModule,MatProgressSpinnerModule,MatRadioModule,MatRippleModule,
  MatSelectModule,MatSidenavModule,MatSliderModule,MatSlideToggleModule,MatSnackBarModule,
  MatSortModule,MatStepperModule,MatTableModule,MatTabsModule,MatToolbarModule,MatTooltipModule,
} from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// welcome component
import { WelcomeService } from './welcomePage/welcome.service';

// POS components
import { WelcomeComponent } from './welcomePage/welcome.component';
import { LoginComponent } from './LoginPage/LoginHome/Login.component';
import { LoginForgetPageComponent } from './LoginPage/LoginForgetPage/LoginForgetPage.component';
import { SMMHomeComponent } from './SMMHome/SMMHome.component';
import { SDPageComponent } from './SDPage/SDHome/SDPage.component';
import { SDItemComponent } from './SDPage/SDItem/SDItem.component';
import { SDProductComponent } from './SDPage/SDProduct/SDProduct.component';
import { CSPageComponent } from './CSPage/CSHome/CSPage.component';
import { CustomerRegistrationComponent } from './CSPage/CustomerRegistration/CustomerRegistration.component';
import { CustomerActionComponent } from './CSPage/CustomerAction/CustomerAction.component';
import { CustomerTransactionComponent } from './CSPage/CustomerAction/CustomerTransaction/CustomerTransaction.component';
import { SSAHomeComponent } from './SSAPage/SSAHome/SSAHome.component';
import { EmployeeAdditionComponent } from './SSAPage/StaffManagement/EmployeeAddition/EmployeeAddition.component';
import { EmployeeDisplayComponent } from './SSAPage/StaffManagement/EmployeeDisplay/EmployeeDisplay.component';
import { AdminReturnExchangeComponent } from './SSAPage/AdminGeneral/AdminReturnExchange/AdminReturnExchange.component';
import { SAHomeComponent } from './SAPage/SAHome/SAHome.component';
import { ItemAdditionComponent } from './SAPage/ItemAddition/ItemAddition.component';
import { ProductAdditionComponent } from './SAPage/ProductAddition/ProductAddition.component';
import { AdminItemDisplayComponent } from './SSAPage/AdminStockDisplay/AdminItemDisplay/AdminItemDisplay.component';
import { AdminProductDisplayComponent } from './SSAPage/AdminStockDisplay/AdminProductDisplay/AdminProductDisplay.component';
import { AdminStockDisplayHomeComponent } from './SSAPage/AdminStockDisplay/AdminStockDisplayHome/AdminStockDisplayHome.component';
import { EditItemComponent } from './SSAPage/AdminStockDisplay/EditItem/EditItem.component';
import { GeneralOffersComponent } from './SSAPage/AdminDesigningOffer/GeneralOffers/GeneralOffers.component';
import { BrandOffersComponent } from './SSAPage/AdminDesigningOffer/BrandOffers/BrandOffers.component';
import { ComboOffersComponent } from './SSAPage/AdminDesigningOffer/ComboOffers/ComboOffers.component';
import { ApplyOffersComponent } from './SSAPage/AdminStockDisplay/ApplyOffers/ApplyOffers.component';
import { PlaceOrderComponent } from './SSAPage/AdminStockDisplay/PlaceOrder/PlaceOrder.component';
import { LoginService } from './LoginPage/LoginHome/Login.service';
import { SMMHomeService } from './SMMHome/SMMHome.service';
import { LoginForgetPageService } from './LoginPage/LoginForgetPage/LoginForgetPage.service';
import { SDItemService } from './SDPage/SDItem/SDItem.service';
import { SDPageService } from './SDPage/SDHome/SDPage.service';
import { HeaderComponent } from './Header/Header.component'
import { HeaderService } from './Header/Header.service';
import { SDProductService } from './SDPage/SDProduct/SDProduct.service';
import { CustomerRegistrationService } from './CSPage/CustomerRegistration/CustomerRegistration.service';
import { EmployeeAdditionService } from './SSAPage/StaffManagement/EmployeeAddition/EmployeeAddition.service';
import { ProductAdditionService } from './SAPage/ProductAddition/ProductAddition.service';
import { AdminReturnExchangeService } from './SSAPage/AdminGeneral/AdminReturnExchange/AdminReturnExchange.service';
import { EmployeeDisplayService } from './SSAPage/StaffManagement/EmployeeDisplay/EmployeeDisplay.service';
import { AdminSDProductService } from './SSAPage/AdminStockDisplay/AdminProductDisplay/AdminProductDisplay.service';
import { AdminSDItemService } from './SSAPage/AdminStockDisplay/AdminItemDisplay/AdminItemDisplay.service';
import { ItemAdditionService } from './SAPage/ItemAddition/ItemAddition.service';
import { CustomerActionService } from './CSPage/CustomerAction/CustomerAction.service';
import { CustomerTransactionsService } from './CSPage/CustomerAction/CustomerTransaction/CustomerTransaction.service';
import { OfferServices } from './SSAPage/AdminDesigningOffer/OfferServices.service';
import { ItemEditService } from './SSAPage/AdminStockDisplay/EditItem/EditItem.service';
import { POSWelcomeService } from './POS/POSWelcome/POSWelcome.service';

import { POSWelcomeComponent } from './POS/POSWelcome/POSWelcome.component';
import { NoCustomerCardService } from './POS/NoCustomerCard/NoCustomerCard.service';
import { NoCustomerCardComponent } from './POS/NoCustomerCard/NoCustomerCard.component';
import { CustomerBillService } from './POS/CustomerBill/CustomerBill.service';
import { CustomerBillComponent } from './POS/CustomerBill/CustomerBill.component';
import { ApplyOffersService } from './SSAPage/AdminStockDisplay/ApplyOffers/ApplyOffers.service';
import { LoginUsingKeycodeService } from './LoginPage/LoginUsingKeycode/LoginUsingKeycode.service';
import { LoginUsingKeycodeComponent } from './LoginPage/LoginUsingKeycode/LoginUsingKeycode.component';
import { FooterComponent } from './footer/footer.component';
import { SuccessPageComponent } from './POS/SuccessPage/SuccessPage.component';
import { FailurePageComponent } from './POS/FailurePage/FailurePage.component';
import { SuccessPageService } from './POS/SuccessPage/SuccessPage.service';
import { FooterService } from './footer/footer.service';
import { EditImagesComponent } from './SSAPage/AdminStockDisplay/EditImages/EditImages.component';
import { EditItemService } from './SSAPage/AdminStockDisplay/EditImages/EditImages.service';
import { BusinessReportHomeComponent } from './business-report-home/bussiness-report-home-options/business-report-home.component';
import { TransactionTableComponent } from './business-report-home/transaction-table/transaction-table.component';
import { DailyReportComponent } from './business-report-home/transaction-table/daily-report/daily-report.component';
import { WeeklyReportComponent } from './business-report-home/transaction-table/weekly-report/weekly-report.component';
import { MonthlyReportComponent } from './business-report-home/transaction-table/monthly-report/monthly-report.component';
import { CustomReportComponent } from './business-report-home/transaction-table/custom-report/custom-report.component';
import { FSPPageComponent } from './business-report-home/fsp-page/fsp-page.component';
import { MVCPageComponent } from './business-report-home/mvcpage/mvcpage.component';
import { UnderstockComponent } from './business-report-home/understock/understock.component';
import { MostFavProductComponent } from './business-report-home/most-fav-product/most-fav-product.component';
import { CustomerBDayComponent } from './business-report-home/customer-bday/customer-bday.component';
import {OBPPageComponent} from './business-report-home/obp-page/obppage.component';
import { OfferManagementHomeComponent } from './SSAPage/AdminDesigningOffer/OfferManagementHome/OfferManagementHome.component';

//Main files 
import { AppMainService } from './app.mainService';
import { AppComponent } from './app.component';

//pipe
import { OrderByPipe } from './sort.pipe';
import { SearchPipe } from './pipes/search.pipe';
@NgModule({
  declarations: [
    OBPPageComponent,
      AppComponent,
      WelcomeComponent,
      LoginComponent,
      LoginForgetPageComponent,
      SMMHomeComponent,
      SDPageComponent,
      CSPageComponent,
      CustomerRegistrationComponent,
      CustomerActionComponent,
      CustomerTransactionComponent,
      SSAHomeComponent,
      EmployeeAdditionComponent,
      EmployeeDisplayComponent,
      AdminReturnExchangeComponent,
      SAHomeComponent,
      ItemAdditionComponent,
      ProductAdditionComponent,
      AdminItemDisplayComponent,
      AdminProductDisplayComponent,
      AdminStockDisplayHomeComponent,
      EditItemComponent,
      EditImagesComponent,
      GeneralOffersComponent,
      BrandOffersComponent,
      ComboOffersComponent,
      ApplyOffersComponent,
      PlaceOrderComponent,
      SDItemComponent,
      SDProductComponent,
      HeaderComponent,
      SearchPipe,
      EditItemComponent,
      POSWelcomeComponent,
      NoCustomerCardComponent,
      CustomerBillComponent,
      LoginUsingKeycodeComponent,
      OrderByPipe,
      FooterComponent,
      SuccessPageComponent,
      FailurePageComponent,
      BusinessReportHomeComponent,
      TransactionTableComponent,
      DailyReportComponent,
      WeeklyReportComponent,
      MonthlyReportComponent,
      CustomReportComponent,
      FSPPageComponent,
      CustomerBDayComponent,
      MVCPageComponent,
      UnderstockComponent,
      MostFavProductComponent,
      OfferManagementHomeComponent
    ],
  imports: [
    routing,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    QRCodeModule,

    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgVirtualKeyboardModule

  ],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [
    AppMainService,
    LoginService,
    SMMHomeService,
    LoginForgetPageService,
    SDItemService,
    SDPageService,
    HeaderService,
    SDProductService,
    CustomerRegistrationService,
    EmployeeAdditionService,
    ProductAdditionService,
    AdminReturnExchangeService,
    EmployeeDisplayService,
    AdminSDProductService,
    AdminSDItemService,
    ItemAdditionService,
    CustomerActionService,
    CustomerTransactionsService,
    OfferServices,
    ItemEditService,
    POSWelcomeService,
    NoCustomerCardService,
    CustomerBillService,
    ApplyOffersService,
    LoginUsingKeycodeService,
    WelcomeService,
    SuccessPageService,
    FooterService,
    EditItemService,
    { provide: APP_BASE_HREF, useValue: '/' },
       { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
