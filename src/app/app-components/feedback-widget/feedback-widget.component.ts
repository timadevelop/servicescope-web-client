import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { Feedback } from 'src/app/core/models/Feedback.model';

@Component({
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.scss']
})
export class FeedbackWidgetComponent implements OnInit {

  showFeedbackForm: boolean = false;
  alreadySentFeedback: Feedback = null;
  loading: boolean = false;

  feedbackForm = this.fb.group({
    // number
    rate: [2.5, [Validators.required]],
    // string
    text: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(900)]]
  });


  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private feedbackService: FeedbackService
  ) { }

  differenceInDays(firstDate, secondDate) {
    return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
  }

  ngOnInit() {
    this.loadLastFeedback();
  }

  loadLastFeedback() {
    this.alreadySentFeedback = null;

    const lastFeedback = this.feedbackService.getLastFeedback();

    if (lastFeedback) {
      const dt = Date.parse(lastFeedback.created_at);
      const diff = this.differenceInDays(dt, Date.now());
      if (diff < 5) {
        this.alreadySentFeedback = lastFeedback;
        this.feedbackForm.patchValue({
          rate: this.alreadySentFeedback.rate,
          text: this.alreadySentFeedback.text
        });
      }
    }

  }

  onFormSubmit() {
    this.loading = true;
    for (const i in this.feedbackForm.controls) {
      this.feedbackForm.controls[i].markAsDirty();
      this.feedbackForm.controls[i].updateValueAndValidity();
    }

    if (this.feedbackForm.valid) {
      // send feedback
      this.feedbackService.create(this.feedbackForm.value)
        .subscribe((feedback: Feedback) => {
          this.feedbackService.storeInLocalStorage(feedback);
          this.loadLastFeedback();
          this.loading = false;
        })
    } else {
      this.loading = false;
    }

  }

  dirtyOrHasErrors(label: string) {
    return this.feedbackForm.get(label).dirty && this.feedbackForm.get(label).errors
  }
}
