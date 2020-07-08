import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingElfNavComponent } from './onboarding-elf-nav.component';

describe('OnboardingElfNavComponent', () => {
  let component: OnboardingElfNavComponent;
  let fixture: ComponentFixture<OnboardingElfNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingElfNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingElfNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
