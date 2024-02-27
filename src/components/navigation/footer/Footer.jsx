import React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { isNotMobile } from "../Root";

const Footer = () => {
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
                    maxWidth: { xs: "", md: "lg" },
                }}
            >
                <Grid container spacing={2}>
                    {/* First row */}
                    <Grid item xs={12}>
                        {/* Your content for the first row here */}
                        <Stack
                            direction={isNotMobile ? "row" : "column"}
                            // border="1px solid"
                            border={isNotMobile ? "1px solid" : ""}
                            alignItems="center"
                            padding="30px"
                            borderColor="bgBlue.main"
                            sx={{}}
                        >
                            <Typography
                                variant="body1"
                                color="bgWhite.main"
                                textAlign='center'
                                sx={{ minWidth : '300px'}}
                            >
                                Join Our Newsletter to stay current
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                                color="bgBlue"
                                focused
                                sx={{
                                    mx: 5,
                                    minWidth: { xs: "300px", md: "600px" },
                                    my: { xs: 2, md: "" },
                                }}
                            />
                            <Button color="secondary" variant="contained">
                                <Typography color="bgWhite.main">
                                    Submit now
                                </Typography>
                            </Button>
                        </Stack>
                    </Grid>
                    {/* Second row */}
                    <Grid container item spacing={2}>
                        {/* Four columns */}
                        <Grid item xs={12} sm={6} md={3}>
                            {/* Your content for the first column here */}
                            <Typography variant="body1">
                                Column 1 Content
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            {/* Your content for the second column here */}
                            <Typography variant="body1">
                                Column 2 Content
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            {/* Your content for the third column here */}
                            <Typography variant="body1">
                                Column 3 Content
                            </Typography>
                        </Grid>
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
