import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-global-templates',
  templateUrl: './global-templates.component.html',
  styleUrls: ['./global-templates.component.scss']
})
export class GlobalTemplatesComponent implements OnInit {
  @ViewChild('nzIndicatorTpl', { static: true })
  nzIndicator!: TemplateRef<void>;

  constructor() { }

  ngOnInit() {
  }

}
