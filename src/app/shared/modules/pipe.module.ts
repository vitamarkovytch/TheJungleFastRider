import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CustomTimePipe} from '../pipes/custom-time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CustomTimePipe
  ],
  declarations: [CustomTimePipe]
})
export class PipeModule { }
