import { Grid } from '@mui/material';
import logo from './logo.svg';

const Header = () => (
    <Grid container>
        <Grid item xs={1}>
            <a href="/">
                <img src={logo} alt="logo" height="75" width="75"/>
            </a>
        </Grid>
        <Grid item>
            <h2>Sith Empire travel service</h2>
        </Grid>
    </Grid>
);

export default Header;
