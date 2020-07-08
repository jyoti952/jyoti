import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';

import { BoardComponent } from './board.component';

const routes: Routes = [
  { path: '', component: BoardComponent },
];

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ]
})
export class BoardModule { }
