import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMatchesComponent } from './family-matches.component';

describe('FamilyMatchesComponent', () => {
  let component: FamilyMatchesComponent;
  let fixture: ComponentFixture<FamilyMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
