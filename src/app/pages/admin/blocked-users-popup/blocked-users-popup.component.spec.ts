import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedUsersPopupComponent } from './blocked-users-popup.component';

describe('BlockedUsersPopupComponent', () => {
  let component: BlockedUsersPopupComponent;
  let fixture: ComponentFixture<BlockedUsersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedUsersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedUsersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
