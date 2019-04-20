import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsListComponent } from './profile-posts-list.component';

describe('ProfilePostsListComponent', () => {
  let component: ProfilePostsListComponent;
  let fixture: ComponentFixture<ProfilePostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePostsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
