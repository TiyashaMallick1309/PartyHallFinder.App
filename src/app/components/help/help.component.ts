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
    // Display alert message
    window.alert('Message sent!');
    window.location.reload();
  }

}