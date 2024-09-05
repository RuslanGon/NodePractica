import createHttpError from 'http-errors';
import fs from 'node:fs/promises';
import swaggerUi from 'swagger-ui-express';
import { SWAGGER } from '../constants/index.js';

export const swagger = async () => {
  try {
    const swaggerDocument = JSON.parse(await fs.readFile(SWAGGER, 'utf-8'));
    return [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
  } catch (error) {
    console.error('Error loading Swagger document:', error);
    return (req, res, next) =>
      next(createHttpError(500, 'Swagger file is not found'));
  }
};
