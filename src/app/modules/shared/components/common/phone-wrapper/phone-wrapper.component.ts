import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-phone-wrapper',
  templateUrl: './phone-wrapper.component.html',
  styleUrls: ['./phone-wrapper.component.scss']
})
export class PhoneWrapperComponent implements OnInit {
  showPhone: boolean = false;
  phoneText: string = "show";

  @Input() phone: string;
  @Input() showIcon: boolean = true;

  constructor() { }

  ngOnInit() {
    this.phoneText = this.phone.substr(0, 4) + ' ' + this.phoneText;
  }

  showPhoneNumber(e) {
    if (!this.phone) {
      e.preventDefault();
    }
    else if (this.phone != this.phoneText) {
      e.preventDefault();
      this.phoneText = `${this.phone}`;
      this.showPhone = true;
    }
  }

}
