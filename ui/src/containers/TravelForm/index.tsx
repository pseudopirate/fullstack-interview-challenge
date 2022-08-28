import React from 'react';
import { Form } from 'react-final-form';
import { getData, sendData } from '../../utils';
import {Destination, Planet, TripPostRequest, TripPostResponse} from '../../../../models/common';
import TravelFormContent from './Form';
import { DateTime } from 'luxon';
import Loader from '../../components/Loader';
import ResponseContainer from './ResponseContainer';


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
    const [errors, setErrors] = React.useState<string[]>();
    const [trip, setTrip] = React.useState<Destination[][]>();

    const initialValues = React.useMemo(() => {
        return {
            origin: 'TAT',
            destinations: [],
            departureDate: DateTime.now(),
            durationOfStay: 15,
        };
    }, [planets]);

    return (
        <>
            <Form<FormValues>
                onSubmit={async (vals) => {
                    const data = prepareFromValues(vals);
                    try {
                        const resp =
                            await sendData<TripPostResponse, TripPostRequest>('/trip', data);
                        setErrors(resp.errors);
                        setTrip(resp.paths);
                    } catch (e) {
                        setErrors([(e as Error).message]);
                    }
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
            <ResponseContainer errors={errors} trip={trip}/>
        </>
    );
};

export default TravelForm;
