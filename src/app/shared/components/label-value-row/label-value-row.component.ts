import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-value-row',
  templateUrl: './label-value-row.component.html',
  styleUrls: ['./label-value-row.component.scss']
})
export class LabelValueRowComponent implements OnInit {

  @Input() label: string;
  @Input() value: string | number;
  @Input() routerlink: string = null;

  constructor() { }

  ngOnInit() {
  }

}
