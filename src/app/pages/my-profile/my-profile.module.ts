import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { MyProfileComponent } from './my-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileLetterPopupComponent } from './profile-letter-popup/profile-letter-popup.component';

import { NgxLoadingModule } from 'ngx-loading';
const routes: Routes = [
  { path: '', component: MyProfileComponent },

];

@NgModule({
  declarations: [
    MyProfileComponent,
    ProfileLetterPopupComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    NgScrollbarModule,
    MultiSelectAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxLoadingModule
  ],
  exports: [RouterModule],
})
export class MyProfileModule { }
