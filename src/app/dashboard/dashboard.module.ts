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
import { ReactiveFormsModule } from '@angular/forms';
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
import { PendingAdComponent } from './pendingAd/pendingAd.component';
import { ActiveAdComponent } from './activeAd/activeAd.component';
import { ExpiredAdComponent } from './expiredAd/expiredAd.component';
import { ImageViewerModule } from 'ngx-image-viewer';
import { LightboxModule } from 'ngx-lightbox';

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
    ExpiredAdComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
    ShowHidePasswordModule,
    ImageViewerModule,
    LightboxModule 
  ],
  providers: [
    AuthGuard,
    AuthService,
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class DashboardModule { }
