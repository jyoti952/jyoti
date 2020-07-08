import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordForFamilyComponent } from './forgot-password.component';

describe('ForgotPasswordForFamilyComponent', () => {
  let component: ForgotPasswordForFamilyComponent;
  let fixture: ComponentFixture<ForgotPasswordForFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordForFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordForFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
