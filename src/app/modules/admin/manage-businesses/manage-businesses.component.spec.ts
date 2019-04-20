import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBusinessesComponent } from './manage-businesses.component';

describe('ManageBusinessesComponent', () => {
  let component: ManageBusinessesComponent;
  let fixture: ComponentFixture<ManageBusinessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBusinessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
