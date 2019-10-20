import { Component, OnInit, Output, EventEmitter, Input, PLATFORM_ID, Inject } from '@angular/core';
import { Seek } from 'src/app/core/models/Seek.model';
import { FormBuilder, Validators } from '@angular/forms';

import { SeekApiRequest } from 'src/app/core/models/api-request/seek-api-request.model';

import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-new-seek-form',
  templateUrl: './new-seek-form.component.html',
  styleUrls: ['./new-seek-form.component.scss']
})
export class NewSeekFormComponent implements OnInit {

  maxImagesLength = 10;

  @Input() edit: boolean = false;
  @Input() seek: Seek;
  @Output() onSubmit = new EventEmitter<SeekApiRequest>();

  seekForm = this.fb.group({
    // string
    title: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(70)]], // todo
    // string
    description: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(900)]],
    // number
    max_price: [0, [Validators.required, Validators.min(0)]],
    // hidden for now
    max_price_currency: ['BGN'], // hidden?
    // hide.
    // color: [null],
    // location url
    location: [null, Validators.required],
    // image_1: File, image_2: File, ...
    images: [[], [Validators.minLength(0), Validators.maxLength(this.maxImagesLength)]],
    // [string]
    tags: [[], [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
    // string
    category: [null, Validators.required],
    // string
    contact_phone: [null, [Validators.required, Validators.min(7), Validators.maxLength(30)]],
  });


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    public tds: TargetDeviceService,
    private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(u => {
      if (u && !this.seekForm.controls['contact_phone'].value) {
        this.seekForm.patchValue({
          contact_phone: u.phone
        });
      }
    });

    if (this.edit && this.seek) {
      this.seekForm.patchValue({
        title: this.seek.title,
        description: this.seek.description,
        max_price: this.seek.max_price,
        location: this.seek.location,
        images: this.seek.images.map((v, index, arr) => {
          return {
            uid: index,
            name: `image_${index}`,
            status: 'done',
            url: v.image
          }
        }),
        tags: this.seek.tags.map(v => v.name),
        category: this.seek.category,
        contact_phone: this.seek.contact_phone
      });
    }
  }


  onFormSubmit() {
    for (const i in this.seekForm.controls) {
      this.seekForm.controls[i].markAsDirty();
      this.seekForm.controls[i].updateValueAndValidity();
    }

    if (this.seekForm.valid) {
      // create new seek
      // location -> locationUrl
      this.onSubmit.emit({ ...this.seekForm.value, location: this.seekForm.controls['location'].value.url });
    } else {
      this.scrollToError();
    }

  }

  private scrollToError() {
    if (isPlatformBrowser(this.platformId)) {
      const firstElementWithError = document ? document.querySelector('.ng-invalid') : null;
      if (firstElementWithError) {
        firstElementWithError.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  onPriceDetailChange(r) {
    this.seekForm.patchValue({
      price_details: r
    })
  }

  dirtyOrHasErrors(label: string) {
    return this.seekForm.get(label).dirty && this.seekForm.get(label).errors
  }

  getFieldValidateStatus(field: string): string {
    if (this.dirtyOrHasErrors(field)) {
      return 'error';
    } else {
      return this.seekForm.get(field).valid ? 'success' : '';
    }
  }
}
