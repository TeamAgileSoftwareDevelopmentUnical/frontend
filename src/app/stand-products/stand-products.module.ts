import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StandProductsPageRoutingModule } from './stand-products-routing.module';

import { StandProductsPage } from './stand-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StandProductsPageRoutingModule
  ],
  declarations: [StandProductsPage]
})
export class StandProductsPageModule {}
