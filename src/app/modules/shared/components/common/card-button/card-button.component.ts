import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent implements OnInit {

  @Input() type: 'primary' | 'default' = 'default';
  constructor() { }

  ngOnInit() {
  }

}
