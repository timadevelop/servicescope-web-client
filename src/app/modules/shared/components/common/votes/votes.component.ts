import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Vote, VoteTypes } from 'src/app/core/models/Vote.model';
import { VoteService } from 'src/app/core/services/vote.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  @Input() score: number;
  @Input() currentUserVote: Vote;
  @Input() model: 'service' | 'post';
  @Input() modelId: number;

  @Input() type: 'horizontal' | 'vertical' = 'horizontal';

  loginToContinueStr = 'Login to continue';
  vertifyEmailToContinueStr = 'Verify your email to be able to vote';
  isUpvoted: boolean = false;
  isDownvoted: boolean = false;

  constructor(
    private userService: UserService,
    private voteService: VoteService,
    private msgService: NzMessageService
  ) { }

  ngOnInit() {
    this.init()
  }

  init() {
    if (this.score === null) {
      console.warn('Score is not defined');
    }
    if (this.currentUserVote) {
      switch (this.currentUserVote.activity_type) {
        case VoteTypes.UPVOTE:
          this.isUpvoted = true;
          break;
        case VoteTypes.DOWNVOTE:
          this.isDownvoted = true;
          break;
        default:
          console.warn('Strange behavior: vote type is unknown');
          break;
      }
    } else {
      this.isDownvoted = false;
      this.isUpvoted = false;
    }
  }

  private changeScore(vote: Vote, old: boolean = false) {
    if (vote.activity_type == VoteTypes.UPVOTE) {
      this.score += old ? -1 : 1;
    } else if (vote.activity_type == VoteTypes.DOWNVOTE) {
      this.score -= old ? -1 : 1;
    } else {
      console.warn("Strange behavior: vote type is unknown")
    }
  }
  private voted(newVote: Vote = null) {
    if (newVote) {
      this.changeScore(newVote);
    } else {
      this.changeScore(this.currentUserVote, true)
    }
    this.currentUserVote = newVote;
    this.init();
  }

  private cancelVote() {
    this.voteService.cancelvote(this.currentUserVote)
      .subscribe(_ => {
        this.voted(null);
      });
  }

  private guard(): boolean {
    if (!this.userService.currentUser) {
      this.msgService.error(this.loginToContinueStr);
      return false;
    }

    if (!this.userService.currentUser.is_verified_email) {
      this.msgService.error(this.vertifyEmailToContinueStr);
      return false;
    }
    return true;
  }

  upvote() {
    if (!this.guard()) {
      return;
    }
    if (this.isUpvoted) {
      this.cancelVote();
      return;
    } else if (this.isDownvoted) {
      return;
    }

    this.voteService.upvote(this.model, this.modelId)
      .subscribe((vote: Vote) => {
        this.voted(vote);
      });
  }

  downvote() {
    if (!this.guard()) {
      return;
    }
    if (this.isDownvoted) {
      this.cancelVote();
      return;
    } else if (this.isUpvoted) {
      return;
    }
    this.voteService.downvote(this.model, this.modelId)
      .subscribe((vote: Vote) => {
        this.voted(vote);
      });
  }

}
