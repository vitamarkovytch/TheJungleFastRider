import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RidesComponent} from './rides/rides.component';

const routes: Routes = [
  {path: '', component: RidesComponent},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'access', loadChildren: './access/access.module#AccessModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
