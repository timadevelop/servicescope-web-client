import { Component, OnInit, Output, EventEmitter, Input, PLATFORM_ID, Inject } from '@angular/core';
import { Service } from 'src/app/core/models/Service.model';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from 'src/app/core/models/Location.model';
import { JsonLabelValueEditorComponent } from './json-label-value-editor/json-label-value-editor.component';
import { UploadFile } from 'ng-zorro-antd';
import { ServiceApiRequest } from 'src/app/core/models/api-request/service-api-request.model';
import { TargetDeviceService } from 'src/app/core/services/target-device.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-new-service-form',
  templateUrl: './new-service-form.component.html',
  styleUrls: ['./new-service-form.component.scss']
})
export class NewServiceFormComponent implements OnInit {

  maxImagesLength = 10;

  @Input() edit: boolean = false;
  @Input() service: Service;
  @Output() onSubmit = new EventEmitter<ServiceApiRequest>();

  serviceForm = this.fb.group({
    // string
    title: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(70)]], // todo
    // string
    description: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(900)]],
    // number
    price: [0, [Validators.required, Validators.min(0)]],
    // hidden for now
    price_currency: ['BGN'], // hidden?
    // hide.
    // color: [null],
    // location url
    location: [null, Validators.required],
    // image_1: File, image_2: File, ...
    images: [[], [Validators.required, Validators.minLength(1), Validators.maxLength(this.maxImagesLength)]],
    // [string]
    tags: [[], [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
    // string
    category: [null, Validators.required],
    // JSON [{label, value}]
    price_details: [null],
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
      if (u && !this.serviceForm.controls['contact_phone'].value) {
        this.serviceForm.patchValue({
          contact_phone: u.phone
        });
      }
    });

    if (this.edit && this.service) {
      this.serviceForm.patchValue({
        title: this.service.title,
        description: this.service.description,
        price: this.service.price,
        location: this.service.location,
        images: this.service.images.map((v, index, arr) => {
          return {
            uid: index,
            name: `image_${index}`,
            status: 'done',
            url: v.image
          }
        }),
        tags: this.service.tags.map(v => v.name),
        category: this.service.category,
        price_details: this.service.price_details,
        contact_phone: this.service.contact_phone
      });
    }
  }


  onFormSubmit(jsonEditor: JsonLabelValueEditorComponent = null) {
    for (const i in this.serviceForm.controls) {
      this.serviceForm.controls[i].markAsDirty();
      this.serviceForm.controls[i].updateValueAndValidity();
    }

    const isJsonValid = jsonEditor ? jsonEditor.validate() : true;
    if (this.serviceForm.valid && isJsonValid) {
      // create new service
      // location -> locationUrl
      this.onSubmit.emit({ ...this.serviceForm.value, location: this.serviceForm.controls['location'].value.url });
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
    this.serviceForm.patchValue({
      price_details: r
    })
  }

  dirtyOrHasErrors(label: string) {
    return this.serviceForm.get(label).dirty && this.serviceForm.get(label).errors
  }

  getFieldValidateStatus(field: string): string {
    if (this.dirtyOrHasErrors(field)) {
      return 'error';
    } else {
      return this.serviceForm.get(field).valid ? 'success' : '';
    }
  }
}
