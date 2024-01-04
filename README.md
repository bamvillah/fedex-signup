# Fedex Signup Form Assessment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8.

## Requirements

- Build a single page application with a sign-up form.
- The form should allow users to enter first name, last name, email and password.
- All fields are required.
- The full name of the user should be shown in the UI outside of the form. It should use a single variable that is updated whenever the input values are changed.
- Password validation:
- - Should be a minimum of eight characters
- - Should contain lower and uppercase letters
- - Should not contain the user's first or last name
- Email should be validated.
- When submitting the form, two requests must be made.
- - First request: HTTP GET to `https://jsonplaceholder.typicode.com/photos/{last_name_length}`. The `thumbnailUrl` parameter from the response needs to be passed to the second request.
- - Second request: HTTP POST to `https://jsonplaceholder.typicode.com/users` including the form values and the image url from the previous request.

## Code decisions

- For styling I used the [Bootstrap framework](https://getbootstrap.com/). To avoid importing/installing all the Bootstrap components which I don't need, I imported it with a CDN script to keep the application small.
- For testing I used Karma/Jasmine. I did not have time to do full coverage with unit tests, but I made some tests covering both code and DOM.
- For the form I used Reactive Forms, because the logic is isolated from the view template and it is easier to define custom validators this way.

## Installing

Install the repo using `npm install` in the `fedex-signup` folder.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
