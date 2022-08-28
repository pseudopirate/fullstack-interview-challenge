import GalaxyMap from './GalaxyMap';

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

