import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/User.model';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {

  @Input() author: User;
  @Input() override_phone: string = null;
  @Input() override_email: string = null;

  constructor(
    public userService: UserService,
    private datePipe: DatePipe) { }

  ngOnInit() {
  }

  transformDateString(date: string): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
