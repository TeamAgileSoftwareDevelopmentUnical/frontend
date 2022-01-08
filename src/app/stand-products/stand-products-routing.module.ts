import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandProductsPage } from './stand-products.page';

const routes: Routes = [
  {
    path: '',
    component: StandProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandProductsPageRoutingModule {}
