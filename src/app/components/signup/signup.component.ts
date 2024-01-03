import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewUser } from '../../models/new-user.model';
import { Photos } from '../../models/photos.model';
import { PasswordValidator } from '../../shared/password.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  getPhotosUrl = 'https://jsonplaceholder.typicode.com/photos/';
  postUserUrl = 'https://jsonplaceholder.typicode.com/users';

  formPayload: NewUser = {
    firstName: '',
    lastName: '',
    email: '',
    thumbnailUrl: '',
  };
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      PasswordValidator.noFirstAndLastName,
      PasswordValidator.upperAndLowerCase,
    ]),
  });
  fullName: string = 'test';
  formSuccessful: boolean = false;

  constructor(private http: HttpClient) {}

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  onFormSubmit() {
    if (this.signUpForm.valid) {
      const lastNameLength = this.signUpForm.value.lastName?.length;
      const requestUrl = `${this.getPhotosUrl}${lastNameLength}`;

      this.getPhotosRequest(requestUrl);
    }
    this.formSuccessful = false;
    return;
  }

  getPhotosRequest(url: string) {
    this.http.get<Photos>(url).subscribe({
      next: (data) => {
        this.formPayload = {
          firstName: this.signUpForm.value.firstName,
          lastName: this.signUpForm.value.lastName,
          email: this.signUpForm.value.email,
          thumbnailUrl: data.thumbnailUrl,
        };
        this.postNewUserData(this.formPayload);
      },
      error: (data) => {
        console.log('error:', data);
      },
    });
  }

  postNewUserData(userData: NewUser) {
    this.http.post<NewUser>(this.postUserUrl, userData).subscribe({
      next: (data) => {
        console.log('success:', data);
        this.formSuccessful = true;
      },
      error: (data) => {
        console.log('erorr:', data);
        this.formSuccessful = false;
      },
    });
  }
}
