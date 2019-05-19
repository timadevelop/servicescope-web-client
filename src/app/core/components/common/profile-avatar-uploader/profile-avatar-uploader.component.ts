import { Component, OnInit, Input } from '@angular/core';
import { UploadFile, NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { UserService } from 'src/app/core/services/user.service';
import { Observable, Observer } from 'rxjs';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/core/models/User.model';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-profile-avatar-uploader',
  templateUrl: './profile-avatar-uploader.component.html',
  styleUrls: ['./profile-avatar-uploader.component.scss']
})
export class ProfileAvatarUploaderComponent implements OnInit {

  @Input() user: User;
  loading = false;
  lastImageUrl: string = null;

  constructor(
    private i18n: I18n,
    public userService: UserService,
    private msg: NzMessageService) { }

  ngOnInit() {
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      if (!this.userService.currentUser ||
        this.user.id !== this.userService.currentUser.id) {
        this.msg.error(this.i18n({value: 'You can not change avatar of this user!', id: 'permissionDeniedOnUserAvatarChangeText'}));
        observer.complete();
        return;
      }

      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error(this.i18n({value: 'You can only upload JPG / PNG file!', id: 'uploadImageErrorBecauseFileType'}));
        observer.complete();
        return;
      }

      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.msg.error(this.i18n({value: 'Image must smaller than 3MB!', id: 'uploadImageErrorBecauseSize'}));
        observer.complete();
        return;
      }
      // check height
      // this.checkImageDimension(file).then(dimensionRes => {
      //   if (!dimensionRes) {
      //     this.msg.error('Image only 300x300 above');
      //     observer.complete();
      //     return;
      //   }
      // });
      observer.next(isJpgOrPng && isLt3M);
      observer.complete();

    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  // TODO?
  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  uploadAvatar = (item: UploadXHRArgs) => {
    return this.userService.updateCurrentUserAvatar(item)
      .subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              (event as any).percent = (event.loaded / event.total!) * 100;
            }
            item.onProgress!(event, item.file!);
          } else if (event instanceof HttpResponse) {
            // uploaded
            this.lastImageUrl = event.body['image'];
            this.msg.success(this.i18n({value: 'Successfully updated avatar', id: 'successUpdatedAvatar'}))
            item.onSuccess!(event.body, item.file!, event);
          }
        },
        err => {
          // fail
          this.msg.error(this.i18n({value: "Error uploading new avatar", id: 'errorUpdatingAvatar'}));
          item.onError!(err, item.file!);
        });
  };

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
        });
        break;
      case 'error':
        this.msg.error(this.i18n({value: 'Network error', id: 'networkErrorText'}));
        this.loading = false;
        break;
    }
  }

  getImageUrl() {
    if (this.lastImageUrl) return this.lastImageUrl;
    else if (this.user && this.user.image) return this.user.image;
    else return 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  }

  getAvatarStyles() {
    let styles = {
      'background-image': `url(${this.getImageUrl()})`
    };

    return styles;
  }
}
