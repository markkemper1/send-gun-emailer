import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [`
    .title {color: #eee; font-size: 120%; text-transform: uppercase;}
    .tagline { color: #ccc; font-size: 80%; }
    hr {width: 50%; margin: 30px auto; border-color: #aaa;}
    h1 {text-align: center;}
   
  `],
  template: `
  
  <nav class="navbar navbar-inverse">
    <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="/"><span class='title'>Send Gun</span> <span class='tagline'>reliable email delivery</span></a> 
    </div>
    </div>
    
  </nav>

  <div class="container">

    <div class="starter-template">
      <h1>Send an email</h1>
      <hr />
      <email-form></email-form>
    </div>

  </div>
  `,
})
export class AppComponent { name = 'Angular'; }
