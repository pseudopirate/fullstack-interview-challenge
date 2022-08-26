
import { Button, MenuItem, Select, InputLabel, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { Field, useField, useForm } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { FormValues } from '.';
import { Planet } from '../../../../models/common';

export interface TravelFormContent {
    planets: Planet[]
}

function TravelFormContent({planets}: TravelFormContent) {
    const originField = useField<FormValues['origin']>('origin');
    const formApi = useForm<FormValues>();

    return (
        <Grid container spacing={4}>
            <Field name="origin">
                {({input}) => (
                    <Grid item xs={12}>
                        <InputLabel htmlFor="origin">Your current location</InputLabel>
                        <Select inputProps={input} labelId="origin" fullWidth>
                            {planets
                                .map(({code, name}) => (
                                    <MenuItem value={code} key={code}>{name}</MenuItem>
                                ))}
                        </Select>
                    </Grid>
                )}
            </Field>

            <Field name="destinations">
                {({input}) => (
                    <Grid item xs={12}>
                        <InputLabel htmlFor="destinations">Destinations</InputLabel>
                        <Select inputProps={input} multiple labelId="destinations" fullWidth>
                            {planets
                                .filter(({code}) => code !== originField.input.value)
                                .map(({code, name}) => (
                                    <MenuItem value={code} key={code}>{name}</MenuItem>
                                ))}
                        </Select>
                    </Grid>
                )}
            </Field>

            <Field name="durationOfStay">
                {({input}) => (
                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            inputProps={input}
                            label="Duration of stay (days)"
                            type="number"
                        />
                    </Grid>
                )}
            </Field>

            <Field name="departureDate">
                {({input}) => (
                    <Grid item xs={12}>
                        <DatePicker
                            label="Departure date"
                            mask="__/__/____"
                            onChange={input.onChange}
                            renderInput={(props) => <TextField {...props} variant="standard"/>}
                            value={input.value}
                            minDate={DateTime.now()}
                        />
                    </Grid>
                )}
            </Field>

            <Grid item xs={12}>
                <Button type="submit" variant="contained">Prepare my trip</Button>
            </Grid>

            <OnChange name="origin">
                {() => {
                    formApi.change('destinations', []);
                }}
            </OnChange>
        </Grid>
    );
}

export default TravelFormContent;
