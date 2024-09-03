import { OAuth2Client } from "google-auth-library";
import { env } from "./env.js";
import { ENV_VARS } from "../constants/index.js";

export const client = new OAuth2Client({
clientId: env(ENV_VARS.GOOGLE_CLIENT_ID),
clientSecret: env(ENV_VARS.GOOGLE_CLIENT_SECRET),
project_id: ''
  });
