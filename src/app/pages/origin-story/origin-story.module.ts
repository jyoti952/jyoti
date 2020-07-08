import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';

import { OriginStoryComponent } from './origin-story.component';

const routes: Routes = [
  { path: '', component: OriginStoryComponent },
];


@NgModule({
  declarations: [
    OriginStoryComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class OriginStoryModule { }
