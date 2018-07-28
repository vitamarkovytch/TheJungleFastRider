import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import {MaterialModule} from './shared/modules/material.module';
import { RidesComponent } from './rides/rides.component';
import {AppRoutingModule} from './app-routing.module';
import { PinValidatorDirective } from './shared/directives/pin-validator.directive';
import {PipeModule} from './shared/modules/pipe.module';
import {ProgressBarComponent} from './shared/progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    RidesComponent,
    PinValidatorDirective,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    HttpClientModule,
  ],
  providers: [CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
