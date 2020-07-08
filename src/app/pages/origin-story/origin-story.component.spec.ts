import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginStoryComponent } from './origin-story.component';

describe('OriginStoryComponent', () => {
  let component: OriginStoryComponent;
  let fixture: ComponentFixture<OriginStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
