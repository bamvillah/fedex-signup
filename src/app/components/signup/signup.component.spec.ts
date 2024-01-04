import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    thumbnailUrl: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create the signup component', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    component.signUpForm.setValue({
      firstName: 'Name',
      lastName: 'Lastname',
      email: 'email@test.com',
      password: 'PassWord!',
    });
  });

  describe('ngOnInit', () => {
    it('should call the onFormChange method', () => {
      spyOn(component, 'onFormChange');
      component.ngOnInit();
      expect(component.onFormChange).toHaveBeenCalled();
    });
  });

  describe('onFormChange', () => {
    it('should fill the fullName variable with first and last name', () => {
      component.onFormChange();
      expect(component.fullName).toContain('Name Lastname');
    });
  });

  describe('onFormSubmit', () => {
    it('should call the getPhotosRequest method', () => {
      component.signUpForm.setValue({
        firstName: 'Name',
        lastName: 'Lastname',
        email: 'email@test.com',
        password: 'PassWord!',
      });

      spyOn(component, 'getPhotosRequest');
      component.onFormSubmit();
      expect(component.getPhotosRequest).toHaveBeenCalled();
    });

    it('should set formSuccessful to false', () => {
      component.onFormSubmit();
      expect(component.formSuccessful).toBe(false);
    });
  });

  describe('getPhotosRequest', () => {
    let testUrl: string = '/photos';

    it('should do a GET request', () => {
      const testFormData: FormData = {
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'email@test.com',
        password: 'PassWord',
      };
      httpClient
        .get<FormData>(testUrl)
        .subscribe((data) => expect(data).toEqual(testFormData));

      const req = httpTestingController.expectOne('/photos');

      expect(req.request.method).toEqual('GET');

      req.flush(testFormData);

      httpTestingController.verify();
    });

    it('should throw an error when GET call failed', () => {
      const errorMessage = 'Deliberate 404 error';

      httpClient.get<FormData[]>(testUrl).subscribe({
        next: () => fail('should have failed with the 404 error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(404);
          expect(error.error).withContext('message').toEqual(errorMessage);
        },
      });

      const req = httpTestingController.expectOne(testUrl);

      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('postNewUserData', () => {
    let postUrl: string = '/users';
    const testUserData: UserData = {
      firstName: 'FirstName',
      lastName: 'LastName',
      email: 'email@test.com',
      thumbnailUrl: 'thumbnail',
    };

    it('should POST a new user', () => {
      httpClient
        .post<UserData>(postUrl, testUserData)
        .subscribe((data) => expect(data).toEqual(testUserData));

      const req = httpTestingController.expectOne('/users');

      expect(req.request.method).toEqual('POST');

      req.flush(testUserData);

      httpTestingController.verify();
    });

    it('should throw an error when POST call failed', () => {
      const errorMessage = 'Deliberate 404 error';

      httpClient.post<UserData[]>(postUrl, testUserData).subscribe({
        next: () => fail('should have failed with the 404 error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(404);
          expect(error.error).withContext('message').toEqual(errorMessage);
        },
      });

      const req = httpTestingController.expectOne(postUrl);

      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('the sign up form', () => {
    beforeEach(() => {
      component.signUpForm.setValue({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    });

    it('should show four input elements in the form group', () => {
      const formElement =
        fixture.debugElement.nativeElement.querySelector('#signUpForm');
      const inputElements = formElement.querySelectorAll('input');
      expect(inputElements.length).toEqual(4);
    });

    it('should have initial values', () => {
      const signUpFormGroup = component.signUpForm;
      const signUpFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      };
      expect(signUpFormGroup.value).toEqual(signUpFormValues);
    });

    it('should show a submit button', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('button')?.textContent).toContain('Submit');
    });

    it('should show a success message when the signup succeeded', () => {
      component.formSuccessful = true;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const successMessage = compiled.querySelector('.alert.alert-success');
      expect(successMessage.innerHTML).toBe(' Yay the form is sent! ');
    });
  });
});
