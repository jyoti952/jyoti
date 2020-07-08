import { TestBed, async, inject } from '@angular/core/testing';

import { FamilyOnboardingGuard } from './family-onboarding.guard';

describe('FamilyOnboardingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamilyOnboardingGuard]
    });
  });

  it('should ...', inject([FamilyOnboardingGuard], (guard: FamilyOnboardingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
