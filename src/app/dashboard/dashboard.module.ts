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
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryInfoComponent } from './category-info/category-info.component';
import { SellerfilterPipe } from './sellers/sellerfilter.pipe';
import { BuyerfilterPipe } from './buyers/buyerfilter.pipe';
import { MessagefilterPipe } from './messages/messagefilter.pipe';
import { CategoryService } from './../services/category.service';

import { PendingAdComponent } from './pendingAd/pendingAd.component';
import { ActiveAdComponent } from './activeAd/activeAd.component';
import { ExpiredAdComponent } from './expiredAd/expiredAd.component';
import { ImageViewerModule } from 'ngx-image-viewer';
import { LightboxModule } from 'ngx-lightbox';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {NgxPaginationModule} from 'ngx-pagination';
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
import { OrderfilterPipe } from './orders/orderfilter.pipe';
import { FlaggedProductsComponent } from './flagged-products/flagged-products.component';
import { NgImageSliderModule } from 'ng-image-slider';

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
    AddCategoryComponent,
    CategoryInfoComponent,
    SellerfilterPipe,
    BuyerfilterPipe,
    MessagefilterPipe,
    PendingAdComponent,
    ActiveAdComponent,
    ExpiredAdComponent,
    MessagesComponent,
    SpinnerComponent,
    UnreadMessagesComponent,
    MessageListComponent,
    ActivePromosComponent,
    PendingPromosComponent,
    OrderfilterPipe,
    FlaggedProductsComponent
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
    NgxPaginationModule,

    NgImageSliderModule,
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
