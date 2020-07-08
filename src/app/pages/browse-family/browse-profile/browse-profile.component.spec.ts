import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseProfileComponent } from './browse-profile.component';

describe('BrowseProfileComponent', () => {
  let component: BrowseProfileComponent;
  let fixture: ComponentFixture<BrowseProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
