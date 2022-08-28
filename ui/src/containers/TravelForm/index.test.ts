import { DateTime } from 'luxon';
import { FormValues, prepareFromValues } from '.';

describe('TravelForm', () => {
    describe('prepareFromValues(values: FormValues)', () => {
        const AUGUST_27_2022_MILLIS = 1661621605728;

        const values = {
            origin: 'TEST',
            destinations: ['TEST2'],
            durationOfStay: 5,
            departureDate: DateTime.fromMillis(AUGUST_27_2022_MILLIS),
        } as FormValues;

        it('should return prepared form values', () => {
            expect(prepareFromValues(values)).toMatchSnapshot();
        });
    });
});