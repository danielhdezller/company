import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';

/**
 * Configure a base validation pipe to the provided INestApplication
 *
 * @export
 * @param {INestApplication} app The app which the validation pipe will be configured.
 */
export function configureDefaultValidationPipes(app: INestApplication) {
  // Force to use validation pipes in all application, each modules will
  // have to ensure that its functionality
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
}
