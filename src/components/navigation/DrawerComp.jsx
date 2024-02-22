import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Drawer, List, Toolbar, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UIActions } from "../../store/ui";
import store from "../../store";
import { isNotMobile } from "./Root";
import CustomAccordion from "../helper/CustomAccordion";

const drawerWidth = 240;

const DrawerComp = () => {
    let toggleDrawer = useSelector((state) => state.ui.toggleDrawer);
    const responsiveDrawerWith = isNotMobile ? drawerWidth : "100%";

    const classes = {
        drawer: {
            width: responsiveDrawerWith,
            ".MuiDrawer-paper": {
                width: responsiveDrawerWith,
                backgroundColor: "#C3DAC3",
            },
            ".MuiBackdrop-root": {
                display: "none",
            },
            backgroundColor: "#C3DAC3",
        },
        list: {
            backgroundColor: "#C3DAC3",
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
                    variant={isNotMobile ? "permanent" : "temporary"}
                    anchor="left"
                    open={toggleDrawer}
                    ModalProps={{
                        keepMounted: false,
                    }}
                >
                    <Toolbar sx={{ mt: -1 }} />
                    <List>
                        {/* sx={classes.list} */}
                        <CustomAccordion
                            title={"Handouts"}
                            array={handoutItems}
                        />
                        <CustomAccordion
                            title={"Classes"}
                            array={classesItems}
                        />
                        <CustomAccordion
                            title={"Homework"}
                            array={homeworkItems}
                        />
                    </List>
                </Drawer>
                <Outlet />
            </Stack>
        </>
    );
};

export default DrawerComp;
