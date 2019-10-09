/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PromoteSeekUsingCouponComponent } from './promote-seek-using-coupon.component';

describe('PromoteSeekUsingCouponComponent', () => {
  let component: PromoteSeekUsingCouponComponent;
  let fixture: ComponentFixture<PromoteSeekUsingCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteSeekUsingCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteSeekUsingCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
