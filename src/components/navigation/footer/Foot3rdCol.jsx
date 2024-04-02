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

const menuList = [
    { title: "- Running Program", path: "https://kingdomrunningclub.org/about-us-program-description" },
    { title: "- Fitness and Performance", path: "https://kingdomrunningclub.org/about-us-program-description/#" },
    { title: "- FAQ's", path: "https://kingdomrunningclub.org/about-frequently-asked-questions" },
    { title: "- Initiatives", path: "https://kingdomrunningclub.org/about-putting-feet-to-faith" },
    { title: "- Testimonials", path: "https://kingdomrunningclub.org/testimonials" },
];

const Foot3rdCol = () => {
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
                <Typography variant="body1">Our Program</Typography>
                <Typography
                    textAlign={isNotMobile ? "" : "center"}
                    sx={{
                        my: 2,
                        borderBottom: `2px solid ${theme.palette.secondary.main}`,
                        width: "39px",
                    }}
                ></Typography>
            </Box>

            <List sx={{ marginLeft: -2 }}>
                {menuList.map((item, index) => (
                    <ListItem disablePadding key={index}>
                        <ListItemButton
                            component="a"
                            href={item.path}
                            sx={{
                                "&:hover": {
                                    bgcolor: "secondary.main", // Change to your desired hover color
                                },
                                justifyContent: { xs: "center", md: "start" },
                            }}
                        >
                            <Typography sx={{ fontSize: "13px" }}>
                                {item.title}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
};

export default Foot3rdCol;
