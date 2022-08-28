import fs from 'fs';
import path from 'path';
import { Destination, Planet } from '../models/common';
import { DateTime } from 'luxon';
import GalaxyMap from './GalaxyMap';
// import DestinationsGraph from './DestinationsGraph';

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

const DATE_FORMAT = 'yyyy-MM-dd';

export function filterExpiredDestinations(from: string, dests: Destination[]) {
    const fromData = DateTime.fromFormat(from, DATE_FORMAT);
    return dests
        .filter((dest) => {
            const destData = DateTime.fromFormat(dest.data, DATE_FORMAT);

            return dest.availability > 0 && destData >= fromData;
        });    
}

let gm: GalaxyMap;

export async function getGalaxyMap() {
    if (gm) {
        return gm;
    }

    const dests = await listDestinations();
    gm = new GalaxyMap();

    dests.forEach((dest) => {
        gm.addRoute(dest.origin, dest.destination);
    });

    return gm;
}
