import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElfsComponent } from './elfs.component';

describe('ElfsComponent', () => {
  let component: ElfsComponent;
  let fixture: ComponentFixture<ElfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
