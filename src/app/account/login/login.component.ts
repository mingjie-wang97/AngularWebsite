import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import PasswordValidator from "password-validator";
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger(
      'error-message-animation', [
      transition(
        ':enter', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('0.2s', style({ transform: 'translateX(0%)', 'opacity': 1 }))
      ]),
      transition(
        ':leave', [
        style({ transform: 'translateX(0%)', 'opacity': 1 }),
        animate('0.2s', style({ transform: 'translateX(-20%)', 'opacity': 0 })),
      ])
    ]
    )
  ],
})
export class LoginComponent implements OnInit {

  private imageBaseURL: string = "../../../assets/img/login/login-image-";
  public signInImageURL: string = "";
  public signUpImageURL: string = "";
  private passwordSchema = new PasswordValidator();
  private signUpFormDisplay: boolean = false;

  constructor(private fb: FormBuilder) { }

  public errorMessageDic = {
    "username-require": "Please enter a username",
    "username-incorrect": "Please enter a valid username",
    "password-require": "Please enter a password",
    "password-format": "Please make sure your password has 8 or more characters with a mix of at least 1 uppercase letters, 1 lowercase letter, 1 numbers & 1 symbol.",
    "password-incorrect": "Please enter a valid password",
    "email-require": "Please enter an email address",
    "email-incorrect": "Please enter a valid email address",
    "confirmPassword-require": "Please confirm your password",
    "confirmPassword-incorrect": "Those passwords didn’t match. Try again.",
  }

  public loginForm = this.fb.group({
    username: ['', [
      Validators.required,
    ]],
    password: ['', [
      Validators.required,
      this.passwordFormatValidator.bind(this)
    ]]
  });
  public usernameCheckValid: boolean = true;
  public passwordCheckValid: boolean = true;

  public signupForm = this.fb.group({
    username: ['', [
      Validators.required,
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      this.passwordFormatValidator.bind(this)
    ]],
    confirmPassword: ['', [
      Validators.required,
      this.confirmPasswordValidator.bind(this)
    ]]
  });

  ngOnInit(): void {
    if (!this.signInImageURL) {
      this.signInImageURL = this.imageBaseURL + this.getRandomNumber(1, 18).toString() + ".jpg";
    }
    // make sure 2 image is not same
    while (!this.signUpImageURL || this.signUpImageURL === this.signInImageURL) {
      this.signUpImageURL = this.imageBaseURL + this.getRandomNumber(1, 18).toString() + ".jpg";
    }

    // https://www.npmjs.com/package/password-validator
    // set up password validation schema
    this.passwordSchema
      .is().min(8)                                    // Minimum length 8
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits(1)                                // Must have at least 1 digits
      .has().symbols(1)                               // Should have at least 1 symbol
      .has().not().spaces();                          // Should not have spaces
  }

  toggleActive() {
    // reset the form to its initial state
    this.loginForm.reset()
    this.signupForm.reset();

    let containerElement = $(".login-container")[0];
    containerElement.classList.toggle('sign-up-active');
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  passwordVlidation(input: FormControl) {

  }

  login() {

  }

  signup() {

  }

  passwordFormatValidator(input: FormControl) {
    const value = input.value;
    if (this.passwordSchema) {
      return (this.passwordSchema.validate(value, { list: true }).length > 0) ? { format: true } : null;
    }
    return null;
  }

  confirmPasswordValidator(input: FormControl) {
    if (!this.signupForm) return null;
    const password: string = this.signupForm.get('password')?.value;
    const confirmPassword = input.value;
    return (confirmPassword === password) ? null : { confirm: true };
  }
}
