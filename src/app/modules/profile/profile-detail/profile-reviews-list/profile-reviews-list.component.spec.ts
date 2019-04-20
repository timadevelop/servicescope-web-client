import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReviewsListComponent } from './profile-reviews-list.component';

describe('ProfileReviewsListComponent', () => {
  let component: ProfileReviewsListComponent;
  let fixture: ComponentFixture<ProfileReviewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReviewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReviewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
