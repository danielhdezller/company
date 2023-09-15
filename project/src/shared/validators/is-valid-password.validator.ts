import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function isValidPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidPassword,
    });
  };
}

@ValidatorConstraint({ name: 'password', async: false })
@Injectable()
export class IsValidPassword implements ValidatorConstraintInterface {
  validate(password: string): boolean {
    try {
      if (password.length <= 8) {
        throw new UnprocessableEntityException(
          'Password should be more that 8 character.',
        );
      }

      const alphanumericPattern = /[a-zA-Z0-9]/;
      const specialCharacterPattern = /[!@#$%^&*()-_+=[\]{};:'",.<>?/\\|]+/;

      if (
        !alphanumericPattern.test(password) ||
        !specialCharacterPattern.test(password)
      ) {
        throw new UnprocessableEntityException(
          'Combination of alphanumeric, special character.',
        );
      }

      for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1]) {
          throw new UnprocessableEntityException(
            'Passwords shall not contain any two identical consecutive characters.',
          );
        }
      }
    } catch (err) {
      throw err;
    }

    return true;
  }
}
