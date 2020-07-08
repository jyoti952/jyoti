import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordForAdminComponent } from './forgot-password-for-admin.component';

describe('ForgotPasswordForAdminComponent', () => {
  let component: ForgotPasswordForAdminComponent;
  let fixture: ComponentFixture<ForgotPasswordForAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordForAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
