import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { I18n } from '@ngx-translate/i18n-polyfill';

export class LabelValueRow {
  label: string;
  value: string | number; // TODO
}

@Component({
  selector: 'app-json-label-value-editor',
  templateUrl: './json-label-value-editor.component.html',
  styleUrls: ['./json-label-value-editor.component.scss']
})
export class JsonLabelValueEditorComponent implements OnInit {
  @Output() onChange = new EventEmitter<Array<LabelValueRow>>();
  items: FormArray = this.fb.array([]);
  maxItems: number = 8;

  constructor(
    private fb: FormBuilder,
    private msgService: NzMessageService,
    private i18n: I18n
  ) { }

  ngOnInit(): void {
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    // if (!this.items.valid) {
    //   this.msgService.warning(this.i18n("First enter valid fixed prices"));
    //   // console.log(this.items.errors);
    //   return;
    // } else
     if (this.items.length >= this.maxItems) {
      this.msgService.warning(this.i18n("Only") + ` ${this.maxItems} ` + this.i18n("items allowed"));
      return;
    } else {
      this.items.push(this.createItem());
    }
  }

  deleteItem(i: number) {
    this.items.removeAt(i);
  }


  dirtyOrHasErrors(f: AbstractControl, label: string) {
    const r = f.get(label).dirty && f.get(label).errors;
    return r;
  }

  createItem(): FormGroup {
    return this.fb.group({
      label: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      value: [null, [Validators.required, Validators.min(0)]]
    });
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
  }

  validate(): boolean {;
    for (const i in this.items.controls) {
      this.items.controls[i].markAsDirty();
      this.items.controls[i].updateValueAndValidity();
    }

    const isValid = this.items.valid || this.items.untouched;

    if (isValid) {
      this.onChange.emit(this.items.value.filter(i => i.value !== null && i.label !== null));
    } else {
      this.msgService.warning(this.i18n({value: 'Invalid fixed prices information', id: 'invalidFixedPricesFormError'}));;
    }

    return isValid;
  }
}
