import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { Conversation } from 'src/app/core/models/Conversation.model';
import { MessagesService } from '../../services/messages.service';
import { MessageApiRequest } from 'src/app/core/models/api-request/message-api-request.model';
import { HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-new-message-form',
  templateUrl: './new-message-form.component.html',
  styleUrls: ['./new-message-form.component.scss']
})
export class NewMessageFormComponent implements OnInit {

  @Input() conversation: Conversation;
  @Output() onNewMessageRequest = new EventEmitter<MessageApiRequest>();
  @Output() onNewMessageDelivered = new EventEmitter<Message>();
  showUploadImagesForm: boolean = false;
  maxImagesLength = 10;
  showSendTooltip = false;

  messageForm = this.fb.group({
    // string
    text: [null, [Validators.minLength(1), Validators.maxLength(1000)]],
    images: [[], [Validators.minLength(0), Validators.maxLength(this.maxImagesLength + 1)]],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private i18n: I18n,
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private nzMessageService: NzMessageService,
  ) { }


  private generateDefaultMessageFor(url: string, title: string): string {
    return this.i18n(`Hey, I am interested in this: `) +  ` - ${title} - ${url}`;
  }

  ngOnInit() {
    // item
    this.route.queryParamMap.subscribe(params => {
      const title = params.get('itemTitle');
      const url = params.get('itemUrl');
      if (url) {
        this.messageForm.patchValue({
          text: this.generateDefaultMessageFor(url, title)
        });
        // TODO: Ask
        setTimeout(() => this.showSendTooltip = true, 50);
      }
    });
  }

  setShowSendTooltip(v: boolean) {
    this.showSendTooltip = v;
    if (!v) {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {
            itemUrl: null,
            itemTitle: null
          },
          queryParamsHandling: "merge"
        });
    }
  }

  sendDefaultMsg() {
    this.onFormSubmit();
    this.setShowSendTooltip(false);
  }

  onFormSubmit() {
    for (const i in this.messageForm.controls) {
      this.messageForm.controls[i].markAsDirty();
      this.messageForm.controls[i].updateValueAndValidity();
    }


    if (this.messageForm.valid) {
      // create new service
      const text = this.messageForm.get('text').value;
      const images = this.messageForm.get('images').value;
      if ((text && text.length > 0) || (images && images.length > 0)) {
        this.sendMsg(text, images);
      }
    } else {
      let errors = this.messageForm.get('text').errors;
      let pre = 'text';
      if (!errors) {
        this.messageForm.get('images').errors;
        pre = 'images';
      }

      for (let err in errors) {
        this.nzMessageService.error(`${pre} : ${err}`);
      }
    }

  }

  sendMsg(msg: string, images: Array<UploadFile> = []) {
    const message = new MessageApiRequest(
      this.conversation.url,
      msg,
      images
    );

    this.onNewMessageRequest.emit(message);
    this.resetForm();
    this.messagesService.create(message)
      .subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              // this.percent = (event.loaded / event.total!) * 100;
            }
          } else if (event instanceof HttpResponse) {
            // uploaded
            this.onNewMessageDelivered.emit(event.body as Message);
          }
        },
        err => {
          // TODO: handle errors
          console.log(err);
        });
  }

  setShowUploadImagesForm(v: boolean) {
    this.showUploadImagesForm = v;
    if (!this.showUploadImagesForm) {
      this.clearImagesEvent.next();
      this.messageForm.patchValue({
        images: []
      })
    }
  }

  clearImagesEvent: Subject<void> = new Subject<void>();

  resetForm() {
    this.clearImagesEvent.next();
    this.messageForm.patchValue({
      text: "",
      images: []
    });
    this.setShowUploadImagesForm(false);
  }
}
