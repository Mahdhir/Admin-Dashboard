import { OrdersService } from './../services/orders.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth-service.service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeDetailsComponent } from './change-details/change-details.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from '../services/product.service';
import { FilterPipe } from '../filter.pipe';
import { BuyersComponent } from './buyers/buyers.component';
import { SellersComponent } from './sellers/sellers.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryInfoComponent } from './category-info/category-info.component';
import { SellerfilterPipe } from './sellers/sellerfilter.pipe';
import { BuyerfilterPipe } from './buyers/buyerfilter.pipe';
import { CategoryService } from './../services/category.service';

import { PendingAdComponent } from './pendingAd/pendingAd.component';
import { ActiveAdComponent } from './activeAd/activeAd.component';
import { ExpiredAdComponent } from './expiredAd/expiredAd.component';
import { ImageViewerModule } from 'ngx-image-viewer';
import { LightboxModule } from 'ngx-lightbox';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { MessagesComponent } from './messages/messages.component';
import {MatMenuModule} from '@angular/material/menu'; // create a shared module

import { SpinnerComponent } from './spinner/spinner.component';
import { MessageService } from '../services/message.service';
import { UnreadMessagesComponent } from './unread-messages/unread-messages.component';
import { MessageListComponent } from './message-list/message-list.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';

import { ActivePromosComponent } from './activePromos/activePromos.component';
import { PendingPromosComponent } from './pendingPromos/pendingPromos.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    NavbarComponent,
    SidebarComponent,
    AdminInfoComponent,
    AddAdminComponent,
    ChangePasswordComponent,
    ChangeDetailsComponent,
    ProductsComponent,
    FilterPipe,
    BuyersComponent,
    SellersComponent,
    AddCategoryComponent,
    CategoryInfoComponent,
    SellerfilterPipe,
    BuyerfilterPipe,
    PendingAdComponent,
    ActiveAdComponent,
    ExpiredAdComponent,
    MessagesComponent,
    SpinnerComponent,
    UnreadMessagesComponent,
    MessageListComponent,
    ActivePromosComponent,
    PendingPromosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
    ShowHidePasswordModule,
    ImageViewerModule,
    LightboxModule,

    MatMenuModule,
    MatSidenavModule,
    MatRadioModule,

    NgxSmartModalModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthService,
    ProductService,
    CategoryService,
    MessageService,
    OrdersService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class DashboardModule { }
