import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  form: FormGroup = this.fb.group({
    name:'',
    email:'',
    message:''
  });

  constructor(private fb: FormBuilder){}

  async Send() {
    emailjs.init('sNSFgqes1kXmUrcNo');
    let response = await emailjs.send("service_jz497qj","template_vhk1nmd",{
      name:this.form.value.name,
      email:this.form.value.email,
      message:this.form.value.message
    });
    // Display alert message
    window.alert('Message sent!');
    window.location.reload();
  }

}