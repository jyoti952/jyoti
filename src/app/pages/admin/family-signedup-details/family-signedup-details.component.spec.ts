import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySignedupDetailsComponent } from './family-signedup-details.component';

describe('FamilySignedupDetailsComponent', () => {
  let component: FamilySignedupDetailsComponent;
  let fixture: ComponentFixture<FamilySignedupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilySignedupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySignedupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
