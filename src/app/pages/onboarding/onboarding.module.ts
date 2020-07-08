import { NgModule } from '@angular/core';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedModule } from 'src/app/shared.module';

import { OnboardingComponent } from './onboarding.component';
import { AnonymousFamilyComponent } from './anonymous-family/anonymous-family.component';
import { LocationComponent } from './location/location.component';
import { FamilyPreferencesComponent } from './family-preferences/family-preferences.component';
import { BudgetComponent } from './budget/budget.component';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OnboardingElfNavComponent } from './onboarding-elf-nav/onboarding-elf-nav.component';
import { CreateUsernameComponent } from './create-username/create-username.component';
import { ReactiveFormsModule,  FormsModule } from '@angular/forms';
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
import { ElfOnboardingGuard } from 'src/app/guards/elf-onboarding.guard';
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
  { path: '', component: OnboardingComponent,canActivate:[AuthGuard]},
  { path: 'profile-photo', component: CreateUsernameComponent,canActivate:[AuthGuard] },
  { path: 'anonymous-family', component: AnonymousFamilyComponent,canActivate:[AuthGuard] },
  { path: 'family-preferences', component: FamilyPreferencesComponent,canActivate:[AuthGuard] },
  { path: 'location', component: LocationComponent,canActivate:[AuthGuard] },
  { path: 'budget', component: BudgetComponent,canActivate:[AuthGuard] },
  { path: 'organisations', component: OrganisationsComponent,canActivate:[AuthGuard] },

];

@NgModule({
  declarations: [
    OnboardingComponent,
    AnonymousFamilyComponent,
    LocationComponent,
    FamilyPreferencesComponent,
    BudgetComponent,
    OrganisationsComponent,
    OnboardingElfNavComponent,
    CreateUsernameComponent,
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
export class OnBoardingModule { }
