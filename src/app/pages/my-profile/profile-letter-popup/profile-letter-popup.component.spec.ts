import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLetterPopupComponent } from './profile-letter-popup.component';

describe('ProfileLetterPopupComponent', () => {
  let component: ProfileLetterPopupComponent;
  let fixture: ComponentFixture<ProfileLetterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLetterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLetterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
