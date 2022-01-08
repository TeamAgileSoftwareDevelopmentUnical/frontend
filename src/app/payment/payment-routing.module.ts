import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentPage } from './payment.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage,
    children: [
      {
        path: 'paypal',
        children: [
          {
            path: '',
            loadChildren: () => import('./paypal/paypal.module').then( m => m.PaypalPageModule)
          }
        ]
      },
      {
        path: 'card',
        children: [
          {
            path: '',
            loadChildren: () => import('./card/card.module').then( m => m.CardPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/payment/paypal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/payment/paypal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentPageRoutingModule {}
