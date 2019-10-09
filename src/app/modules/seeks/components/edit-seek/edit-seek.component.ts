import { Component, OnInit } from '@angular/core';
import { SeeksService } from 'src/app/modules/seeks/services/seeks.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Title } from '@angular/platform-browser';
import { SeekApiRequest } from 'src/app/core/models/api-request/seek-api-request.model';
import { Seek } from 'src/app/core/models/Seek.model';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-edit-seek',
  templateUrl: './edit-seek.component.html',
  styleUrls: ['./edit-seek.component.scss']
})
export class EditSeekComponent implements OnInit {
  loading = false;
  percent: number = null;

  seek: Seek;
  creatingItemProgressText: string;
  constructor(
    private seeksService: SeeksService,
    private msgSeek: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    public i18n: I18n,
    private titleSeek: Title,
    private seo: SeoService
  ) {
    this.creatingItemProgressText = this.i18n({ value: 'Editing', id: 'editingItemProgressText' });
    this.titleSeek.setTitle(this.i18n({ value: 'Edit Seek', id: "editSeekHtmlTitle" }));
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { seek: Seek }) => {
        if (!data.seek) {
          console.warn('Not found seek');
          // this.router.navigate(['/404'])
          return;
        }
        this.seek = data.seek;
        this.seo.generateTags({
          title: this.i18n({ value: 'Edit', id: "editText" }) + ' ' + this.seek.title,
          description: this.seek.description,
          image: this.seek.images.length > 0 ? this.seek.images[0].image : null,
          keywords: this.seek.tags.map(t => t.name).join(',')
        });
      });

  }

  updateSeek(seekApiRequest: SeekApiRequest) {
    this.loading = true;
    this.seeksService.update(this.seek, seekApiRequest)
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
                  value: "Successfully updated seek #{{id}}",
                  id: 'seekUpdatedMessageText'
                }, { id: id }));
            this.router.navigate(['/seeks', id]);
          }
        },
        err => {
          // fail
          // console.log(err);
          this.msgSeek.error(
            this.i18n(
              {
                value: "Error updating seek",
                id: "seekUpdateErrorText",
                description: "Message notifies user about an error while updating seek"
              }));
        });

  }
}
