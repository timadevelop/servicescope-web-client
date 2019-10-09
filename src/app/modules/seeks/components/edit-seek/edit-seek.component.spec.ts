/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditSeekComponent } from './edit-seek.component';

describe('EditSeekComponent', () => {
  let component: EditSeekComponent;
  let fixture: ComponentFixture<EditSeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
