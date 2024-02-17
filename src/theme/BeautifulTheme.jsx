import { createTheme } from "@mui/material";

const BeautifulTheme = createTheme({
    palette: {
        primary: {
            main: "#283618",
            light: "#C3DAC3",
            // dark: "#2d4d63",
        },
        secondary: {
            main: "#9AC339",
            // light: "#E4DECE",
            dark: "#73AB41",
        },
        //!? jel moze ovako?
        bgBlue: {
            main: "#E8EAF2",
            // light: "#E4DECE",
            // dark: "#AF9B6B",
        },
        bgWhite: {
            main: "#FFFFFF",
            // light: "#E4DECE",
            // dark: "#AF9B6B",
        }, 
    },
    typography: {
        fontFamily: "SofiaSansCondensed",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        body1: {
            fontFamily: "Inter",
        },
        body2: {
            fontFamily: "Inter",
        },
        subtitle1: {
            fontFamily: "Inter",
        },
        subtitle2: {
            fontFamily: "Inter",
        }, 
    },
    components: {
        //! for links poppins font does it work?
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "#283618",
                    fontFamily: "Poppins",
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "underline",
                    },
                },
            },
        },
    },

});

export { BeautifulTheme };
