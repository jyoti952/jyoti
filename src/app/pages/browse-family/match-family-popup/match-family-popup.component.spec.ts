import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFamilyPopupComponent } from './match-family-popup.component';

describe('MatchFamilyPopupComponent', () => {
  let component: MatchFamilyPopupComponent;
  let fixture: ComponentFixture<MatchFamilyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFamilyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFamilyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
