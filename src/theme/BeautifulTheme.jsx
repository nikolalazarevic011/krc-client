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
            //should be Poppins, Inter . But this works how I want it for now. 
            fontFamily: "inherit | Inter",
            // fontFamily: "Inter,Poppins",
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
        //! for links poppins font does it work? no
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "#9AC339",
                    fontFamily: "Poppins !important",
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
