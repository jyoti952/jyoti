import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedUsersProfileComponent } from './blocked-users-profile.component';

describe('BlockedUsersProfileComponent', () => {
  let component: BlockedUsersProfileComponent;
  let fixture: ComponentFixture<BlockedUsersProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedUsersProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedUsersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
