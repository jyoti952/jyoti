import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';

import { PressComponent } from './press.component';

const routes: Routes = [
  { path: '', component: PressComponent },
];

@NgModule({
  declarations: [
    PressComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ]
})
export class PressModule { }
