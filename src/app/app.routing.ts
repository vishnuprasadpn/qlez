import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcomePage/welcome.component';
import { LoginComponent } from './LoginPage/LoginHome/Login.component';
import { LoginForgetPageComponent } from './LoginPage/LoginForgetPage/LoginForgetPage.component';
import { SMMHomeComponent } from './SMMHome/SMMHome.component';
import { SDPageComponent } from './SDPage/SDHome/SDPage.component';
import { CSPageComponent } from './CSPage/CSHome/CSPage.component';
import { CustomerTransactionComponent } from './CSPage/CustomerAction/CustomerTransaction/CustomerTransaction.component';
import { SSAHomeComponent } from './SSAPage/SSAHome/SSAHome.component';
import { SAHomeComponent } from './SAPage/SAHome/SAHome.component';
import { POSWelcomeComponent } from './POS/POSWelcome/POSWelcome.component';
import { NoCustomerCardComponent } from './POS/NoCustomerCard/NoCustomerCard.component';
import { CustomerBillComponent } from './POS/CustomerBill/CustomerBill.component';
import { LoginUsingKeycodeComponent } from './LoginPage/LoginUsingKeycode/LoginUsingKeycode.component';
import { FooterComponent } from './footer/footer.component';
import { SuccessPageComponent } from './POS/SuccessPage/SuccessPage.component';
import { FailurePageComponent } from './POS/FailurePage/FailurePage.component';
import { BusinessReportHomeComponent } from './business-report-home/bussiness-report-home-options/business-report-home.component';
import { TransactionTableComponent } from './business-report-home/transaction-table/transaction-table.component';
import { FSPPageComponent } from './business-report-home/fsp-page/fsp-page.component';
import {MVCPageComponent} from './business-report-home/mvcpage/mvcpage.component';
import {UnderstockComponent} from './business-report-home/understock/understock.component';
import {MostFavProductComponent} from './business-report-home/most-fav-product/most-fav-product.component' ;
import {OBPPageComponent} from './business-report-home/obp-page/obppage.component';

const appRoutes: Routes = [
  { path: 'OBPPage', component: OBPPageComponent },

  { path: 'SuccessPayment', component: SuccessPageComponent },
  { path: 'FailedPayment', component: FailurePageComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'QlezWelcome', component: WelcomeComponent },
  { path: 'POSWelcome', component: POSWelcomeComponent },
  { path: 'NoCustomerCard', component: NoCustomerCardComponent },
  { path: 'CustomerBill', component: CustomerBillComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'SMMLoginUsingKeycode', component: LoginUsingKeycodeComponent },
  { path: 'LoginForgetPage', component: LoginForgetPageComponent },
  { path: 'SMMHome', component: SMMHomeComponent },
  { path: 'SDPage', component: SDPageComponent },
  { path: 'CSPage', component: CSPageComponent },
  { path: 'CustomerTransaction', component: CustomerTransactionComponent },
  { path: 'SSAHome', component: SSAHomeComponent },
  { path: 'SAHome', component: SAHomeComponent },
  { path: 'BuisnessReportHome', component: BusinessReportHomeComponent },
  { path: 'TransactionTable', component: TransactionTableComponent },
  { path: 'FSPPage', component: FSPPageComponent },
  { path: 'MVCPage', component: MVCPageComponent }, 
  { path: 'understock', component: UnderstockComponent },
  { path: 'MFPPage', component:MostFavProductComponent},

  {
    path: '',    redirectTo: '/QlezWelcome',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(appRoutes);