import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllProductPageRoutingModule } from './all-product-routing.module';

import { AllProductPage } from './all-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllProductPageRoutingModule
  ],
  declarations: [AllProductPage]
})
export class AllProductPageModule {}
