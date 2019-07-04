/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PromoteServiceUsingCouponComponent } from './promote-service-using-coupon.component';

describe('PromoteServiceUsingCouponComponent', () => {
  let component: PromoteServiceUsingCouponComponent;
  let fixture: ComponentFixture<PromoteServiceUsingCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteServiceUsingCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteServiceUsingCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
