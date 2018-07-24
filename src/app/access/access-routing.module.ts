import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccessComponent} from './access.component';

const routes: Routes = [
  {path: '', component: AccessComponent},
  {path: '', redirectTo: 'access', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
