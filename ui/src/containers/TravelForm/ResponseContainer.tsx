import styled from '@emotion/styled';
import { Alert, Grid, Paper } from '@mui/material';
import { Destination } from '../../../../models/common';

const Container = styled.div`
    margin-top: 16px;
`;

const TripInfo = styled.span`
    margin-right: 8px;
`;

const Card = styled.div`
    padding: 0 16px;
`;

const ARROW_TOP = '\u2197';
const ARROW_BOTTOM = '\u2198';

function TripCard({trip}: {trip: Destination[]}) {
    const start = trip[0];
    const end = trip[trip.length - 1];
    return (
        <Grid item xs={12}>
            <Paper variant="outlined" component={Card}>
                <h4>{ARROW_TOP} {start.origin} {start.data}</h4>

                {trip.map(({origin, destination, price, data}) => (
                    <div key={origin + destination}>
                        <TripInfo>{data}</TripInfo>
                        <TripInfo>{origin}...{destination}</TripInfo>
                        <TripInfo>Credits: {price}</TripInfo>
                    </div>
                ))}

                <h4>{ARROW_BOTTOM} {end.destination} {end.data}</h4>
            </Paper>
        </Grid>
    );
}

export interface ResponseContainerProps {
    errors?: string[]
    trip?: Destination[][]
}

function ResponseContainer({errors, trip}: ResponseContainerProps) {
    if (!trip && !errors) {
        return null;
    }

    return (
        <Container>
            <Grid container spacing={2}>
                {errors && errors.length > 0  && errors
                    .map((msg) => (
                        <Grid key={msg} item xs={12}>
                            <Alert severity="error">{msg}</Alert>
                        </Grid>
                    ))}
                {trip && trip.length > 0 && (
                    <>
                        <Grid item xs={12}><h3>Here is your trip:</h3></Grid>
                        {trip
                            .map((tripItem, i) => <TripCard trip={tripItem} key={i}/>)}
                    </>
                )}
            </Grid>
        </Container>
    );
}

export default ResponseContainer;
