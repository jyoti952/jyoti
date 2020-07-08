import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SharedModule } from 'src/app/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrowseFamilyComponent } from './browse-family.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { MatchFamilyPopupComponent } from './match-family-popup/match-family-popup.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SearchpipePipe } from './pipes/searchpipe.pipe';
import { NgxLoadingModule } from 'ngx-loading';
import { BrowseProfileComponent } from './browse-profile/browse-profile.component';
import { FilterComponent } from './filter/filter.component';
import { OrderModule } from 'ngx-order-pipe';
import { StatePipe } from './pipes/state.pipe';
import { OrganisationPipe } from './pipes/organisation.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  { path: '', component: BrowseFamilyComponent,canActivate:[AuthGuard] },
  { path: 'profile/:id', component: BrowseProfileComponent,canActivate:[AuthGuard] },
];

@NgModule({
  declarations: [
    BrowseFamilyComponent,
    ProfileDetailComponent,
    MatchFamilyPopupComponent,
    SearchpipePipe,
    BrowseProfileComponent,
    FilterComponent,
    StatePipe,
    OrganisationPipe,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    MultiSelectAllModule,
    DropDownListModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxLoadingModule,
    NgScrollbarModule,
    OrderModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class BrowseFamilyModule { }
