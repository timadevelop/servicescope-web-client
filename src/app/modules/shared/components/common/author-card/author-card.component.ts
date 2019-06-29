import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { AdditionalConversationRouteData } from 'src/app/modules/messages/redirect.guard';
import { User } from 'src/app/core/models/User.model';
import { Location } from 'src/app/core/models/Location.model';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {
  @Input() itemTitle: string;
  @Input() author: User;
  @Input() location: Location;
  @Input() override_phone: string = null;
  @Input() horizontal = false;

  additionalRouteData: AdditionalConversationRouteData;

  constructor(
    public userService: UserService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.additionalRouteData = {
      itemUrl: location.href,
      itemTitle: this.itemTitle
    }
  }

  transformDateString(date: string): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
