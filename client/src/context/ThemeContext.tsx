import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '1rem',
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#2A2932',
        },
        secondary: {
            main: '#313C41',
        },
        background: {
            default: '#15161E',
            paper: '#141414',
        },
        text: {
            primary: '#fff',
            secondary: '#fff',
            disabled: '#fff'
        },
        action: {
            active: '#fff',
            hover: '#313C41',
        }
    },
});
