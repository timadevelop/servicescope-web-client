import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Service } from 'src/app/shared/models/Service.model';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Location } from 'src/app/shared/models/Location.model';

@Component({
  selector: 'app-new-service-form',
  templateUrl: './new-service-form.component.html',
  styleUrls: ['./new-service-form.component.scss']
})
export class NewServiceFormComponent implements OnInit {


  @Output() onSubmit = new EventEmitter<Service>();

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
    color: [null],
    // location url
    location: [null, Validators.required],
    // image_1: File, image_2: File, ...
    images: [[], Validators.required, Validators.minLength(1), Validators.maxLength(10)],
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
    private userService: UserService) {

  }

  ngOnInit() {
    this.serviceForm.patchValue({
      contact_phone: this.userService.currentUser.phone,
      contact_email: this.userService.currentUser.email
    })
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
    console.log(tags);
    this.serviceForm.patchValue({
      tags: tags
    })
  }

  onImagesChange(images: Array<any>) {
    console.log(images);
    this.serviceForm.patchValue({
      images: images
    })
  }

  onFormSubmit() {
    for (const i in this.serviceForm.controls) {
      this.serviceForm.controls[i].markAsDirty();
      this.serviceForm.controls[i].updateValueAndValidity();
    }

    console.log('sub', this.serviceForm.value);
    // this.onSubmit.emit(new Service());
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
