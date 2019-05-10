import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd';
import { Conversation } from 'src/app/shared/models/Conversation.model';
import { MessagesService } from '../../services/messages.service';
import { MessageApiRequest } from 'src/app/shared/models/api-request/message-api-request.model';
import { HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { Message } from 'src/app/shared/models/Message.model';

@Component({
  selector: 'app-new-message-form',
  templateUrl: './new-message-form.component.html',
  styleUrls: ['./new-message-form.component.scss']
})
export class NewMessageFormComponent implements OnInit {

  @Output() onNewMessage = new EventEmitter<Message>();
  @Input() conversation: Conversation;
  maxImagesLength = 10;


  messageForm = this.fb.group({
    // string
    text: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(400)]],
    images: [[], [Validators.minLength(0), Validators.maxLength(this.maxImagesLength)]],
  });

  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
  }


  onFormSubmit() {
    for (const i in this.messageForm.controls) {
      this.messageForm.controls[i].markAsDirty();
      this.messageForm.controls[i].updateValueAndValidity();
    }

    console.log('submit');

    if (this.messageForm.valid) {
      // create new service
      this.sendMsg(this.messageForm.get('text').value, this.messageForm.get('images').value);
    } else {

    }

  }

  sendMsg(msg: string, images: Array<UploadFile> = []) {
    // this.chatService.messages.next({ message: msg });
    console.log('send msg')

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
            console.log('sent', newMessage);
            this.onNewMessage.emit(newMessage);
            // todo: reset.
            this.messageForm.patchValue({
              text: "",
              images: []
            })
            // const id = newService['id'];
            // this.msgService.success(`Успешно направена обява #${id}`)
            // this.router.navigate(['/services', id]);
          }
        },
        err => {
          // fail
          console.log(err);
        });

  }
}
