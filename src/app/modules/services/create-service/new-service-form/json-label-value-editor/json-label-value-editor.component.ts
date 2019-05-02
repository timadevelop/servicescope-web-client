import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

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

  // group = this.fb.group({
  //   items: this.fb.array([this.createItem()])
  // });

  items: FormArray = this.fb.array([]);

  constructor(
    private fb: FormBuilder,
    private msgService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.addField();
    this.items.valueChanges.subscribe(val => {
      this.onChange.emit(val);
    })
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    // if (!this.items.valid) {
    //   this.msgService.warning('Before adding new item');
    //   console.log(this.items.errors);
    //   return;
    // } else {
      // this.items = this.group.get('items') as FormArray;
      this.items.push(this.createItem());
    // }
  }


  dirtyOrHasErrors(f: AbstractControl, label: string) {
    const r = f.get(label).dirty && f.get(label).errors
    return r;
  }

  createItem(): FormGroup {
    return this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      value: ['', [Validators.required, Validators.min(0)]]
    });
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();

  }

  submitForm(): void {

    console.log(this.items.value);
  }
}
