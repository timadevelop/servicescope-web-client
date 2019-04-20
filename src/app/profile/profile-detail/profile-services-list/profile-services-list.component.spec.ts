import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileServicesListComponent } from './profile-services-list.component';

describe('ProfileServicesListComponent', () => {
  let component: ProfileServicesListComponent;
  let fixture: ComponentFixture<ProfileServicesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileServicesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
