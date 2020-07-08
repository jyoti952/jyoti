import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedFamiliesComponent } from './matched-families.component';

describe('MatchedFamiliesComponent', () => {
  let component: MatchedFamiliesComponent;
  let fixture: ComponentFixture<MatchedFamiliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedFamiliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
