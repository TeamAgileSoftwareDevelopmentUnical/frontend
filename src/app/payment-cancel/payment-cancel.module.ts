import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentCancelPageRoutingModule } from './payment-cancel-routing.module';

import { PaymentCancelPage } from './payment-cancel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentCancelPageRoutingModule
  ],
  declarations: [PaymentCancelPage]
})
export class PaymentCancelPageModule {}
