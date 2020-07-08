import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { LandingPageComponent } from './landing-page.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
];

@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class LandingPageModule { }
