import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

/**
 * Configure a INestApplication to use a document generator (swagger right now).
 *
 * @param {INestApplication} app The app where the document builder will be configured.
 */
export function configureDocumentationGenerator(
  app: INestApplication,
  path: string,
): void {
  const swaggerPaths = [
    path,
    // Add a second swagger path with that reference to the best tv show.
    'the-office',
  ];

  // Configure the list of documents path`
  swaggerPaths.forEach((path) => {
    const config = new DocumentBuilder()
      .setTitle('Nest')
      .setDescription('API documentation.')
      .setContact(
        'Weather',
        'https://github.com/danielhdezllera',
        'dhdezllerena94@gmail.com',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const options: SwaggerDocumentOptions = {
      ignoreGlobalPrefix: false,
    };

    const document = SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup(path, app, document);
  });
}
