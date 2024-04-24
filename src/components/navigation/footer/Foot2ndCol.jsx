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
    {
        title: "- About Us",
        path: "https://kingdomrunningclub.org/about-who-we-are/",
    },
    { title: "- Events", path: "https://kingdomrunningclub.org/events/" },
    {
        title: "- Member Resources",
        path: "https://kingdomrunningclub.org/resources",
    },
    {
        title: "- Fitness Checklist",
        path: "https://kingdomrunningclub.org/fitness-checklist/",
    },
    {
        title: "- Exercise of the Week",
        path: "https://kingdomrunningclub.org/excercise-guide/",
    },
    {
        title: "- Nutrition of the Week",
        path: "https://kingdomrunningclub.org/nutrition-guide/",
    },
    {
        title: "- Runners' Kitchen",
        path: "https://kingdomrunningclub.org/runners-kitchen/",
    },
    { title: "- Running Blog", path: "https://kingdomrunningclub.org/blog" },
];

const Foot2ndCol = () => {
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
                <Typography variant="body1">Quick Links</Typography>
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

export default Foot2ndCol;
