import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TargetDeviceService } from 'src/app/shared/services/target-device.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public tds: TargetDeviceService,
    public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

}
