import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import logoPic from "../../../assets/imgs/Logo_white.png";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "@mui/material/styles";

const Foot1stCol = () => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={3} sx={{}}>
            <Box
                flexDirection="column"
                sx={{
                    display: "flex",
                    // justifyContent: "start",
                    alignItems: { xs: "center", md: "start" },
                }}
            >
                <Typography variant="body1">Kingdom Running Club</Typography>
                <Typography
                    sx={{
                        my: 2,
                        borderBottom: `2px solid ${theme.palette.secondary.main}`,
                        width: "39px",
                    }}
                ></Typography>
                <NavLink to={"/"}>
                    <img
                        src={logoPic}
                        alt="Logo"
                        style={{
                            marginLeft: "-30px", // Adjust this value as needed
                        }}
                    />
                </NavLink>
                <Typography
                    variant="body2"
                    fontSize={"13px"}
                    sx={{
                        textAlign: { xs: "center", md: "start" },
                    }}
                >
                    Kingdom Running Club is a faith-oriented Christian group
                    dedicated to enhancing the well-being of its members while
                    pursuing a noble mission of alleviating hunger,
                    homelessness, and poverty worldwide.
                </Typography>
                <Stack direction="row" spacing={1} mt={2}>
                    <IconButton
                        aria-label="x"
                        color="bgWhite"
                        sx={{
                            "&:hover": {
                                bgcolor: "secondary.main", // Change to your desired hover color
                            },
                        }}
                    >
                        <XIcon />
                    </IconButton>
                    <IconButton
                        aria-label="fa"
                        color="bgWhite"
                        sx={{
                            "&:hover": {
                                bgcolor: "secondary.main", // Change to your desired hover color
                            },
                        }}
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        aria-label="linkedIn"
                        color="bgWhite"
                        sx={{
                            "&:hover": {
                                bgcolor: "secondary.main", // Change to your desired hover color
                            },
                        }}
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Grid>
    );
};

export default Foot1stCol;
