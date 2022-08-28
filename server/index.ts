import express, {NextFunction, Request, Response} from 'express';
import { TripPostRequest } from '../models/common';
import { getGalaxyMap, listPlanets } from './planets';
import { enrichPaths, findPaths, prepareDestinatiaons } from './trip';

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/ping', (__, res) => {
    res.send('It is fine');
});

app.use(express.json());

app.get('/planets', async (__, res) => {
    const planets = await listPlanets();
    res.send(planets);
});

app.post('/trip', async (req: Request<unknown, TripPostRequest>, res: Response) => {
    const {origin, destinations, durationOfStay, departureDate} = req.body as TripPostRequest;
    const galaxyMap = await getGalaxyMap();
    const errors: string[] = [];

    if (galaxyMap.isDeadEnd(origin)) {
        res.send({errors: [`You can't get enywhere from ${origin} it's a dead end.`]});
    }

    const {dests, deadEnds} = prepareDestinatiaons(destinations, galaxyMap);

    if (deadEnds.length > 0) {
        deadEnds.forEach((dest) => {
            errors.push(`You can't get anywhere from ${dest} it's a dead end`);
        });
    }


    let paths: string[][] = [];
    if (dests.length > 0) {
        paths = findPaths(origin, dests, galaxyMap);
    }

    const enrichedPaths = await enrichPaths(paths, durationOfStay, departureDate);

    res.send({paths: enrichedPaths, errors});
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).send({errors: [err.message]});
});

app.listen(PORT, () => {
    console.info(`Server listening on ${PORT}`);
});
