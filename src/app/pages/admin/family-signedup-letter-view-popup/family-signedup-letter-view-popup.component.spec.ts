import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySignedupLetterViewoPopupComponent } from './family-signedup-letter-viewo-popup.component';

describe('FamilySignedupLetterViewoPopupComponent', () => {
  let component: FamilySignedupLetterViewoPopupComponent;
  let fixture: ComponentFixture<FamilySignedupLetterViewoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilySignedupLetterViewoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySignedupLetterViewoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
