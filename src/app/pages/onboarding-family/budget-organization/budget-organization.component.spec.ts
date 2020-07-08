import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetOrganizationComponent } from './budget-organization.component';

describe('BudgetOrganizationComponent', () => {
  let component: BudgetOrganizationComponent;
  let fixture: ComponentFixture<BudgetOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
