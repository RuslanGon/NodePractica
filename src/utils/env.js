import dotenv from 'dotenv';

dotenv.config();

export const env = (envName, defaultValue) => {
    if(process.env[envName]) return process.env[envName];
return defaultValue ;
};
