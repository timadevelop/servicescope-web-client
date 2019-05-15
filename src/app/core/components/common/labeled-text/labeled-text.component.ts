import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'labeled-text',
  templateUrl: './labeled-text.component.html',
  styleUrls: ['./labeled-text.component.scss']
})
export class LabeledTextComponent implements OnInit {

  @Input() label: string;
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
