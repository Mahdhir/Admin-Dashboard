import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { AuthGuard } from '../services/auth-guard.service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeDetailsComponent } from './change-details/change-details.component';
import { ProductsComponent } from './products/products.component';
import { BuyersComponent } from './buyers/buyers.component';
import {SellersComponent} from './sellers/sellers.component';
import { CategoryInfoComponent } from './category-info/category-info.component';
import { AddCategoryComponent } from './add-category/add-category.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'info',
        component: AdminInfoComponent,
      },
      {
        path: 'addAdmin',
        component: AddAdminComponent
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent
      },
      {
        path: 'changeDetails',
        component: ChangeDetailsComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'buyers',
        component: BuyersComponent
      },
      {
        path: 'sellers',
        component: SellersComponent
      },
      {
        path: 'categoryInfo',
        component: CategoryInfoComponent,
      },
      {
        path: 'addCategory',
        component: AddCategoryComponent
      }

    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
