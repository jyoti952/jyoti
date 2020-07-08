import { TestBed, async, inject } from '@angular/core/testing';

import { ElfOnboardingGuard } from './elf-onboarding.guard';

describe('ElfOnboardingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElfOnboardingGuard]
    });
  });

  it('should ...', inject([ElfOnboardingGuard], (guard: ElfOnboardingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
