import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Service } from 'src/app/shared/models/Service.model';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Location } from 'src/app/shared/models/Location.model';
import { JsonLabelValueEditorComponent } from './json-label-value-editor/json-label-value-editor.component';
import { UploadFile } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { ServiceApiRequest } from 'src/app/shared/models/api-request/service-api-request.model';
import { TargetDeviceService } from 'src/app/shared/services/target-device.service';



function validateImages(images: Array<UploadFile>) {
  return of(true);
}


@Component({
  selector: 'app-new-service-form',
  templateUrl: './new-service-form.component.html',
  styleUrls: ['./new-service-form.component.scss']
})
export class NewServiceFormComponent implements OnInit {

  maxImagesLength = 10;

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
    // string
    contact_email: [null, [Validators.email]],
  });


  constructor(
    private fb: FormBuilder,
    public tds: TargetDeviceService,
    private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(u => {
      if (u) {
        this.serviceForm.patchValue({
          contact_phone: u.phone,
          contact_email: u.email
        });
      }
    });
  }

  onLocationChange(location: Location) {
    this.serviceForm.patchValue({
      location: location.url
    });
  }

  onCategoryChange(categoryName: string) {
    this.serviceForm.patchValue({
      category: categoryName
    })
  }

  onTagsChange(tags: Array<string>) {
    this.serviceForm.patchValue({
      tags: tags
    })
  }

  onImagesChange(images: Array<UploadFile>) {
    this.serviceForm.patchValue({
      images: images
    })
  }

  onFormSubmit(jsonEditor: JsonLabelValueEditorComponent = null) {
    for (const i in this.serviceForm.controls) {
      this.serviceForm.controls[i].markAsDirty();
      this.serviceForm.controls[i].updateValueAndValidity();
    }

    const isJsonValid = jsonEditor ? jsonEditor.validate() : true;
    if (this.serviceForm.valid && isJsonValid) {
      // create new service
      this.onSubmit.emit(this.serviceForm.value);
    } else {
      this.scrollToError();
    }

  }

  private scrollToError() {
    const firstElementWithError = document.querySelector('.ng-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth' });
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
