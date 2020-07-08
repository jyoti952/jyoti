import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';

import { PrivacyPolicyComponent } from './privacy-policy.component';

const routes: Routes = [
  { path: '', component: PrivacyPolicyComponent },
];

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class PrivacyPolicyModule { }
