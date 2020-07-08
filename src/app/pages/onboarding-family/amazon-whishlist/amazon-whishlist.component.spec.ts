import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonWhishlistComponent } from './amazon-whishlist.component';

describe('AmazonWhishlistComponent', () => {
  let component: AmazonWhishlistComponent;
  let fixture: ComponentFixture<AmazonWhishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmazonWhishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonWhishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
