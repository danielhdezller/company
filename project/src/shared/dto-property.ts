import { applyDecorators } from '@nestjs/common';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

/**
 * This function combines ApiProperty and Expose decorator to define the properties
 * that will be defined and sent in the dto object.
 *
 * @export
 * @param {ApiPropertyOptions} [options]
 * @return {*}
 */
export function DtoProperty(options?: ApiPropertyOptions) {
  return applyDecorators(ApiProperty(options), Expose());
}

/**
 * This function combines ApiPropertyOptional and Expose decorator to define the properties
 * that will be defined and sent in the dto object.
 *
 * @export
 * @param {ApiPropertyOptions} [options]
 * @return {*}
 */
export function DtoOptionalProperty(options?: ApiPropertyOptions) {
  return applyDecorators(ApiPropertyOptional(options), Expose(), IsOptional());
}
