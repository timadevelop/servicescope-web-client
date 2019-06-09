import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { LabeledTextComponent } from 'src/app/core/components/common/labeled-text/labeled-text.component';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onUserChange(labeledText: LabeledTextComponent, t: any): void {
    if (this.userService.currentUser) {
      labeledText.setLoading(true);
      this.userService.patchCurrentUser(t)
        .subscribe(
          user => {
            this.userService.processNewUser(user);
            labeledText.setEdit(false);
            labeledText.setLoading(false);
          },
          error => {
            labeledText.setLoading(false);
          });
    }
  }

}
