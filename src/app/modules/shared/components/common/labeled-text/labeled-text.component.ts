import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'labeled-text',
  templateUrl: './labeled-text.component.html',
  styleUrls: ['./labeled-text.component.scss']
})
export class LabeledTextComponent implements OnInit {

  @Input() editable: boolean;
  @Input() label: string;
  @Input() text: string;
  @Output() onChange = new EventEmitter<string>();
  newText: string;

  @Input() edit: boolean = false;
  loading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public setLoading(v) {
    this.loading = v;
  }

  public setEdit(v) {
    this.edit = v;
  }

  setNewText(t) {
    this.newText = t;
  }
  changeText() {
    if (this.text != this.newText) {
      this.onChange.emit(this.newText);
    }
  }
}
