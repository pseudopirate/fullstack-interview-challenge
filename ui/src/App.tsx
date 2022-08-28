import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header';
import TravelForm from './containers/TravelForm';
import { Container } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import Welcome from './components/Welcome';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#bc1e22',
        },
        mode: 'dark',
    },
});


const App = () => (
    <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <CssBaseline/>
            <Container maxWidth="md">
                <Header/>
                <Welcome/>
                <TravelForm/>
            </Container>
        </LocalizationProvider>
    </ThemeProvider>
);

export default App;