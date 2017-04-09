import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import EmailForm from './email-form.component';
import EmailListField from './email-list-field.component';
import EmailValidator from './email-address-validator.directive';

@NgModule({
  declarations: [AppComponent, EmailForm, EmailListField, EmailValidator],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: Window,  useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
