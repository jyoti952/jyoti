import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';

import { TermsComponent } from './terms.component';


const routes: Routes = [
  { path: '', component: TermsComponent },

];

@NgModule({
  declarations: [
    TermsComponent,

  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule
  ],
  exports: [RouterModule],
})
export class TermsModule { }
