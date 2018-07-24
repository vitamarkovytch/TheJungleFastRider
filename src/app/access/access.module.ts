import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AccessComponent} from './access.component';
import {AccessRoutingModule} from './access-routing.module';
import {MaterialModule} from '../shared/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AccessRoutingModule
  ],
  declarations: [
    AccessComponent,
  ]
})
export class AccessModule { }
