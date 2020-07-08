import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMatchProfileViewComponent } from './family-match-profile-view.component';

describe('FamilyMatchProfileViewComponent', () => {
  let component: FamilyMatchProfileViewComponent;
  let fixture: ComponentFixture<FamilyMatchProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyMatchProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMatchProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
