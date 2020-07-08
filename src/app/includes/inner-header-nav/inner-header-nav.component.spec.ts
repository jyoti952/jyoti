import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerHeaderNavComponent } from './inner-header-nav.component';

describe('InnerHeaderNavComponent', () => {
  let component: InnerHeaderNavComponent;
  let fixture: ComponentFixture<InnerHeaderNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerHeaderNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerHeaderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
