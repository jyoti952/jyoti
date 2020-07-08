import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AdminComponent } from './admin.component';
import { FamilySignedUpComponent } from './family-signed-up/family-signed-up.component';
import { MatchedFamiliesComponent } from './matched-families/matched-families.component';
import { ElfsComponent } from './elfs/elfs.component';
import { FlaggedUsersComponent } from './flagged-users/flagged-users.component';
import { FlaggedUserPopupComponent } from './flagged-user-popup/flagged-user-popup.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FamilyOnboardingGuard } from 'src/app/guards/family-onboarding.guard';
import { OrderModule } from 'ngx-order-pipe';
import { FamilySignedupDetailsComponent } from './family-signedup-details/family-signedup-details.component';
import { FamilySignedupLetterViewPopupComponent } from './family-signedup-letter-view-popup/family-signedup-letter-view-popup.component';
import { MatchFamiliesProfileViewComponent } from './match-families-profile-view/match-families-profile-view.component';
import { MatchFamiliesProfileViewPopupComponent } from './match-families-profile-view-popup/match-families-profile-view-popup.component';
import { ElfAdminProfileViewComponent } from './elf-admin-profile-view/elf-admin-profile-view.component';
import { ElfAdminProfileViewPopupComponent } from './elf-admin-profile-view-popup/elf-admin-profile-view-popup.component';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';
import { BlockedUsersProfileComponent } from './blocked-users-profile/blocked-users-profile.component';
import { BlockedUsersPopupComponent } from './blocked-users-popup/blocked-users-popup.component';
import { SearchbynamePipe } from './pipes/searchbyname.pipe';
import { MatchedPipe } from './pipes/matched.pipe';
import { SignedupPipe } from './pipes/signedup.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { Ng2CableModule } from 'ng2-cable';
import { ConversationPipe } from './pipes/conversation.pipe';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
const routes: Routes = [
  { path: 'dashboard', component: AdminComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'family-signed-up', component: FamilySignedUpComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'matched-families', component: MatchedFamiliesComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'elf', component: ElfsComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'flagged-users', component: FlaggedUsersComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'blocked-users', component: BlockedUsersComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'blocked-users/profile', component: BlockedUsersProfileComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'conversations', component: ConversationsComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'conversations/:id', component: ConversationsComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'family-signed-up/profile/:id', component: FamilySignedupDetailsComponent },
  { path: 'matched-families/profile/:id', component: MatchFamiliesProfileViewComponent },
  { path: 'blocked-users/profile/:id', component: BlockedUsersProfileComponent, canActivate: [FamilyOnboardingGuard] },
  { path: 'elf/profile/:id', component: ElfAdminProfileViewComponent },
];


@NgModule({
  declarations: [
    AdminComponent,
    FamilySignedUpComponent,
    MatchedFamiliesComponent,
    ElfsComponent,
    FlaggedUsersComponent,
    FlaggedUserPopupComponent,
    ConversationsComponent,
    FamilySignedupDetailsComponent,
    FamilySignedupLetterViewPopupComponent,
    MatchFamiliesProfileViewComponent,
    MatchFamiliesProfileViewPopupComponent,
    ElfAdminProfileViewComponent,
    ElfAdminProfileViewPopupComponent,
    BlockedUsersComponent,
    BlockedUsersProfileComponent,
    BlockedUsersPopupComponent,
    SearchbynamePipe,
    MatchedPipe,
    SignedupPipe,
    ConversationPipe,

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    Ng2SearchPipeModule,
    OrderModule,
    NgScrollbarModule,
    NgxPaginationModule,
    Ng2CableModule,
    MultiSelectAllModule,
    DropDownListModule,
    NgxEmojiPickerModule.forRoot()
  ]
})
export class AdminModule { }
