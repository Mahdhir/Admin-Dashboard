import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

@NgModule({
  declarations: [LoginComponent, ForgetPasswordComponent, ResetPasswordComponent, EmailVerificationComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
    PasswordStrengthMeterModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
