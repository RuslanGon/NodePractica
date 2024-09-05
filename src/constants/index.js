
import path from 'node:path';

export const ENV_VARS = {
PORT: 'PORT',
MONGODB_USER: 'MONGODB_USER',
MONGODB_PASSWORD: 'MONGODB_PASSWORD',
MONGODB_URL: 'MONGODB_URL',
MONGODB_DB: 'MONGODB_DB',

SMTP_HOST: 'SMTP_HOST',
SMTP_PORT: 'SMTP_PORT',
SMTP_USER: 'SMTP_USER',
SMTP_PASSWORD: 'SMTP_PASSWORD',

JWT_SECRET: "JWT_SECRET",
SMTP_FROM: 'SMTP_FROM',

APP_DOMAIN: 'APP_DOMAIN',
CLOUD_NAME: 'CLOUD_NAME',
API_KEY: 'API_KEY',
API_SECRET: 'API_SECRET',

GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET'


};

export const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');
export const SWAGGER = path.join(process.cwd(), 'docs', 'swagger.json');



