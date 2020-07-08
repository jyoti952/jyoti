import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySignedUpComponent } from './family-signed-up.component';

describe('FamilySignedUpComponent', () => {
  let component: FamilySignedUpComponent;
  let fixture: ComponentFixture<FamilySignedUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilySignedUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySignedUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
