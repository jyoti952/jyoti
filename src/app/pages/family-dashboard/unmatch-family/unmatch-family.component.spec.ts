import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnmatchFamilyComponent } from './unmatch-family.component';

describe('UnmatchFamilyComponent', () => {
  let component: UnmatchFamilyComponent;
  let fixture: ComponentFixture<UnmatchFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnmatchFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnmatchFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
