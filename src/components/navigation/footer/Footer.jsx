import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Footer1stRow from "./Footer1stRow";

import Foot1stCol from "./Foot1stCol";
import Foot2ndCol from "./Foot2ndCol";
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
                    maxWidth: { xs: "sm", md: "lg" },
                }}
            >
                <Grid
                    container
                    spacing={3}
                    sx={{
                        color: "bgWhite.main",
                    }}
                >
                    {/* First row! */}
                    <Footer1stRow />
                    {/* Second row */}
                    <Grid container item spacing={5}>
                        {/* ----Four columns----- */}
                        {/* first column  */}
                        <Foot1stCol />
                        {/* second column  */}
                        <Foot2ndCol/>
                        {/* third column  */}
                        <Grid item xs={12} sm={6} md={3}>
                            {/* Your content for the third column here */}
                            <Typography variant="body1">
                                Column 3 Content
                            </Typography>
                        </Grid>
                        {/* fourth column  */}
                        <Grid item xs={12} sm={6} md={3}>
                            {/* Your content for the fourth column here */}
                            <Typography variant="body1">
                                Column 4 Content
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
