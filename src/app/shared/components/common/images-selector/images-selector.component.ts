import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UploadFile, NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { Observer, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-images-selector',
  templateUrl: './images-selector.component.html',
  styleUrls: ['./images-selector.component.scss']
})
export class ImagesSelectorComponent implements OnInit {
  loading: boolean = false;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  fileList: Array<UploadFile> = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  @Output() onChange = new EventEmitter<Array<UploadFile>>();
  @Input() maxItemsLength: number = 10;

  constructor(private msg: NzMessageService) { }

  ngOnInit() {
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.msg.error('Image must smaller than 5MB!');
        observer.complete();
        return;
      }

      observer.next(isJPG && isLt5M);
      observer.complete();
    });
  };

  upload = (item: UploadXHRArgs): Subscription => {
    return new Observable<null>().subscribe();
  };

  handleChange(info: { file: UploadFile }): void {
    this.loading = false;
    info.file.status = 'success';
    this.onChange.emit(this.fileList);
  }
}
