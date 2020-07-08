import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElfAdminProfileViewComponent } from './elf-admin-profile-view.component';

describe('ElfAdminProfileViewComponent', () => {
  let component: ElfAdminProfileViewComponent;
  let fixture: ComponentFixture<ElfAdminProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElfAdminProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElfAdminProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
