import React from 'react';
import { Form } from 'react-final-form';
import { getData } from '../../utils';
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

const FormContent = ({planets}: FormContentProps) => {
    const initialValues = React.useMemo(() => {
        return {
            origin: 'TAT',
            destinations: [],
            departureDate: DateTime.now(),
            durationOfStay: 15
        };
    }, [planets]);

    return (
        <Form<FormValues>
            onSubmit={(...vars) => {
                console.log(vars);
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
