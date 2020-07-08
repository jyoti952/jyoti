import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResetFamilyComponent } from './reset-family/reset-family.component';

const routes: Routes = [
  { path: 'resetElf', component: ResetPasswordComponent },
  { path: 'resetFamily', component: ResetFamilyComponent }
];

@NgModule({
  declarations: [
    ResetPasswordComponent,
    ResetFamilyComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class ResetPasswordModule { }
