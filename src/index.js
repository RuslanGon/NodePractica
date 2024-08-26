import express from 'express';
import pino from 'pino-http';

const app = express();

app.use(pino({
    transport: {
        target: 'pino-pretty', // Модуль для форматирования логов
        options: {
            colorize: true // Раскрашивает логи для удобства чтения
        }
    }
}));

app.get('/', (req, res, next) => {
res.send('Hello word');
});

app.listen(3000, () => {

    console.log('Server is running on port 3000');
});
