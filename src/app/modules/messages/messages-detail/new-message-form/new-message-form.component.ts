import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { Conversation } from 'src/app/shared/models/Conversation.model';
import { MessagesService } from '../../services/messages.service';
import { MessageApiRequest } from 'src/app/shared/models/api-request/message-api-request.model';
import { HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { Message } from 'src/app/shared/models/Message.model';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-message-form',
  templateUrl: './new-message-form.component.html',
  styleUrls: ['./new-message-form.component.scss']
})
export class NewMessageFormComponent implements OnInit {

  @Output() onNewMessage = new EventEmitter<Message>();
  @Input() conversation: Conversation;
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
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit() {
    // item
    this.route.queryParamMap.subscribe(params => {
      const url = params.get('itemUrl');
      if (url) {
        this.messageForm.patchValue({
          text: `Hey, i'm writing about ${url}`
        });
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
            itemUrl: null
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

    this.messagesService.create(message)
      .subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              // this.percent = (event.loaded / event.total!) * 100;
            }
          } else if (event instanceof HttpResponse) {
            // uploaded
            // this.loading = false;
            const newMessage = event.body as Message;
            this.onNewMessage.emit(newMessage);
            // todo: reset.
            this.resetForm()
            // const id = newService['id'];
            // this.msgService.success(`Успешно направена обява #${id}`)
            // this.router.navigate(['/services', id]);
          }
        },
        err => {
          // fail
          // TODO: handle errors
          console.log(err);
        });
  }

  onImagesChange(images: Array<UploadFile>) {
    this.messageForm.patchValue({
      images: images
    });
    if (images.length < 1) {
      this.setShowUploadImagesForm(false);
    }
  }

  setShowUploadImagesForm(v: boolean) {
    this.showUploadImagesForm = v;
    if (!this.showUploadImagesForm) {
      this.messageForm.patchValue({
        images: []
      })
    }
  }

  clearEvent: Subject<void> = new Subject<void>();

  resetForm() {
    this.clearEvent.next();
    this.messageForm.patchValue({
      text: "",
      images: []
    });
    this.setShowUploadImagesForm(false);
  }
}
