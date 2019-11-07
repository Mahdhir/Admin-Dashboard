import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { AuthGuard } from '../services/auth-guard.service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeDetailsComponent } from './change-details/change-details.component';
import { CategoryInfoComponent } from './category-info/category-info.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { PendingAdComponent } from './pendingAd/pendingAd.component';
import { ActiveAdComponent } from './activeAd/activeAd.component';
import { ExpiredAdComponent } from './expiredAd/expiredAd.component';
import { MessagesComponent } from './messages/messages.component';
import { UnreadMessagesComponent } from './unread-messages/unread-messages.component';
import { MessageListComponent } from './message-list/message-list.component';
import { PendingPromosComponent } from './pendingPromos/pendingPromos.component';
import { ActivePromosComponent } from './activePromos/activePromos.component';
import { FlaggedProductsComponent } from './flagged-products/flagged-products.component';



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
        path: 'flaggedProducts',
        component: FlaggedProductsComponent
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
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'unreadMessages',
        component: UnreadMessagesComponent
      },
      {
        path: 'messageList/:userEmail',
        component: MessageListComponent
      },
      {
        path: 'pendingAd',
        component: PendingAdComponent
      },
      {
        path: 'activeAd',
        component: ActiveAdComponent
      },
      {
        path: 'expiredAd',
        component: ExpiredAdComponent
      },
      {
        path: 'pendingPromos',
        component: PendingPromosComponent
      },
      {
        path: 'activePromos',
        component: ActivePromosComponent
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
