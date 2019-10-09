import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeksDetailComponent } from './seeks-detail.component';

describe('SeeksDetailComponent', () => {
  let component: SeeksDetailComponent;
  let fixture: ComponentFixture<SeeksDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeksDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
