import fs from 'fs';
import path from 'path';

export interface Planet {
    name: string;
    code: string;
}

export interface Destination {
    data: string;
    origin: Planet['code'];
    destination: Planet['code'];
    price: number;
    availability: number;
}

export type ListAvailableDestinationsArgs = Partial<Pick<Destination, 'data' | 'origin' | 'destination'>>;

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

export async function listAvailableDestinations(dateMillis: number) {
    const dests = await listDestinations();

    return dests.filter((dest) => new Date(dest.data).getTime() >= dateMillis);
}
