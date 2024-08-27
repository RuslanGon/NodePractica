import mongoose from "mongoose";
import { env } from "../utils/env.js";
import { ENV_VARS } from '../constants/index.js';

export const initMongoConection = async () => {
    const user = env(ENV_VARS.MONGODB_USER);
    const password = env(ENV_VARS.MONGODB_PASSWORD);
    const url = env(ENV_VARS.MONGODB_URL);
    const db = env(ENV_VARS.MONGODB_DB);

    const conectionLink = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

    console.log('Connection link:', conectionLink);

    try {
      await mongoose.connect(conectionLink, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB connection successful');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
  throw err;
    }
  };



//



