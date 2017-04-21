import { Component , Input, Output, EventEmitter} from '@angular/core';
import emailParser, {EmailParseResult} from './emailParser'

@Component({
  selector: 'email-list-field',
  styles: [`
  .alert { margin-bottom: 0;}
  .list, .list > li {
    list-style-type: none;
    margin: 0;
    padding: 0;
    
  }
   `],
  template: `
    <ul class='list'>
      <li *ngFor="let email of emails">
        <input type="text" [(ngModel)]="email.address" (keyup)="update()" (keyup.enter)="edit()" class='form-control' validateEmail #itemSpy="ngModel" >
         <div [hidden]="itemSpy.valid || itemSpy.pristine" class="alert alert-danger">
          Please enter a valid email
        </div>
        </li>
      <li>
      <input type="text" [(ngModel)]="draft" validateEmail (keyup)="update()" placeholder="enter a email address" (keyup.enter)="new($event)" (keyup.esc)="undo($event)" class='form-control' #draftSpy="ngModel" >
        <div [hidden]="draftSpy.valid || draftSpy.pristine" class="alert alert-danger">
          Please enter a valid email
        </div>
      </li>
    </ul>
   `,
})
export default class {
  emails: Array<any>;
  draft: string;

  constructor() {
    this.emails = [];
  }

  
  items:Array<string>;

  get model() : Array<EmailParseResult> {
    let result = this.emails
                     .filter(x=>x && x.address && x.address.length > 0)
                     .map(x => emailParser(x.address))
                    ;
    
    if(this.draft && this.draft.length > 0)
    {
      result = result.concat([ emailParser(this.draft)]);
    }
    return result;
  }

  @Output()
  modelChange:EventEmitter<Array<EmailParseResult>> = new EventEmitter();

  new($event : any) {
    this.emails.push({ address: this.draft });
    this.draft = '';
    this.modelChange.emit(this.model);
  }

  update(){
    this.modelChange.emit(this.model);
  }

  undo($event : any ) {
    $event.target.blur();

    if (this.draft && this.draft.length > 1) return;

    if (this.emails && this.emails.length > 0)
      this.draft = this.emails.pop().address;
      
       this.modelChange.emit(this.model);
  }
  edit() {
  }
}
