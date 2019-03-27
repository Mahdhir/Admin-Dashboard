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

@NgModule({
  declarations: [DashboardComponent, OrdersComponent, NavbarComponent, SidebarComponent, AdminInfoComponent, AddAdminComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class DashboardModule { }
