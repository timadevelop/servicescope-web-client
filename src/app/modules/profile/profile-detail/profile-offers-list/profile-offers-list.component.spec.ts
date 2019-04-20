import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOffersListComponent } from './profile-offers-list.component';

describe('ProfileOffersListComponent', () => {
  let component: ProfileOffersListComponent;
  let fixture: ComponentFixture<ProfileOffersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOffersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
