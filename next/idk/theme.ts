import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: red[500],
        }

    },
    components: {
        MuiTextField: {
            defaultProps: { variant: "filled" }
        }
    }
});

// https://bareynol.github.io/mui-theme-creator/#Icon