import fs from 'fs';
import path from 'path';
import { Destination } from '../models/common';
import {
    listAvailableDestinations, listDestinations, listPlanets,
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

    jest.mock('../planets', () => ({
        listDestinations: async () => {
            const filepath = path.join(__dirname, '../dataset.test.json');
            const planets = await fs.promises.readFile(filepath, 'utf8');

            return JSON.parse(planets) as Destination[];
        },
    }));

    describe('listAvailableDestinations(date: number)', () => {
        it('should filter by date return empty list', async () => {
            const data = '2222-11-11';
            const dests = await listAvailableDestinations({ data });
            expect(dests).toEqual([]);
        });

        it('should filter by date match snapshot', async () => {
            const data = '2022-11-06';
            const dests = await listAvailableDestinations({ data });
            expect(dests).toMatchSnapshot();
        });

        it('should return all and match snapshot', async () => {
            const dests = await listAvailableDestinations({});
            expect(dests).toMatchSnapshot();
        });

        it('should filter by origin and return empty list', async () => {
            const dests = await listAvailableDestinations({ origin: 'ALD' });
            expect(dests).toEqual([]);
        });

        it('should filter by origin and match snapshot', async () => {
            const dests = await listAvailableDestinations({ origin: 'TAT' });
            expect(dests).toMatchSnapshot();
        });

        it('should filter by destination and return empty list', async () => {
            const dests = await listAvailableDestinations({ destination: 'ALD' });
            expect(dests).toEqual([]);
        });

        it('should filter by destination and match snapshot', async () => {
            const dests = await listAvailableDestinations({ destination: 'TAT' });
            expect(dests).toMatchSnapshot();
        });
    });
});
