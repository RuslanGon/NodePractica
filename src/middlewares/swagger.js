import createHttpError from 'http-errors';
import fs from 'node:fs/promises';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';

export const swagger = () => {
  try {
    const swaggerDocument = fs.readFileSync(path.join(process.cwd(), 'docs', 'swagger.json'));
    return [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
  } catch (error) {
    console.log(error);
    return (req, res, next) =>
    next(createHttpError(500, 'Swagger file is not found')) ;
  }
};
