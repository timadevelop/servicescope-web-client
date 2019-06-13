import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledTextComponent } from './labeled-text.component';

describe('LabeledTextComponent', () => {
  let component: LabeledTextComponent;
  let fixture: ComponentFixture<LabeledTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeledTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
