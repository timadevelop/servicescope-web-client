import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { NzMessageService } from 'ng-zorro-antd';
import { PaymentsService } from 'src/app/core/services/payments.service';
import { paymentIntents } from 'stripe';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.scss']
})
export class PayFormComponent implements OnInit {

  private stripe;
  _amount: number;
  _currency: string;

  @Input() amount: number;
  @Input() currency: string;
  @Input() metadata: object;
  @Output() onSucceededPayment = new EventEmitter<paymentIntents.IPaymentIntent>();
  @ViewChild('cardElement') cardElement: ElementRef;

  card: any;
  cardErrors: any;
  errorString: string = null;

  loading = false;

  paymentIntent: paymentIntents.IPaymentIntent;

  constructor(
    private i18n: I18n,
    private nzMsgService: NzMessageService,
    private paymentsService: PaymentsService,
    private configService: ConfigService
  ) {
    this.configService.currentConfig().subscribe(c => {
      this.stripe = Stripe(c.STRIPE_PUBLIC_KEY)
    });
  }

  ngOnInit() { }

  createOrUpdatePaymentIntent() {
    this.loading = true;
    if (this.paymentIntent) {
      this.paymentsService.updatePaymentIntent(this.paymentIntent.id, this._amount, this._currency, this.metadata)
        .subscribe((pi: paymentIntents.IPaymentIntent) => {
          this.paymentIntent = pi;
          this.loading = false;
        });
    } else {
      this.paymentsService.createPaymentIntent(this._amount, this._currency, this.metadata)
        .subscribe((pi: paymentIntents.IPaymentIntent) => {
          this.paymentIntent = pi;
          this.createStripeElementsForm();
          this.loading = false;
        });
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    const amount: SimpleChange = changes.amount;
    const currency: SimpleChange = changes.currency;
    if (amount && currency && amount.currentValue != null &&
      (this._amount != amount.currentValue || this._currency != currency.currentValue)) {
      this._amount = amount.currentValue;
      this._currency = currency.currentValue;
      this.createOrUpdatePaymentIntent();
    }
  }

  createStripeElementsForm() {
    let elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
      if (error) {
        this.handleError(error);
      } else {
        this.clearErrors();
      }
    });
  }

  async handleForm(e) {
    this.loading = true;
    e.preventDefault();

    const { source, error } = await this.stripe.createSource(this.card);

    if (error) {
      this.handleError(error);
      this.loading = false;
    } else {
      this.clearErrors();
      // pay
      this.handleCardPayment();
    }
  }

  processSucceededPayment(paymentIntent: paymentIntents.IPaymentIntent) {
    this.paymentIntent = paymentIntent;
    if (this.paymentIntent.status == 'succeeded') {
      this.onSucceededPayment.emit(this.paymentIntent);
    }
  }
  // pay
  private handleCardPayment() {
    if (!this.paymentIntent || !this.paymentIntent.client_secret) {
      console.warn('No client secret provided for current for PaymentIntent');
      this.nzMsgService.error(this.i18n('Wrong paymentIntent id. Contact administrator.'));
      this.loading = false;
      return;
    };

    this.loading = true;
    const that = this;
    this.stripe.handleCardPayment(
      this.paymentIntent.client_secret, this.card, {
        payment_method_data: {
          billing_details: {
            // TODO: SCA user data?
            // name: .value
          }
        }
      }
    ).then((result: { paymentIntent: paymentIntents.IPaymentIntent, error: any }) => {
      if (result.error) {
        // Display error.message in your UI.
        that.nzMsgService.error('Error');
        console.log(result.error);
        that.loading = false;
      } else {
        // The payment has succeeded. Display a success message.
        that.processSucceededPayment(result.paymentIntent);
        that.loading = false;
      }
    });
  }

  // handle stripe errors and translate them
  handleError(error: { code: string }) {
    // console.log('error: ', error);
    // TODO: handle and translate other stripe errors.
    switch (error.code) {
      case 'incomplete_number':
        this.errorString = this.i18n({ value: "Your card number is incomplete.", id: 'incompleteCardNumberErrorText' });
        break;
      case 'invalid_number':
        this.errorString = this.i18n({ value: "Your card number is invalid.", id: 'invalidCardNumberErrorText' });
        break;
      case 'incomplete_expiry':
        this.errorString = this.i18n({ value: "Your card's expiration date is incomplete.", id: 'incompleteCardExpiryErrorText' });
        break;
      case 'invalid_expiry_year_past':
        this.errorString = this.i18n({ value: "Your card's expiration year is in the past.", id: 'invalidCardExpiryYearPastErrorText' });
        break;
      case 'invalid_expiry_year':
        this.errorString = this.i18n({ value: "Your card's expiration year is invalid.", id: 'invalidCardExpiryYearErrorText' });
        break;
      case 'invalid_expiry':
        this.errorString = this.i18n({ value: "Your card's expiration is invalid.", id: 'invalidCardExpiryErrorText' });
        break;
      case 'incomplete_cvc':
        this.errorString = this.i18n({ value: "Your card's security code is incomplete.", id: 'incompleteCardCVCErrorText' });
        break;
      case 'incomplete_zip':
        this.errorString = this.i18n({ value: "Your postal code is incomplete.", id: 'incompleteCardZipErrorText' });
        break;
      default:
        this.errorString = this.i18n({ value: "Unknown error. Contact administrator", id: 'unknownErrorText' });
        break;
    }

    this.nzMsgService.error(this.errorString);
  }

  clearErrors() {
    this.errorString = null;
  }
}
