import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { notFoundMiddleware } from './middlewares/notFoutdMiddleware.js';
import { errorhandlerMiddleware } from './middlewares/errorhandlerMiddleware.js';


export const startServer = () => {

    const app = express();

    app.use(pino({
        transport: {
            target: 'pino-pretty',
        }
    }));

    app.use(cors());

    app.get('/', (req, res, next) => {
    res.send('Hello word');
    });

    app.use(notFoundMiddleware);

    app.use(errorhandlerMiddleware);

    const PORT = env(ENV_VARS.PORT, 3000);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};

