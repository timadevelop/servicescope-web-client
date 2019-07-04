/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsonLabelValueEditorComponent } from './json-label-value-editor.component';

describe('JsonLabelValueEditorComponent', () => {
  let component: JsonLabelValueEditorComponent;
  let fixture: ComponentFixture<JsonLabelValueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonLabelValueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonLabelValueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
