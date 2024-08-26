import express from 'express';

const app = express();

app.use((req, res, next) => {

})

app.get('/', (req, res, next) => {
res.send('Hello word');
});

app.listen(3000, () => {

    console.log('Server is running on port 3000');
});
