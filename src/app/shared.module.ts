import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './includes/header/header.component';
import { OnboardingFooterComponent } from './includes/onboarding-footer/onboarding-footer.component';
import { InnerHeaderComponent } from './includes/inner-header/inner-header.component';
import { InnerHeaderNavComponent } from './includes/inner-header-nav/inner-header-nav.component';
import { VideoPopupComponent } from './includes/video-popup/video-popup.component';
import { SearchBarComponent } from './includes/search-bar/search-bar.component';
import { AdminMenuComponent } from './includes/admin-menu/admin-menu.component';
import { LetterProfileViewPopupComponent } from './includes/letter-profile-view-popup/letter-profile-view-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './includes/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    OnboardingFooterComponent,
    InnerHeaderComponent,
    InnerHeaderNavComponent,
    VideoPopupComponent,
    SearchBarComponent,
    AdminMenuComponent,
    LetterProfileViewPopupComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    InnerHeaderComponent,
    VideoPopupComponent,
    OnboardingFooterComponent,
    SearchBarComponent,
    AdminMenuComponent,
    LetterProfileViewPopupComponent,
  ]
})
export class SharedModule { }
