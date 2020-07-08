import { NgModule } from '@angular/core';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedModule } from 'src/app/shared.module';

import { OnboardingFamilyComponent } from './onboarding-family.component';
import { AmazonWhishlistComponent } from './amazon-whishlist/amazon-whishlist.component';
import { FamilyInformationComponent } from './family-information/family-information.component';
import { ChooseLocationComponent } from './choose-location/choose-location.component';
import { OnboardingFamilyNavComponent } from './onboarding-family-nav/onboarding-family-nav.component';
import { UploadLetterComponent } from './upload-letter/upload-letter.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { BudgetOrganizationComponent } from './budget-organization/budget-organization.component';
import { FinalSubmitComponent } from './final-submit/final-submit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

import {
  LyThemeModule,
  LY_THEME,
  LY_THEME_GLOBAL_VARIABLES
} from '@alyle/ui';
/** Import the component modules */
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import { LyIconModule } from '@alyle/ui/icon';
import { LyDialogModule } from '@alyle/ui/dialog';
import { LyGridModule } from '@alyle/ui/grid';
import { LyTypographyModule } from '@alyle/ui/typography';


/** Import themes */
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { LySliderModule } from '@alyle/ui/slider';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FamilyGuard } from 'src/app/guards/family.guard';
import {WebcamModule} from 'ngx-webcam';
export class GlobalVariables {
  testVal = '#00bcd4';
  Quepal = {
    default: `linear-gradient(135deg,#11998e 0%,#38ef7d 100%)`,
    contrast: '#fff',
    shadow: '#11998e'
  };
  SublimeLight = {
    default: `linear-gradient(135deg,#FC5C7D 0%,#6A82FB 100%)`,
    contrast: '#fff',
    shadow: '#B36FBC'
  };
  Amber = {
    default: '#ffc107',
    contrast: 'rgba(0, 0, 0, 0.87)'
  };
}


const routes: Routes = [
  { path: '', component: OnboardingFamilyComponent ,canActivate:[FamilyGuard]},
  { path: 'santa-letter', component: UploadLetterComponent ,canActivate:[FamilyGuard]},
  { path: 'amazon-wishlist', component: AmazonWhishlistComponent,canActivate:[FamilyGuard] },
  { path: 'family-info', component: FamilyInformationComponent ,canActivate:[FamilyGuard]},
  { path: 'location', component: ChooseLocationComponent ,canActivate:[FamilyGuard]},
  { path: 'profile-information', component: ProfileInformationComponent,canActivate:[FamilyGuard]},
  { path: 'budget-organization', component: BudgetOrganizationComponent,canActivate:[FamilyGuard]},
  { path: 'thank-you', component: FinalSubmitComponent,canActivate:[FamilyGuard]  },

];

@NgModule({
  declarations: [
    OnboardingFamilyComponent,
    AmazonWhishlistComponent,
    FamilyInformationComponent,
    ChooseLocationComponent,
    OnboardingFamilyNavComponent,
    UploadLetterComponent,
    ProfileInformationComponent,
    BudgetOrganizationComponent,
    FinalSubmitComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MultiSelectAllModule,
    DropDownListModule,
    Ng5SliderModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    LyThemeModule.setTheme('minima-light'),
     // Add components
     LyButtonModule,
     LyToolbarModule,
     LyResizingCroppingImageModule,
     LyIconModule,
     LyResizingCroppingImageModule,
     LySliderModule,
     LyButtonModule,
     LyDialogModule,
     LyGridModule,
     LyTypographyModule,
     LyThemeModule,
     WebcamModule
     
  ],
  providers: [
    {
      provide: LY_THEME,
      useClass: MinimaLight,
      multi: true
    },
    {
      provide: LY_THEME,
      useClass: MinimaDark,
      multi: true
    },
    {
      provide: LY_THEME_GLOBAL_VARIABLES,
      useClass: GlobalVariables
    } // global variables
  ],
  exports: [RouterModule],
})
export class OnBoardingFamilyModule { }
