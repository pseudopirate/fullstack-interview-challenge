import styled from '@emotion/styled';
import { Alert, Grid, Paper } from '@mui/material';
import { Destination } from '../../../../models/common';

const Container = styled.div`
    margin-top: 16px;
`;

const RouteInfo = styled.span`
    margin-right: 8px;
`;

const Card = styled.div`
    padding: 0 16px;
`;

const ARROW_TOP = '\u2197';
const ARROW_BOTTOM = '\u2198';

function getTotal(route: DestinationWithNames[]) {
    return route.reduce((acc, dest) => acc + dest.price, 0);
}

function TripCard({route}: {route: DestinationWithNames[]}) {
    const start = route[0];
    const end = route[route.length - 1];
    return (
        <Grid item xs={12}>
            <Paper variant="outlined" component={Card}>
                <h4>{ARROW_TOP} {start.originName} {start.data} Credits: {getTotal(route)}</h4>

                {route.map(({origin, destination, price, data}) => (
                    <div key={origin + destination}>
                        <RouteInfo>{data}</RouteInfo>
                        <RouteInfo>{origin}...{destination}</RouteInfo>
                        <RouteInfo>Credits: {price}</RouteInfo>
                    </div>
                ))}

                <h4>{ARROW_BOTTOM} {end.destinationName} {end.data}</h4>
            </Paper>
        </Grid>
    );
}

export type DestinationWithNames = Destination & {originName: string; destinationName: string};

export interface ResponseContainerProps {
    errors?: string[]
    destinations?: DestinationWithNames[][]
}

function ResponseContainer({errors, destinations}: ResponseContainerProps) {
    if (!destinations && !errors) {
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
                {destinations && destinations.length > 0 && (
                    <>
                        <Grid item xs={12}><h3>Here is your trip:</h3></Grid>
                        {destinations
                            .map((route, i) => <TripCard route={route} key={i}/>)}
                    </>
                )}
            </Grid>
        </Container>
    );
}

export default ResponseContainer;
