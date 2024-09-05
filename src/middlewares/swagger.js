import createHttpError from 'http-errors';
import fs from 'node:fs/promises';
import swaggerUi from 'swagger-ui-express';
import { SWAGGER } from '../constants/index.js';

export const swagger = async () => {
  try {
    const swaggerDocument = JSON.parse(fs.readFileSync(SWAGGER).toString()) ;
    return [...swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
  } catch (error) {
    console.log(error);
return (req, res, next) =>
    next(createHttpError(500, 'Swagger file is not found'));
  }
};

