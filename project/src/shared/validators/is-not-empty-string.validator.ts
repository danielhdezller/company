import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * A decorator that check that the field is a not empty string
 *
 * @export
 * @param {(((new (...args: any[]) => any) | [new (...args: any[]) => any]))} targetType
 * @return {*}  {PropertyDecorator}
 */
export function IsNotEmptyString({
  maxLength,
}: {
  maxLength?: number;
} = {}): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    IsString()(target, propertyKey);
    IsNotEmpty()(target, propertyKey);
    if (maxLength) {
      MaxLength(maxLength);
    }
  };
}
