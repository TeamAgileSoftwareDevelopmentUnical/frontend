import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailsupportPage } from './mailsupport.page';

const routes: Routes = [
  {
    path: '',
    component: MailsupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailsupportPageRoutingModule {}
