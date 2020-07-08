import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFamiliesProfileViewPopupComponent } from './match-families-profile-view-popup.component';

describe('MatchFamiliesProfileViewPopupComponent', () => {
  let component: MatchFamiliesProfileViewPopupComponent;
  let fixture: ComponentFixture<MatchFamiliesProfileViewPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFamiliesProfileViewPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFamiliesProfileViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
