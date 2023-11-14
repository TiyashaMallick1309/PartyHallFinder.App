import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  selectedAccountType = 'user';
  showLoginForm = false;
  loginActive = true;
  registrationActive = false;
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  loginEmailError = '';
  loginPasswordError = '';
  registrationEmailError = '';
  registrationPasswordError = '';
  confirmPasswordError = '';
  loginEmail!: string;
  loginPassword!: string;
  registrationEmail!: string;
  registrationPassword!: string;
  confirmPassword!: string;
  registrationUsername!: string;
  registrationFirstname!: string;
  registrationLastname!: string;

  images: string[] = ["https://th.bing.com/th/id/R.3699ea3784dabc21d71f52a6019637b3?rik=ZAuWPTIsHDzgOA&riu=http%3a%2f%2fyesofcorsa.com%2fwp-content%2fuploads%2f2018%2f04%2fBanqueting-Hall-Wallpaper-Full-HD.jpg&ehk=KLeuFdp%2fa9jQwYUIFIFLEM4eSUgJ559r6hrSWDMxwcw%3d&risl=&pid=ImgRaw&r=0",
    "https://d1zpvjny0s6omk.cloudfront.net/media/fileupload/2015/06/05/00_Pate_1741-2.jpeg",
    "https://i.pinimg.com/originals/77/98/da/7798da0fbd17fdf083406d44b31b99ce.jpg",
    "https://th.bing.com/th/id/R.2168bbd405040fe23bc17304735abbda?rik=%2fLrBNV8KAW3aWg&riu=http%3a%2f%2fmedia.weddingz.in%2ffiler_public%2f16%2f1e%2f161e9a7b-5c58-4ade-8521-2316c6febbd2%2fthe_lalit.jpg&ehk=3tQn0bg78qvDKqqMULYZSshGJxvrcOAfseu%2fDj1zwXw%3d&risl=&pid=ImgRaw&r=0",
    "https://3.bp.blogspot.com/-jN5zIVGC-j8/T01eqaaiqVI/AAAAAAAAAGg/gLtUljcJhOg/s1600/latinoballroom1.jpg",
    "https://i.pinimg.com/originals/27/b2/80/27b2809e11454d088b124c13e7970e79.jpg",
    "https://i.pinimg.com/originals/c7/f2/1c/c7f21c0efe523449f8c0903193676001.jpg",
    "https://i.pinimg.com/originals/2e/fe/10/2efe100d2fe4b0990d03dfdee625249c.jpg",
    "https://www.oyorooms.com/blog/wp-content/uploads/2018/02/fe-3.png",
    "https://th.bing.com/th/id/R.6d9d702b6577572af2dbc19760e79f44?rik=ET3AqjoFTU44nQ&riu=http%3a%2f%2fi.imgur.com%2f7qBOTJr.jpg&ehk=b0df9vPTqBtp46163793KTOKFSFrzE5GdBgtaZobAsk%3d&risl=&pid=ImgRaw&r=0"
  ];

  currentImageIndex: number = Math.floor(Math.random() * this.images.length);
  src: string = this.images[this.currentImageIndex];

  constructor(private authService: AuthorizationService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.startSlideshow();
  }

  selectAccountType(event: Event) {
    this.selectedAccountType = (event.target as HTMLSelectElement).value;
    this.showLoginForm = true;
    this.loginActive = true;
    this.registrationActive = false;
    this.loginEmailError = '';
    this.loginPasswordError = '';
    this.registrationEmailError = '';
    this.registrationPasswordError = '';
    this.confirmPasswordError = '';
  }

  proceed() {
    this.showLoginForm = true;
  }

  allFieldsFilled = false;

  goBack() {
    this.showLoginForm = false;
  }

  onNextClick() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.shuffleImages();
    this.src = this.images[this.currentImageIndex];
  }

  shuffleImages() {
    for (let i = this.images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.images[i], this.images[j]] = [this.images[j], this.images[i]];
    }
  }

  startSlideshow() {
    setInterval(() => {
      this.onNextClick();
    }, 5000);
  }


}