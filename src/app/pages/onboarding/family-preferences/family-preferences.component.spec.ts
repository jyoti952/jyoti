import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPreferencesComponent } from './family-preferences.component';

describe('FamilyPreferencesComponent', () => {
  let component: FamilyPreferencesComponent;
  let fixture: ComponentFixture<FamilyPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
