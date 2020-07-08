import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnonymousFamilyComponent } from './anonymous-family.component';
//import { AnonymousFamilyComponent } from './size-budget.component';

describe('AnonymousFamilyComponent', () => {
  let component: AnonymousFamilyComponent;
  let fixture: ComponentFixture<AnonymousFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
