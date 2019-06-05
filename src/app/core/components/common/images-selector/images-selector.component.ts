import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UploadFile, NzMessageService, UploadXHRArgs, NzUploadComponent } from 'ng-zorro-antd';
import { Observer, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-images-selector',
  templateUrl: './images-selector.component.html',
  styleUrls: ['./images-selector.component.scss']
})
export class ImagesSelectorComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };

  fileList: Array<UploadFile> = [];
  previewImages: Array<{ image: string }> = [];
  previewVisible = false;

  @Output() onChange = new EventEmitter<Array<UploadFile>>();
  @Input() maxItemsLength: number = 10;
  @Input() size: 'small' | 'default' = 'default';
  @Input() clearEvent: Observable<void>;
  @Input() showFileDialog: boolean = false

  constructor(private msg: NzMessageService) { }

  clearSubscription: Subscription = null;

  @ViewChild('uploadCont') nzUpload: NzUploadComponent;

  ngOnInit() {
    if (this.clearEvent) {
      this.clearSubscription = this.clearEvent.subscribe(() => {
        this.fileList = [];
      });
    }
  }

  ngAfterViewInit() {
    if (this.showFileDialog) {
      if (this.nzUpload) this.nzUpload.uploadComp.onClick();
    }
  }

  ngOnDestroy(): void {
    if (this.clearSubscription) this.clearSubscription.unsubscribe();
  }

  handlePreview = (file: UploadFile) => {
    this.previewImages = [{ image: file.url || file.thumbUrl }];
    this.previewVisible = true;
  };

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isValidFileType = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isValidFileType) {
        this.msg.error('You can only upload JPG or PNG file!');
        observer.complete();
        return;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.msg.error('Image must smaller than 5MB!');
        observer.complete();
        return;
      }

      observer.next(isValidFileType && isLt5M);
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
