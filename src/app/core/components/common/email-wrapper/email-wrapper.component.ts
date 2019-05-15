import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email-wrapper',
  templateUrl: './email-wrapper.component.html',
  styleUrls: ['./email-wrapper.component.scss']
})
export class EmailWrapperComponent implements OnInit {

  @Input() email: string;
  constructor() { }

  ngOnInit() {
  }

  getUserEmailLink(): string {
    return `mailto:${this.email}`;
  }
}
