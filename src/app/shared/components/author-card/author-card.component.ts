import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {

  @Input() author: User;

  constructor() { }

  ngOnInit() {
  }

}
