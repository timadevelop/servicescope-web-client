import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-phone-wrapper',
  templateUrl: './phone-wrapper.component.html',
  styleUrls: ['./phone-wrapper.component.scss']
})
export class PhoneWrapperComponent implements OnInit {
  showPhone: boolean = false;
  phoneText: string = '';

  @Input() phone: string;
  @Input() showIcon: boolean = true;

  constructor() { }

  ngOnInit() {
    if (!this.phone) {
      this.phone = 'No phone';
      console.warn('no phone number provided to phone wrapper');
    }

    this.phoneText = this.phone.substr(0, 4);
  }

  showPhoneNumber(e) {
    if (!this.phone) {
      e.preventDefault();
    }
    else if (this.phone != this.phoneText) {
      e.preventDefault();
      this.phoneText = this.phone;
      this.showPhone = true;
    }
  }

}
