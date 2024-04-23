import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Footer1stRow from "./Footer1stRow";
import Foot1stCol from "./Foot1stCol";
import Foot2ndCol from "./Foot2ndCol";
import Foot3rdCol from "./Foot3rdCol";
import Foot4thCol from "./Foot4thCol";
const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                zIndex: (theme) => theme.zIndex.drawer + 2,
                backgroundColor: "primary.main",
                padding: 4,
            }}
        >
            <Container
                sx={{
                    maxWidth: { xs: "sm", md: "xl" },
                }}
            >
                <Grid
                    container
                    spacing={5}
                    sx={{
                        color: "background.main",
                    }}
                >
                    {/* First row! */}
                    {/* <Footer1stRow /> */}
                </Grid>

                {/* Second row */}
                <Grid
                    container
                    spacing={5}
                    sx={{
                        mt: 3,
                        color: "bgWhite.main",
                    }}
                >
                    <Foot1stCol />
                    <Foot2ndCol />
                    <Foot3rdCol />
                    <Foot4thCol />
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
