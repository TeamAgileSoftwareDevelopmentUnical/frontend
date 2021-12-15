import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllProductPage } from './all-product.page';

const routes: Routes = [
  {
    path: '',
    component: AllProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllProductPageRoutingModule {}
