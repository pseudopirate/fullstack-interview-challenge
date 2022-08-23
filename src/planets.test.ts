import fs from 'fs';
import path from 'path';
import {
    Destination, listAvailableDestinations, listDestinations, listPlanets,
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
            // expect(
            //     dests.every((dest) => ('name' in planet)),
            // ).toBeTruthy();
        });
    });

    jest.mock('../planets', () => ({
        listDestinations: async () => {
            const filepath = path.join(__dirname, '../dataset.test.json');
            const planets = await fs.promises.readFile(filepath, 'utf8');

            return JSON.parse(planets) as Destination[];
        },
    }));

    describe('listAvailableDestinations(date: number)', () => {
        it('should return empty list', async () => {
            const date = new Date('2222-11-11').getTime();
            const dests = await listAvailableDestinations(date);
            expect(dests).toEqual([]);
        });

        it('should match snapshot', async () => {
            const date = new Date('2022-11-06').getTime();
            const dests = await listAvailableDestinations(date);
            expect(dests).toMatchSnapshot();
        });
    });
});
