import { TestBed, async, inject } from '@angular/core/testing';

import { FamilyGuard } from './family.guard';

describe('FamilyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamilyGuard]
    });
  });

  it('should ...', inject([FamilyGuard], (guard: FamilyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
