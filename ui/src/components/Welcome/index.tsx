import { Grid } from '@mui/material';

function Welcome() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <h3>Greetings, citizen</h3>
                <p>
                    Please select some planets you want to travel and
                    our mighty droids will provide you with an optimized travel plan
                </p>
            </Grid>
        </Grid>
    );
}

export default Welcome;
