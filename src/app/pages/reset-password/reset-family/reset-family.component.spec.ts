import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFamilyComponent } from './reset-family.component';

describe('ResetFamilyComponent', () => {
  let component: ResetFamilyComponent;
  let fixture: ComponentFixture<ResetFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
