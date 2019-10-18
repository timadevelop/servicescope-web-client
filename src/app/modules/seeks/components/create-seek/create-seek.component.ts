import { Component, OnInit } from '@angular/core';
import { Seek } from 'src/app/core/models/Seek.model';
import { NzMessageService } from 'ng-zorro-antd';
import { SeekApiRequest } from 'src/app/core/models/api-request/seek-api-request.model';
import { SeeksService } from 'src/app/modules/seeks/services/seeks.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Title } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-create-seek',
  templateUrl: './create-seek.component.html',
  styleUrls: ['./create-seek.component.scss']
})
export class CreateSeekComponent implements OnInit {
  loading = false;
  percent: number = null;

  creatingItemProgressText: string;
  constructor(
    private seeksService: SeeksService,
    private msgSeek: NzMessageService,
    private router: Router,
    public i18n: I18n,
    private titleSeek: Title,
    private seo: SeoService
  ) {
    this.creatingItemProgressText = this.i18n({ value: 'Creating', id: 'creatingItemProgressText' });
    this.titleSeek.setTitle(this.i18n({ value: 'Create Seek', id: "createSeekHtmlTitle" }));
    this.seo.generateTags({
      title: this.i18n({ value: 'Create Seek', id: "createSeekText" }),
      description: this.i18n({ value: 'Create new Seek' })
    });
  }

  ngOnInit() {
  }

  createNewSeek(seek: SeekApiRequest) {
    this.loading = true;
    this.seeksService.create(seek)
      .subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              this.percent = (event.loaded / event.total!) * 100;
            }
          } else if (event instanceof HttpResponse) {
            // uploaded
            this.loading = false;
            const newSeek = event.body;
            const id = newSeek['id'];
            this.msgSeek.success(
              this.i18n(
                {
                  value: "Successfully created seek #",
                  id: 'newSeekCreatedMessageText'
                }) + `${id}`);
            this.router.navigate(['/seeks', id]);
          }
        },
        err => {
          // fail
          // console.log(err);
          this.msgSeek.error(
            this.i18n(
              {
                value: "Error creating seek",
                id: "newSeekCreatingErrorText",
                description: "Message notifies user about an error while creating new seek"
              }));
        });

  }
}
