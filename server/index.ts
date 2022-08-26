import express from 'express';
import { listPlanets } from './planets';

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/ping', (__, res) => {
    res.send('It is fine');
});

app.get('/planets', async (__, res) => {
    const planets = await listPlanets();
    res.send(planets);
});

app.listen(PORT, () => {
    console.info(`Server listening on ${PORT}`);
});
