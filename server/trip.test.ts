import GalaxyMap from './GalaxyMap';
import { findPaths, prepareDestinatiaons } from './trip';

describe('trip', () => {
    describe('prepareDestinatiaons(destinations: string[], galaxyMap: GalaxyMap)', () => {
        const gm = new GalaxyMap();
        gm.addRoute('a', 'b');
        gm.addRoute('a', 'c');
        gm.addRoute('b', 'd');
        gm.addRoute('e', 'f'); 
        
        it('should have filtered dead ends', () => {
            const {deadEnds} = prepareDestinatiaons(['f', 'g'], gm);
            expect(deadEnds).toEqual(['f', 'g']);
        });

        it('should have only one destination', () => {
            const {dests} = prepareDestinatiaons(['b', 'c'], gm);
            expect(dests).toEqual(['b']);
        });
    });

    describe('findPaths(from: string, to: string[], galaxyMap: GalaxyMap)', () => {
        const gm = new GalaxyMap();
        gm.addRoute('a', 'b');
        gm.addRoute('b', 'c');
        gm.addRoute('c', 'd');
        gm.addRoute('d', 'a');
        gm.addRoute('a', 'f');

        it('should have a way to home', () => {
            const paths = findPaths('a', ['d', 'b'], gm);
            const lastPath = paths[paths.length - 1];

            expect(lastPath[lastPath.length - 1]).toEqual('a');
        });

        it('should build paths', () => {
            expect(findPaths('a', ['d', 'b'], gm)).toEqual([
                ['a', 'b'],
                ['b', 'c', 'd'],
                ['d', 'a'],
            ]);
        });

        it('should be one way trip', () => {
            expect(findPaths('a', ['f'], gm)).toEqual([['a', 'f']]);
        });
    });
});
