import { Component, Inject} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import emailParser, {EmailParseResult} from './emailParser'

@Component({
  selector: 'email-form',
  styles: [`
  .btn-primary {width: 100%;} 
  hr {margin: 30px 0;}
  .form-group {margin-bottom: 30px;}
    label { font-size: 160%;}
  `],
  template: `
 <form method="POST" action="javascript: void(0)" >
 <fieldset [disabled]='submitting'>

  <div class="alert alert-success" role="alert" [hidden]="!(flashMessage)">
        <p>{{flashMessage}}</p>
  </div>

  <div class="alert alert-danger" role="alert" [hidden]="!(errors && errors.length > 0)">
    <ul class='list'>
      <li *ngFor="let e of errors">
        {{e.message}}
      </li>
      </ul>
  </div>

  <div class="form-group">
    <label for="email-form-from">From</label>
    <input required type="text" class="form-control" id="email-form-from" [(ngModel)]="from" name="from" placeholder="your email address" required validateEmail >
  </div>

  <div class="form-group">
    <label for="email-form-to">To</label>
    <email-list-field required (modelChange)="this.to = $event"></email-list-field>
    <div class='pull-right' [hidden]="showCc && showBcc">
      add <a (click)="showCcClick()" [hidden]="showCc"> <strong>cc</strong></a> <span [hidden]="showCc">,</span> <a (click)="showBccClick()" [hidden]="showBcc"><strong>bcc</strong></a>
    </div>
  </div>

  <div class="form-group" [hidden]="!showCc">
    <label for="email-form-cc" >CC</label>
    <email-list-field (modelChange)="this.cc = $event"  ></email-list-field>
  </div>

  <div class="form-group" [hidden]="!showBcc">
    <label for="email-form-bcc"  >BCC</label>
    <email-list-field (modelChange)="this.bcc = $event" ></email-list-field>
  </div>

  <div class="form-group">
    <label for="email-form-subject">Subject</label>
    <input required type="text" class="form-control" id="email-form-subject" [(ngModel)]="subject" name="subject" placeholder="suject for your message">
  </div>

  <div class="form-group">
    <label for="email-form-body">Message</label>
      <textarea required cols="80" rows="10" [(ngModel)]="message" name="message"  class="form-control" id="email-form-body" placeholder="enter your message"></textarea>
  </div>

  <div class='text-right'>
    <button type="button" (click)="onSubmit()" class="btn btn-primary btn-lg" >Send</button>
  </div>
  </fieldset>
</form>
  `,
})
export default class {
  showBcc = false;
  showCc = false;
  to: Array<string> = [];
  cc: Array<string> = [];
  bcc: Array<string> = [];
  subject = '';
  message = '';
  from: string;
  errors: Array<any>;
  submitting: boolean = false;
  flashMessage: string

  constructor( @Inject(Window) private window: Window, private http: Http) { }

  showCcClick() {
    this.showCc = true;
  }

  showBccClick() {
    this.showBcc = true;
  }

  get model() {
    return {
      from: emailParser(this.from),
      to: this.to,
      cc: this.cc,
      bcc: this.bcc,
      subject: this.subject,
      body: this.message
    }
  }

  flash(message) {
    this.flashMessage = message;
    setTimeout((function () {
      this.flashMessage = null;
    }).bind(this), 3000);
  }

  onSubmit() {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = this.model;
    this.submitting = true;
    this.errors = [];

    this.http.post('/api/email', body, headers)
      .subscribe(r => {
        this.submitting = false;
        this.flash('Success!  your message has been sent')
        this.window.scrollTo(0, 0);
      }, e => {
        this.submitting = false;
        if (e.status === 400) {
          this.errors = e.json().errors;
        }
        else {
          this.errors = [{ message: `Sorry, an server error has occured (status: ${e.status})` }]
        }

        this.window.scrollTo(0, 0);
      })

  }

}