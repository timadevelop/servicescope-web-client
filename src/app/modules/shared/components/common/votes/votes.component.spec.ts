/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VotesComponent } from './votes.component';

describe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture: ComponentFixture<VotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
