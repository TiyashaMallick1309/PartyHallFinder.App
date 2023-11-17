import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
  message: string = '';

  Send() {
    // Clear form fields
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.phone = '';
    this.message = '';

    // Display alert message
    window.alert('Message sent!');
  }
}