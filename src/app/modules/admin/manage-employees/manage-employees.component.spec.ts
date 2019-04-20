import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeesComponent } from './manage-employees.component';

describe('ManageEmployeesComponent', () => {
  let component: ManageEmployeesComponent;
  let fixture: ComponentFixture<ManageEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
