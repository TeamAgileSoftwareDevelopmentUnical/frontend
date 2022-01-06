import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations:[MenuComponent,],
    exports:[MenuComponent],
    imports: [CommonModule]
})
export class ComponentsModule{}