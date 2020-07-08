import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMatchLetterViewPopupComponent } from './family-match-letter-view-popup.component';

describe('FamilyMatchLetterViewPopupComponent', () => {
  let component: FamilyMatchLetterViewPopupComponent;
  let fixture: ComponentFixture<FamilyMatchLetterViewPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyMatchLetterViewPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMatchLetterViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
