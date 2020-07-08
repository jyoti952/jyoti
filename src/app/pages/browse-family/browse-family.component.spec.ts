import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseFamilyComponent } from './browse-family.component';

describe('BrowseFamilyComponent', () => {
  let component: BrowseFamilyComponent;
  let fixture: ComponentFixture<BrowseFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
