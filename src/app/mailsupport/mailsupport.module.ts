import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailsupportPageRoutingModule } from './mailsupport-routing.module';

import { MailsupportPage } from './mailsupport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MailsupportPageRoutingModule
  ],
  declarations: [MailsupportPage]
})
export class MailsupportPageModule {}
