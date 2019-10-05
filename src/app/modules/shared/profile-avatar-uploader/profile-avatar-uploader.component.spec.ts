import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAvatarUploaderComponent } from './profile-avatar-uploader.component';

describe('ProfileAvatarUploaderComponent', () => {
  let component: ProfileAvatarUploaderComponent;
  let fixture: ComponentFixture<ProfileAvatarUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAvatarUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAvatarUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
