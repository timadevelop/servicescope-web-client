import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .subscribe(_ =>
        this.router.navigate(['/']));
  }

}
