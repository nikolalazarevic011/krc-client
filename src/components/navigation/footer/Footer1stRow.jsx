import React from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { isNotMobile } from "../Root";
import { useTheme } from "@mui/material/styles";


const Footer1stRow = () => {
    const theme = useTheme();

    return (
        <Grid item xs={12}>
            {/* Your content for the first row here */}
            <Stack
                direction={isNotMobile ? "row" : "column"}
                border={isNotMobile ? "1px solid" : ""}
                alignItems="center"
                padding={isNotMobile ? "30px" : ""}
                sx={{}}
            >
                <Typography
                    variant="body1"
                    textAlign="center"
                    sx={{ minWidth: "300px" }}
                >
                    Join Our Newsletter to stay current
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Email Address"
                    variant="outlined"
                    color="background"
                    focused
                    placeholder='example@example.com'
                    inputProps={{
                        sx: { color: "white" },
                    }}
                    sx={{
                        mx: 1,
                        minWidth: { xs: "100%", md: "500px" },
                        my: { xs: 2, md: "" },
                    }}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    fullWidth
                    sx={{ mx: { md: 2 } }}
                >
                    <Typography color="bgWhite.main">Submit now</Typography>
                </Button>
            </Stack>
        </Grid>
    );
};

export default Footer1stRow;
