import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxLoadingModule } from 'ngx-loading';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FamilyMatchesComponent } from './family-matches.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FamilyMatchProfileViewComponent } from './family-match-profile-view/family-match-profile-view.component';
import { FamilyMatchLetterViewPopupComponent } from './family-match-letter-view-popup/family-match-letter-view-popup.component';

const routes: Routes = [
  { path: '', component: FamilyMatchesComponent },
  { path: 'profile/:id', component: FamilyMatchProfileViewComponent },
];

@NgModule({
  declarations: [
    FamilyMatchesComponent,
    FamilyMatchProfileViewComponent,
    FamilyMatchLetterViewPopupComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NgScrollbarModule,
    NgxLoadingModule,
    MultiSelectAllModule,
    DropDownListModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  exports: [RouterModule],
})
export class FamilyMatchesModule { }
