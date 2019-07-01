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
    BuyersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
    ShowHidePasswordModule,
    
  ],
  providers: [
    AuthGuard,
    AuthService,
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class DashboardModule { }
