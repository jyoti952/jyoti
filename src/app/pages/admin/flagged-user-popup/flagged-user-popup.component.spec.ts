import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedUserPopupComponent } from './flagged-user-popup.component';

describe('FlaggedUserPopupComponent', () => {
  let component: FlaggedUserPopupComponent;
  let fixture: ComponentFixture<FlaggedUserPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlaggedUserPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
