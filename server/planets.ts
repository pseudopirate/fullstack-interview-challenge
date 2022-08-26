import fs from 'fs';
import path from 'path';
import { Destination, Planet } from '../models/common';

export async function listPlanets() {
    const filepath = path.join(__dirname, '../planets.json');
    const planets = await fs.promises.readFile(filepath, 'utf8');

    return JSON.parse(planets) as Planet[];
}

export async function listDestinations() {
    const filepath = path.join(__dirname, '../dataset.json');
    const planets = await fs.promises.readFile(filepath, 'utf8');

    return JSON.parse(planets) as Destination[];
}

type Predicate<T> = (arg: T) => boolean

type ListAvailableDestinationsArgs = Partial<Pick<Destination, 'data' | 'origin' | 'destination'>>;

export async function listAvailableDestinations(
    { data, origin, destination }: ListAvailableDestinationsArgs,
) {
    const dests = await listDestinations();
    const predicates = [] as Predicate<Destination>[];

    if (data) {
        predicates.push(
            (dest) => new Date(dest.data).getTime() >= new Date(data).getTime(),
        );
    }

    if (origin) {
        predicates.push(
            (dest) => dest.origin === origin,
        );
    }

    if (destination) {
        predicates.push(
            (dest) => dest.destination === destination,
        );
    }

    return dests
        .filter(
            (dest) => predicates.every((fn) => fn(dest)),
        )
        .sort((a, b) => a.price - b.price);
}
