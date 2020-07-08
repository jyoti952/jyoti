import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElfAdminProfileViewPopupComponent } from './elf-admin-profile-view-popup.component';

describe('ElfAdminProfileViewPopupComponent', () => {
  let component: ElfAdminProfileViewPopupComponent;
  let fixture: ComponentFixture<ElfAdminProfileViewPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElfAdminProfileViewPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElfAdminProfileViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
