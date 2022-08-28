import GalaxyMap from './GalaxyMap';

describe('GalaxyMap', () => {
    describe('addRoute(from: string, to: string', () => {
        it('should add routes', () => {
            const gm = new GalaxyMap();

            gm.addRoute('TEST1', 'TEST2');
            gm.addRoute('TEST1', 'TEST3');
            gm.addRoute('TEST2', 'TEST3');

            expect(gm).toMatchSnapshot();
        });

        it('should add routes without duplicates', () => {
            const gm = new GalaxyMap();

            gm.addRoute('TEST1', 'TEST2');
            gm.addRoute('TEST1', 'TEST2');

            expect(gm.getRoute('TEST1')).toEqual({
                from: 'TEST1',
                to: ['TEST2'],
            });
        });
    });

    describe('findShortestPath(from: string, to: string)', () => {
        describe('Graph 1', () => {
            /*
                 a
                /|\
               b c d
              /| | | 
             a f e i 
               |
               e
            */
            const gm = new GalaxyMap();

            gm.addRoute('a', 'b');
            gm.addRoute('a', 'c');
            gm.addRoute('a', 'd');
            gm.addRoute('b', 'f');
            gm.addRoute('b', 'a');
            gm.addRoute('c', 'e');
            gm.addRoute('d', 'i');
            gm.addRoute('f', 'e');
    
            it('should match snapshot', () => {
                expect(gm).toMatchSnapshot(); // check if all nodes are saved in routes
            });
            
            it('should return path', () => {
                expect(gm.findShortestPath('a', 'e')).toEqual(['a', 'c', 'e']);
            });
        });

        describe('Graph 2', () => {
            /*
                 a     e
                /|\    | 
               b c d   f 
            */
            const gm = new GalaxyMap();

            gm.addRoute('a', 'b');
            gm.addRoute('a', 'c');
            gm.addRoute('a', 'd');
            gm.addRoute('e', 'f');

            it('should return empty path', () => {
                expect(gm.findShortestPath('a', 'f')).toEqual([]);
            });

            it('should return empty path', () => {
                expect(gm.findShortestPath('s', 'c')).toEqual([]);
            });

            it('should return empty path', () => {
                expect(gm.findShortestPath('a', 'v')).toEqual([]);
            });
        });
    });

    describe('isDeadEnd(node: string)', () => {
        const gm = new GalaxyMap();

        gm.addRoute('a', 'b');

        it('should be truhty', () => {
            expect(gm.isDeadEnd('b')).toBeTruthy();
            expect(gm.isDeadEnd('c')).toBeTruthy();
        });

        it ('should be falsy', () => {
            expect(gm.isDeadEnd('a')).toBeFalsy();
        });
    });
});
