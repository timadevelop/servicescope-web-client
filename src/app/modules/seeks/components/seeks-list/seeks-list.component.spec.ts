import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeksListComponent } from './seeks-list.component';

describe('SeeksListComponent', () => {
  let component: SeeksListComponent;
  let fixture: ComponentFixture<SeeksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
