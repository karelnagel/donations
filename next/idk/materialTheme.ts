import { createTheme } from '@mui/material/styles';
const tailwind = require("./../tailwind.config")

export const materialTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: tailwind.theme.extend.colors.primary,
        }
    },
    components: {
        MuiTextField: {
            defaultProps: { variant: "filled" }
        },
        MuiChip: {
            defaultProps: {
                variant: "outlined",
                color: "primary"
            }
        }
    }
});

// https://bareynol.github.io/mui-theme-creator/#Icon