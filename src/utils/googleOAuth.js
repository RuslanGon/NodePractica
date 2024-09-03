import { OAuth2Client } from "google-auth-library";
import fs from 'node:fs/promises';
import path from "node:path";
import { env } from "./env.js";
import { ENV_VARS } from "../constants/index.js";

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
