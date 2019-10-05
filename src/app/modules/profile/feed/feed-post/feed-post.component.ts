import { Component, OnInit, Output, EventEmitter, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { FeedService } from '../../services/feed.service';
import { FeedPostApiRequest } from 'src/app/core/models/api-request/feedpost-api-request.model.1';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FeedPost } from 'src/app/core/models/FeedPost.model';
import { TagsSelectorComponent } from 'src/app/modules/shared/tags-selector/tags-selector.component';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit, OnChanges {
  @Output() onNewPostRequest = new EventEmitter<FeedPostApiRequest>();
  @Output() onNewPostDelivered = new EventEmitter<FeedPost>();

  @Input() edit: boolean = false;
  @Input() editFeedPost: FeedPost;

  public submitOnCtrlEnter: boolean = true;
  focused: boolean = false;

  showUploadImagesForm: boolean = false;
  maxImagesLength = 10;

  loading: boolean = false;
  feedPostForm = this.fb.group({
    // string
    tags: [[], [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
    text: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
    images: [[], [Validators.minLength(0), Validators.maxLength(this.maxImagesLength + 1)]],
  });

  @ViewChild('tagsSelector', { static: false }) tagsSelector: TagsSelectorComponent;
  @ViewChild('postTextArea', { static: false }) postTextArea: ElementRef;

  constructor(
    private i18n: I18n,
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    public userService: UserService,
    private feedService: FeedService
  ) { }


  ngOnChanges(changes: SimpleChanges) {
    if (this.edit && this.editFeedPost) {
      this.initEditMode();
    }
  }

  ngOnInit() {
  }

  initEditMode() {
    if (this.edit && this.editFeedPost) {
      this.feedPostForm.patchValue({
        tags: this.editFeedPost.tags.map(v => v.name),
        text: this.editFeedPost.text,
        images: this.editFeedPost.images.map((v, index, arr) => {
          return {
            uid: index,
            name: `image_${index}`,
            status: 'done',
            url: v.image
          }
        }),
      });
      this.focused = true;
      this.showUploadImagesForm = true;
      this.focusOnTextArea();
    }
  }

  focusOnTextArea() {
    if (this.postTextArea) {
      this.postTextArea.nativeElement.focus();
    }
  }

  onBlur() {
    if (this.feedPostForm.untouched) {
      this.focused = false;
    }
  }

  public onKeyDown = ($event) => {
    if ($event.ctrlKey && $event.keyCode === 13) {
      if (this.submitOnCtrlEnter) {
        this.onFormSubmit();
      }
    };
  }

  onFormSubmit() {
    if (this.loading) {
      return;
    }

    for (const i in this.feedPostForm.controls) {
      this.feedPostForm.controls[i].markAsDirty();
      this.feedPostForm.controls[i].updateValueAndValidity();
    }


    if (this.feedPostForm.valid) {
      // create new service
      const text = this.feedPostForm.get('text').value;
      const images = this.feedPostForm.get('images').value;
      const tags = this.feedPostForm.get('tags').value;

      if (!text && images.length < 1) {
        this.nzMessageService.error(this.i18n({ value: "Enter text or add images", id: "errorNoImagesAndNoTextOnFeedPost" }));
        return;
      }

      if ((text && text.length > 0) || (images && images.length > 0)) {
        this.post(text, images, tags);
      }
    } else {
      let errors = this.feedPostForm.get('text').errors;
      let pre = 'text';
      if (!errors) {
        this.feedPostForm.get('images').errors;
        pre = 'images';
      }

      for (let err in errors) {
        this.nzMessageService.error(`${pre} : ${err}`);
      }
    }
  }

  private post(msg: string, images: Array<UploadFile> = [], tags: Array<string>) {
    this.loading = true;

    const fp = new FeedPostApiRequest(
      msg,
      images,
      tags
    );

    this.onNewPostRequest.emit(fp);
    this.resetForm();
    if (this.edit) {
      // edit
      if (!this.editFeedPost) {
        this.nzMessageService.error('No editfeedpost provided');
        return;
      }
      this.feedService.update(this.editFeedPost, fp)
        .subscribe(
          (event: HttpEvent<{}>) => this.handleHttpEvent(event),
          err => this.onError(err));
    } else {
      // create
      this.feedService.create(fp)
        .subscribe(
          (event: HttpEvent<{}>) => this.handleHttpEvent(event),
          err => this.onError(err));
    }

  }

  private onError(err) {
    this.loading = false;
    // TODO: handle errors
    console.log(err);
  }

  handleHttpEvent(event: HttpEvent<{}>) {
    if (event.type === HttpEventType.UploadProgress) {
      if (event.total! > 0) {
        // this.percent = (event.loaded / event.total!) * 100;
      }
    } else if (event instanceof HttpResponse) {
      // uploaded
      console.log('done')
      this.loading = false;
      this.onNewPostDelivered.emit(event.body as FeedPost);
    }
  }

  onImagesChange(images: Array<UploadFile>) {
    this.feedPostForm.patchValue({
      images: images
    });
    if (images.length < 1) {
      this.setShowUploadImagesForm(false);
    }
  }

  setShowUploadImagesForm(v: boolean) {
    this.showUploadImagesForm = v;
    if (!this.showUploadImagesForm) {
      this.clearImagesEvent.next();
      this.feedPostForm.patchValue({
        images: []
      })
    }
  }


  onTagsChange(tags: Array<string>) {
    this.feedPostForm.patchValue({
      tags: tags
    })
  }

  clearImagesEvent: Subject<void> = new Subject<void>();

  resetForm() {
    // TODO: rm stupid clear images event,
    this.clearImagesEvent.next();
    // clear forms
    this.feedPostForm.reset();
    this.tagsSelector.reset();
    this.setShowUploadImagesForm(false);
  }

  dirtyOrHasErrors(label: string) {
    return this.feedPostForm.get(label).dirty && this.feedPostForm.get(label).errors
  }

  getFieldValidateStatus(field: string): string {
    if (this.dirtyOrHasErrors(field)) {
      return 'error';
    } else {
      return this.feedPostForm.get(field).valid ? 'success' : '';
    }
  }
}

