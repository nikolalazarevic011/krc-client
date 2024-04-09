import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Drawer, List, Toolbar, Stack, Skeleton , Box, CircularProgress} from "@mui/material";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { UIActions } from "../../store/ui";
import store from "../../store";
import { isNotMobile } from "./Root";
import CustomAccordion from "../helper/CustomAccordion";
import { basePath, baseURL } from "../../App";

const drawerWidth = 240;

const DrawerComp = () => {
    const [handouts, setHandouts] = useState([]);
    const [classesItems, setClassesItems] = useState([]);
    const [homework, setHomework] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState({
        handouts: true,
        classesItems: true,
        homework: true,
        exercises: true,
    });
    const navigation = useNavigation(); // Use useNavigation hook to access navigation state
    const isNavigating = navigation.state === 'loading'; // Check if the navigation state is 'loading'

    const location = useLocation();
    // Define your login page route
    const loginPageRoute = basePath + "/login";

    // Check if the current location matches the login page route
    const isLoginPage = location.pathname === loginPageRoute;

    let toggleDrawer = useSelector((state) => state.ui.toggleDrawer);
    let responsiveDrawerWith = isNotMobile ? drawerWidth : "100%";

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
        // responsiveDrawerWith = isNotMobile ? drawerWidth : "100%";

        if (isNotMobile) {
            store.dispatch(UIActions.toggleDrawer(true));
        } else {
            store.dispatch(UIActions.toggleDrawer(false));
        }
    }, [responsiveDrawerWith]);

    // fetch the drawer contents
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseHandouts = await fetch(
                    `${baseURL}/ce/v1/krc_handouts`
                );
                const responseClassesItems = await fetch(
                    `${baseURL}/ce/v1/krc_classes`
                );
                const responseHomework = await fetch(
                    `${baseURL}/ce/v1/krc_homework`
                );
                const responseExercises = await fetch(
                    `${baseURL}/wp/v2/krc-exercise`
                );

                if (
                    !responseHandouts.ok ||
                    !responseClassesItems.ok ||
                    !responseHomework.ok ||
                    !responseExercises
                ) {
                    throw new Error(
                        "Failed to fetch data from one of the APIs"
                    );
                }

                const responseDataHandouts = await responseHandouts.json();
                const responseDataClassesItems =
                    await responseClassesItems.json();
                const responseDataHomework = await responseHomework.json();
                const responseDataExercises = await responseExercises.json();

                // Extracting required fields from each API response
                const extractedHandouts = responseDataHandouts.map((item) => ({
                    url: "handouts",
                    id: item.id,
                    title: item.title,
                    slug: item.slug,
                }));
                const extractedClassesItems = responseDataClassesItems.map(
                    (item) => ({
                        url: "classes",
                        id: item.id,
                        title: item.title,
                        slug: item.class_number,
                    })
                );
                const extractedDataHomework = responseDataHomework.map(
                    (item) => ({
                        url: "homework",
                        id: item.id,
                        title: item.title,
                        slug: item.slug,
                    })
                );
                const extractedExercises = responseDataExercises.map(
                    (item) => ({
                        url: "exercises",
                        id: item.id,
                        title: item.title.rendered,
                        slug: item.id.toString(),
                    })
                );

                // Update state variables with extracted data
                setHandouts(extractedHandouts);
                setClassesItems(extractedClassesItems);
                setHomework(extractedDataHomework);
                setExercises(extractedExercises);
                setLoading({
                    handouts: false,
                    classesItems: false,
                    homework: false,
                    exercises: false,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {!isLoginPage && (
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
                        <Toolbar />
                        <List>
                            <CustomAccordion
                                title={"Handouts"}
                                array={handouts}
                                loading={loading.handouts}
                            />
                            <CustomAccordion
                        
                                title={"Classes"}
                                array={classesItems}
                                loading={loading.classesItems}
                            />
                            <CustomAccordion
                                title={"Homework"}
                                array={homework}
                                loading={loading.homework}
                            />
                            <CustomAccordion
                                title={"Exercises"}
                                array={exercises}
                                loading={loading.exercises}
                            />
                        </List>
                        <Toolbar />
                        <Toolbar />
                    </Drawer>
                </Stack>
            )}
            {isNavigating ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default DrawerComp;
