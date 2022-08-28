import {
    filterExpiredDestinations,
    listDestinations, listPlanets,
} from './planets';

describe('planets', () => {
    describe('listPlanets()', () => {
        it('should return planets list', async () => {
            const planets = await listPlanets();

            expect(Array.isArray(planets)).toBeTruthy();
            expect(
                planets.every((planet) => Boolean(planet.name) && Boolean(planet.code)),
            ).toBeTruthy();
        });
    });

    describe('listDestinations()', () => {
        it('should return destinations list', async () => {
            const dests = await listDestinations();

            expect(Array.isArray(dests)).toBeTruthy();
        });
    });

    describe('filterExpiredDestinations(from: string, dests: Destination[])', () => {
        const dests = [
            {
                'data': '2022-09-14',
                'origin': 'TEST1',
                'destination': 'NAB',
                'price': 492.09,
                'availability': 0,
            },
            {
                'data': '2022-09-15',
                'origin': 'TEST2',
                'destination': 'NAB',
                'price': 492.09,
                'availability': 1,
            },
            {
                'data': '2022-10-14',
                'origin': 'TEST3',
                'destination': 'NAB',
                'price': 492.09,
                'availability': 22,
            },
        ];

        it('should return empty list', () => {
            expect(filterExpiredDestinations('2022-11-14', dests)).toEqual([]);
        });

        it('should filter out unavailable destinations', () => {
            expect(filterExpiredDestinations('2021-08-14', dests)).toEqual([dests[1], dests[2]]);
        });

        it('should return one destination', () => {
            expect(filterExpiredDestinations('2022-10-14', dests)).toEqual([dests[2]]);
        });
    });
});
