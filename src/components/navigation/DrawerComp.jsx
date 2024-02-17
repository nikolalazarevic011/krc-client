import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    Drawer,
    List,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ListItemButton,
    Button,
    ListItemIcon,
    ListItemText,
    Typography,
    Toolbar,
    Stack,
} from "@mui/material";
import {
    Link,
    NavLink,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UIActions } from "../../store/ui";
import store from "../../store";
import { isNotMobile } from "./Root";

const drawerWidth = 240;

const DrawerComp = () => {
    let toggleDrawer = useSelector((state) => state.ui.toggleDrawer);
    const responsiveDrawerWith = isNotMobile ? drawerWidth : "100%";

    const classes = {
        drawer: {
            width: responsiveDrawerWith,
            ".MuiDrawer-paper": {
                width: responsiveDrawerWith,
            },
            ".MuiBackdrop-root": {
                display: "none",
            },
        },
    };

    useEffect(() => {
        if (isNotMobile) {
            store.dispatch(UIActions.toggleDrawer(true));
        } else {
            store.dispatch(UIActions.toggleDrawer(false));
        }
    }, []);

    const handleMenuItemClick = () => {
        if (!isNotMobile) {
            store.dispatch(UIActions.toggleDrawer(false));
        }
    };

    const handoutItems = [
        // {
        //     text: "All Documents",
        //     //   icon: <HouseOutlinedIcon fontSize="large" />,
        //     path: "documents",
        // },
        {
            text: "Handouts",
            // //   icon: <RestaurantMenuRoundedIcon fontSize="large" />,
            path: "handouts",
        },
        {
            text: "Shoes",
            // //   icon: <RestaurantMenuRoundedIcon fontSize="large" />,
            path: "shoes",
        },
        {
            text: "Gear",
            // //   icon: <RestaurantMenuRoundedIcon fontSize="large" />,
            path: "gear",
        },
        {
            text: "Seasonal Gear",
            // //   icon: <RestaurantMenuRoundedIcon fontSize="large" />,
            path: "seasonal-gear",
        },
        {
            text: "Water",
            // //   icon: <RestaurantMenuRoundedIcon fontSize="large" />,
            path: "water",
        },
        {
            text: "Clean Eating",
            // //   icon: <RestaurantMenuRoundedIcon fontSize="large" />,
            path: "clean-eating",
        },
        {
            text: "KRC Recipe Book",
            // //   icon: <RestaurantMenuRoundedIcon fontSize="large" />,
            path: "KRC-recipe-book",
        },
    ];

    const classesItems = [
        { text: "Safety During This Time", path: "safety-during-this-time" },
        { text: "Motivation (Class 1 & 2):", path: "motivation-class-1-&-2):" },
        { text: "Shoes (Class 3):", path: "shoes-class-3:" },
        { text: "Gear (Class 3):", path: "gear-class-3:" },
        {
            text: "Seasonal Gear & Motivation (Class 3):",
            path: "seasonal-gear-&-motivation-class-3:",
        },
        {
            text: "Nutrition (Class 5, 7, 8 & 9)",
            path: "nutrition-class-5,-7,-8-&-9",
        },
        {
            text: "Fitness (Class 5 & 6) - Exercise",
            path: "fitness-class-5-&-6-exercise",
        },
        { text: "Running", path: "running" },
        {
            text: "Fitness (Class 5, 10 & 11) - Injury Prevention:",
            path: "fitness-class-5,-10-&-11-injury-prevention:",
        },
        { text: "Winter Running", path: "winter-running" },
        { text: "Presentations", path: "presentations" },
    ];

    const homeworkItems = [
        { text: " Weekly Class Homework", path: "weekly-class-Homework" },
        { text: " Workouts of The Week", path: "workouts-of-the-the-week" },
    ];

    return (
        <>
            <Stack>
                <Drawer
                    sx={classes.drawer}
                    variant="temporary"
                    anchor="left"
                    open={toggleDrawer}
                >
                    <Toolbar sx={{ mt: -1 }} />
                    <List>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="" sx={{ color: "primary.main" }}>
                                    Handouts
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {handoutItems.map((item, index) => (
                                        <Stack key={item.text}>
                                            <Link
                                                to={`/office-at-hand/documents/${item.path}`}
                                            >
                                                <Button
                                                    sx={{
                                                        borderBottom:
                                                            index ===
                                                            handoutItems.length -
                                                                1
                                                                ? 0
                                                                : "1px solid black",
                                                        borderBottomColor:
                                                            "primary.main",
                                                    }}
                                                    fullWidth
                                                    // component={NavLink}
                                                    // to={`/office-at-hand/documents/${item.path}`}
                                                    onClick={
                                                        handleMenuItemClick
                                                    }
                                                >
                                                    <ListItemButton>
                                                        <ListItemText
                                                        // primary={item.text}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: "primary.main",
                                                                }}
                                                            >
                                                                {item.text}
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </Button>
                                            </Link>
                                        </Stack>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1b-content"
                                id="panel1b-header"
                            >
                                <Typography sx={{ color: "primary.main" }}>
                                    Classes
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {classesItems.map((item, index) => (
                                        <Stack key={item.text}>
                                            <Link
                                                to={`/office-at-hand/videos/${item.path}`}
                                            >
                                                <Button
                                                    sx={{
                                                        borderBottom:
                                                            index ===
                                                            classesItems.length -
                                                                1
                                                                ? 0
                                                                : "1px solid black",
                                                        borderBottomColor:
                                                            "primary.main",
                                                    }}
                                                    fullWidth
                                                    // component={NavLink}
                                                    // to={`/office-at-hand/videos/${item.path}`}
                                                    onClick={
                                                        handleMenuItemClick
                                                    }
                                                >
                                                    <ListItemButton>
                                                        <ListItemText
                                                        // primary={item.text}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: "primary.main",
                                                                }}
                                                            >
                                                                {item.text}
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </Button>
                                            </Link>
                                        </Stack>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <Typography sx={{ color: "primary.main" }}>
                                    Homework
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {homeworkItems.map((item, index) => (
                                        <Stack key={item.text}>
                                            <Link
                                                to={`/office-at-hand/videos/${item.path}`}
                                            >
                                                <Button
                                                    sx={{
                                                        borderBottom:
                                                            index ===
                                                            homeworkItems.length -
                                                                1
                                                                ? 0
                                                                : "1px solid black",
                                                        borderBottomColor:
                                                            "primary.main",
                                                    }}
                                                    fullWidth
                                                    onClick={
                                                        handleMenuItemClick
                                                    }
                                                >
                                                    <ListItemButton>
                                                        <ListItemText>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: "primary.main",
                                                                }}
                                                            >
                                                                {item.text}
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </Button>
                                            </Link>
                                        </Stack>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </List>
                </Drawer>
                <Outlet />
            </Stack>
        </>
    );
};

export default DrawerComp;
