import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElfComponent } from './elf.component';

describe('ElfComponent', () => {
  let component: ElfComponent;
  let fixture: ComponentFixture<ElfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
