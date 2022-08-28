import { DateTime } from 'luxon';
import { Destination } from '../models/common';
import { DATE_FORMAT } from './costants';
import GalaxyMap from './GalaxyMap';
import { filterExpiredDestinations, listDestinations } from './planets';

export function prepareDestinatiaons(destinations: string[], galaxyMap: GalaxyMap) {
    return destinations
        .reduce((acc, dest) => {

            if (galaxyMap.isDeadEnd(dest)) {
                acc.deadEnds.push(dest);
            } else {
                acc.dests.push(dest);
            }

            return acc;
        }, {dests: [], deadEnds: []} as {dests: string[], deadEnds: string[]});
}

export function findPaths(from: string, to: string[], galaxyMap: GalaxyMap) {
    function find(origin: string, dests: string[], tripPaths: string[][] = []): string[][] {
        const paths: string[][] = [];

        // find the shortest path from all destinations
        dests.forEach((dest) => {
            const path = galaxyMap.findShortestPath(origin, dest);
            paths.push(path);
        });

        paths.sort((a, b) => a.length - b.length);

        const shortest = paths[0];

        const nextLocation = shortest[shortest.length - 1];
        tripPaths.push(shortest);

        const unvisitedDests = dests.filter((dest) => dest !== nextLocation);

        if (unvisitedDests.length > 0) {
            return find(nextLocation, unvisitedDests, tripPaths);
        } else {
            return tripPaths;
        }
    }

    const tripPaths = find(from, to);

    if (tripPaths.length > 0) {
        const latestTrip = tripPaths[tripPaths.length - 1];
        const latestLocation = latestTrip[latestTrip.length - 1];

        //find way home;
        const wayHome = galaxyMap.findShortestPath(latestLocation, from);

        if (wayHome.length > 0) {
            tripPaths.push(wayHome);
        }
    }
    return tripPaths;
}

function toDateTime(data: string) {
    return DateTime.fromFormat(data, DATE_FORMAT);
}

function findClosestDate(
    origin: string, destination: string, departureDate: DateTime, destinations: Destination[],
) { 
    const dests = destinations
        .filter((dest) => dest.origin === origin && dest.destination === destination)
        .filter((dest) => toDateTime(dest.data) >= departureDate)
        .sort((a, b) => {
            return toDateTime(a.data).toUnixInteger() - toDateTime(b.data).toUnixInteger()
            || a.price - b.price; // sort by date and price
        });
    return dests[0];
}

export async function enrichPaths( // TODO tests
    paths: string[][], durationofStay: number, departureDate: string,
) {
    const destinations = await listDestinations();
    const filteredDestinations = filterExpiredDestinations(departureDate, destinations);
    const date = toDateTime(departureDate);

    return paths // replace string paths with actual destinations objects
        .map((item, i) => {
            const enriched = [];
            const path = [...item]; // copy path to avoid mutability

            let origin = path.shift();

            while (path.length > 0) {
                const dest = path.shift();

                if (!origin || !dest) {
                    break;
                }

                const closest = findClosestDate(
                    origin, dest, date.plus({days: durationofStay * i}), filteredDestinations,
                );

                enriched.push(closest);

                origin = dest;
            }

            return enriched;
        });
}
