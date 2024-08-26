import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

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

app.use((req, res, next) => {
res.status(404).send('Oops, Route is not found');
});

app.use((error, req, res, next) => {
res.status(500).send(error.massage);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
