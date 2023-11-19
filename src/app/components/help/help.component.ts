import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  message: string = '';

  Send() {
    // Clear form fields
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.message = '';

    // Display alert message
    window.alert('Message sent!');
  }
}