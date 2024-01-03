import { AbstractControl } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}
export class PasswordValidator {
  public static noFirstAndLastName(
    control: AbstractControl
  ): ValidationResult | null {
    const hasNoFirstName = !control.value.includes(
      control.parent?.value.firstName
    );
    const hasNoLastName = !control.value.includes(
      control.parent?.value.lastName
    );
    const valid = hasNoFirstName && hasNoLastName;

    if (!valid) {
      return { noFirstAndLastName: true };
    }
    return null;
  }

  public static upperAndLowerCase(
    control: AbstractControl
  ): ValidationResult | null {
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const valid = hasUpperCase && hasLowerCase;

    if (!valid) {
      return { upperAndLowerCase: true };
    }
    return null;
  }
}
