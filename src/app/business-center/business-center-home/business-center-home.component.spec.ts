import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCenterHomeComponent } from './business-center-home.component';

describe('BusinessCenterHomeComponent', () => {
  let component: BusinessCenterHomeComponent;
  let fixture: ComponentFixture<BusinessCenterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCenterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCenterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
