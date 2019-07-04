/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PromotedServicesListComponent } from './promoted-services-list.component';

describe('PromotedServicesListComponent', () => {
  let component: PromotedServicesListComponent;
  let fixture: ComponentFixture<PromotedServicesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotedServicesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotedServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
