import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFamiliesProfileViewComponent } from './match-families-profile-view.component';

describe('MatchFamiliesProfileViewComponent', () => {
  let component: MatchFamiliesProfileViewComponent;
  let fixture: ComponentFixture<MatchFamiliesProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFamiliesProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFamiliesProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
