import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCenterComponent } from './business-center.component';

describe('BusinessCenterComponent', () => {
  let component: BusinessCenterComponent;
  let fixture: ComponentFixture<BusinessCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
