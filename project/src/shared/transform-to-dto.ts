import { plainToClass } from 'class-transformer';
import { transformAndValidate } from 'class-transformer-validator';
import {
  validateOrReject,
  validateSync,
  ValidationError,
} from 'class-validator';
import { OmitFunctions } from './type-utils';

export declare type ClassType<T> = new (...args: any[]) => T;

/**
 * Disable eslint to allow extend from object, is not a common use and is confusing,
 * but in this case it is justified because transformAndValidate return something
 * that extends from object.
 */
/* eslint-disable */
export async function castAndValidate<T extends object>(
  classType: ClassType<T>,
  object: OmitFunctions<T>,
) {
  const result = plainToClass(classType, object, {
    excludeExtraneousValues: true,
  });

  await validateOrReject(result);

  return result;
}
/* eslint-enable */

/**
 * Disable eslint to allow extend from object, is not a common use and is confusing,
 * but in this case it is justified because transformAndValidate return something
 * that extends from object.
 */
/* eslint-disable */
export function castAndValidateSync<T extends object>(
  classType: ClassType<T>,
  object: OmitFunctions<T>,
) {
  const result = plainToClass(classType, object, {
    excludeExtraneousValues: true,
  });

  let validationErrors = validateSync(result);

  if (validationErrors.length) {
    const validationError = new ValidationError();

    Object.assign(validationError, validationErrors[0]);

    throw validationError;
  }

  return result;
}
/* eslint-enable */

/**
 * Disable eslint to allow extend from object, is not a common use and is confusing,
 * but in this case it is justified because transformAndValidate return something
 * that extends from object.
 */
/* eslint-disable */
export function castAndValidateMultiple<T extends object>(
  classType: ClassType<T>,
  object: OmitFunctions<T>[],
): Promise<T[]> {
  return transformAndValidate(classType, object, {
    transformer: {
      ignoreDecorators: true,
      excludePrefixes: ['_'],
      excludeExtraneousValues: true,
    },
  });
}
/* eslint-enable */
