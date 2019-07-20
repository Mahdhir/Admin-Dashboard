import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { AuthService } from './services/auth-service.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ProductService } from './services/product.service';
import { FilterPipe } from './filter.pipe';
import { ImageViewerModule } from "ngx-image-viewer";

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      LoginModule,
      LoginRoutingModule,
      DashboardModule,
      HttpClientModule,
      DashboardRoutingModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      PasswordStrengthMeterModule,
      ShowHidePasswordModule,
      ImageViewerModule.forRoot()
   ],
   providers: [
      AuthService,
      ProductService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
