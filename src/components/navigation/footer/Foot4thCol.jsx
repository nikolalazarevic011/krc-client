import React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { isNotMobile } from "../Root";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const Foot4thCol = () => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{
                    alignItems: { xs: "center", md: "start" },
                }}
            >
                <Typography variant="body1">Get In Touch</Typography>
                <Typography
                    textAlign={isNotMobile ? "" : "center"}
                    sx={{
                        my: 2,
                        borderBottom: `2px solid ${theme.palette.secondary.main}`,
                        width: "39px",
                    }}
                ></Typography>
            </Box>

            <List
                sx={{
                    marginLeft: -2,
                }}
            >
                <ListItem
                    sx={{
                        justifyContent: { xs: "center", md: "start" },
                    }}
                >
                    <ListItemAvatar sx={{
                            mr: { xs:2, md: "0" },
                            // pr: {xs:5, sm:0}

                        }}>
                        <Avatar
                            sx={{
                                ml: { xs: 7.5, md: "0" },
                                backgroundColor: theme.palette.secondary.main
                            }}
                        >
                            <LocationOnIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <Link
                        href="https://maps.app.goo.gl/eE42V2A45JPrAaJF8"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "inherit", textDecoration: "none" }}
                    >
                        <ListItemText
                        
                            color="bgWhite.main"
                            primary={"7600 Roosevelt Rd, Forest Park, IL 60130"}
                        />
                    </Link>
                </ListItem>
                <ListItem
                    sx={{
                        justifyContent: { xs: "center", md: "start" },
                    }}
                >
                    <ListItemAvatar >
                        <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
                            <LocalPhoneIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <Link
                        href="tel:+17086975000"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{ color: "inherit", textDecoration: "none" }} // Ensure link styling
                    >
                        <ListItemText primary="+1 (708) 697 5000" />
                    </Link>
                </ListItem>
                <ListItem
                    sx={{
                        justifyContent: { xs: "center", md: "start" },
                    }}
                >
                    <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
                            <EmailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <Link
                        href="mailto:krc@lwcchelps.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "inherit", textDecoration: "none" }}
                    >
                        <ListItemText
                            color="bgWhite.main"
                            primary="krc@lwcchelps.org"
                        />
                    </Link>
                </ListItem>
            </List>
        </Grid>
    );
};

export default Foot4thCol;
