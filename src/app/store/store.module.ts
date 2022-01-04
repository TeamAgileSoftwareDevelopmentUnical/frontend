import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePageRoutingModule } from './store-routing.module';

import { StorePage } from './store.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorePageRoutingModule,
    ComponentsModule
  ],
  declarations: [StorePage]
})
export class StorePageModule {}
