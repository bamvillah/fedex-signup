import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title tag in the head element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('title')?.textContent).toContain(
      'Fedex Signup'
    );
  });

  it('should render a fedex logo', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header.header>img').src).toContain(
      '/assets/fedex_logo.png'
    );
  });
});
