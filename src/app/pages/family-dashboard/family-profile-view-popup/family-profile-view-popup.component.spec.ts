import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterProfileViewPopupComponent } from './letter-profile-view-popup.component';


describe('LetterProfileViewPopupComponent', () => {
  let component: LetterProfileViewPopupComponent;
  let fixture: ComponentFixture<LetterProfileViewPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterProfileViewPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterProfileViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
