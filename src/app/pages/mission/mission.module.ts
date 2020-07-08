import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';

import { MissionComponent } from './mission.component';

const routes: Routes = [
  { path: '', component: MissionComponent },
];

@NgModule({
  declarations: [
    MissionComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ]
})
export class MissionModule { }
