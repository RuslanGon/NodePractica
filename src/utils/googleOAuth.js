import { OAuth2Client } from "google-auth-library";
import fs from 'node:fs/promises';
import path from "node:path";
import { env } from "./env.js";
import { ENV_VARS } from "../constants/index.js";
import createHttpError from "http-errors";

const googleConfigPath = path.join(process.cwd(), 'google.json');
const googleConfig = JSON.parse(await fs.readFile(googleConfigPath, 'utf-8'));

const client = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_CLIENT_SECRET),
  project_id: googleConfig.project_id,
  redirectUri: googleConfig.redirect_uris[0]
});

export const generateOAuthURL = () => {
  return client.generateAuthUrl({
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  });
};


export const validateGoogleCode = async (code) => {
  try {
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;

    if (!idToken) {
      throw createHttpError(401, 'ID token is missing');
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: env(ENV_VARS.GOOGLE_CLIENT_ID), // Проверка, что токен предназначен для вашего приложения
    });

    const payload = ticket.getPayload(); // Извлечение данных пользователя из токена

    return payload;

  } catch (error) {
    console.error('Error during Google OAuth authorization:', error);
    if (error.response && error.response.status === 401) {
      throw createHttpError(401, 'Invalid Google authorization code');
    } else {
      throw createHttpError(500, 'Error during Google OAuth authorization');
    }
  }
};
