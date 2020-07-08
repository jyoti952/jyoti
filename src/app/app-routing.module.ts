import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/landing-page/landing-page.module#LandingPageModule' },
  { path: 'signup', loadChildren: './pages/sign-up/sign-up.module#SignUpModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LogInModule' },
  { path: 'onboarding/elf', loadChildren: './pages/onboarding/onboarding.module#OnBoardingModule' },
  { path: 'onboarding/family', loadChildren: './pages/onboarding-family/onboarding-family.module#OnBoardingFamilyModule' },
  { path: 'conversations/:id', loadChildren: './pages/conversations/conversations.module#ConversationsModule' },
  { path: 'conversations', loadChildren: './pages/conversations/conversations.module#ConversationsModule' },
  { path: 'browse-family', loadChildren: './pages/browse-family/browse-family.module#BrowseFamilyModule' },
  // { path: 'browse-family/profile/:id', loadChildren: './pages/browse-family/browse-family.module#BrowseFamilyModule' },
  { path: 'family-matches', loadChildren: './pages/family-matches/family-matches.module#FamilyMatchesModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordModule' },
  { path: 'terms', loadChildren: './pages/terms/terms.module#TermsModule' },
  { path: 'privacy-policy', loadChildren: './pages/privacy-policy/privacy-policy.module#PrivacyPolicyModule' },
  { path: 'origin-story', loadChildren: './pages/origin-story/origin-story.module#OriginStoryModule' },
  { path: 'faq', loadChildren: './pages/faq/faq.module#FaqModule' },
  { path: 'mission', loadChildren: './pages/mission/mission.module#MissionModule' },
  { path: 'press', loadChildren: './pages/press/press.module#PressModule' },
  { path: 'board', loadChildren: './pages/board/board.module#BoardModule' },
  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactModule' },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule' },
  { path: 'my-profile', loadChildren: './pages/my-profile/my-profile.module#MyProfileModule' },
  { path: 'my-profile/:id', loadChildren: './pages/my-profile/my-profile.module#MyProfileModule' },
  { path: 'family', loadChildren: './pages/family-dashboard/family-dashboard.module#FamilyDashboardModule' },

];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
