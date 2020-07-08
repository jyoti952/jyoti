import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingFamilyNavComponent } from './onboarding-family-nav.component';

describe('OnboardingFamilyNavComponent', () => {
  let component: OnboardingFamilyNavComponent;
  let fixture: ComponentFixture<OnboardingFamilyNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingFamilyNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingFamilyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
