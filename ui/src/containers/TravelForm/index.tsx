import React from 'react';
import { Form } from 'react-final-form';
import { getData, sendData } from '../../utils';
import {Planet} from '../../../../models/common';
import TravelFormContent from './Form';
import { DateTime } from 'luxon';
import Loader from '../../components/Loader';


function TravelForm() {
    const [planets, setPlanets] = React.useState<Planet[]>();

    React.useEffect(() => {
        (async () => {
            const data = await getData<Planet[]>('/planets');
            setPlanets(data);
        })();
    }, []);

    return planets ? <FormContent planets={planets}/> : <Loader/>;
}

export interface FormValues {
    origin: Planet['code'];
    destinations: Planet['code'][];
    durationOfStay: number;
    departureDate: DateTime;
}

export interface FormContentProps {
    planets: Planet[];
}

export function prepareFromValues({
    origin, destinations, durationOfStay, departureDate,
}: FormValues) {
    return {
        origin,
        destinations,
        durationOfStay,
        departureDate: departureDate.toFormat('yyyy-MM-dd'),
    };
}

const FormContent = ({planets}: FormContentProps) => {
    const initialValues = React.useMemo(() => {
        return {
            origin: 'TAT',
            destinations: [],
            departureDate: DateTime.now(),
            durationOfStay: 15,
        };
    }, [planets]);

    return (
        <Form<FormValues>
            onSubmit={async (vals) => {
                const data = prepareFromValues(vals);
                await sendData('/trip', data);
            }}
            initialValues={initialValues}
            // validate={validate}
        >
            {({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <TravelFormContent planets={planets} />
                </form>
            )}
        </Form>
    );
};

export default TravelForm;
