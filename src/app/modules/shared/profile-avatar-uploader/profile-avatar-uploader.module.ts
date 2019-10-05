import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAvatarUploaderComponent } from './profile-avatar-uploader.component';
import { NzIconModule, NzUploadModule, NzToolTipModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    NzUploadModule,
    NzToolTipModule
  ],
  declarations: [ProfileAvatarUploaderComponent],
  exports: [ProfileAvatarUploaderComponent]
})
export class ProfileAvatarUploaderModule { }
