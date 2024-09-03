
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


};

export const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

