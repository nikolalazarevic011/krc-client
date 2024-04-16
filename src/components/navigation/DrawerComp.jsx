import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Drawer,
    List,
    Toolbar,
    Stack,
    Skeleton,
    Box,
    CircularProgress,
} from "@mui/material";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { UIActions } from "../../store/ui";
import store from "../../store";
import { isNotMobile } from "./Root";
import CustomAccordion from "../helper/CustomAccordion";
import { basePath, baseURL } from "../../App";

const drawerWidth = 240;

const DrawerComp = () => {
    const [data, setData] = useState({
        handouts: [],
        classesItems: [],
        homework: [],
        exercises: [],
    });
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Use useNavigation hook to access navigation state
    const isNavigating = navigation.state === "loading"; // Check if the navigation state is 'loading'

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
                const response = await fetch(`${baseURL}/ce/v1/krc_classes`);
                if (!response.ok)
                    throw new Error("Failed to fetch classes data");

                const classesData = await response.json();

                const newHandouts = [];
                const newClasses = [];
                let allHomework = [];
                const newExercises = [];

                // Iterate through classes data to collect content
                classesData.forEach((classItem) => {
                    newClasses.push({
                        id: classItem.id,
                        title: classItem.title,
                        slug: classItem.class_number,
                    });

                    //handouts
                    if (classItem.class_document_1) {
                        newHandouts.push({
                            id: classItem.id,
                            slug: classItem.class_document_1,
                            title:
                                classItem.handout_title || "Class Document 1",
                        });
                    }
                    if (classItem.class_document_2) {
                        newHandouts.push({
                            id: classItem.id,
                            slug: classItem.class_document_2,
                            title:
                                classItem.handout_doc_2_title ||
                                "Class Document 2",
                        });
                    }
                    if (classItem.class_document_3) {
                        newHandouts.push({
                            id: classItem.id,
                            slug: classItem.class_document_3,
                            title:
                                classItem.handout_doc_3_title ||
                                "Class Document 3",
                        });
                    }
                    if (classItem.class_document_4) {
                        newHandouts.push({
                            id: classItem.id,
                            slug: classItem.class_document_4,
                            title:
                                classItem.handout_doc_4_title ||
                                "Class Document 4",
                        });
                    }

                    //homework
                    // Collect all homework entries
                    if (classItem.homework_pdf) {
                        allHomework.push({
                            id: classItem.id,
                            slug: classItem.homework_pdf,
                            title: classItem.homework_title,
                            classNumber: parseInt(classItem.class_number, 10),
                        });
                    }
                    //exercise
                    if (classItem.exercize_video || classItem.exercize_pdf) {
                        newExercises.push({
                            title: classItem.exercise_title,
                            slug: classItem.exercise_title,
                        });
                    }

                    if(classItem.exercize_pdfs[1]) {
                        newExercises.push({
                            title: classItem.exercise_2_title,
                            slug: classItem.exercise_2_title,
                        });
                    }
                    if(classItem.exercize_pdfs[2]) {
                        newExercises.push({
                            title: classItem.exercise_3_title,
                            slug: classItem.exercise_3_title,
                        });
                    }
                    if(classItem.exercize_pdfs[3]) {
                        newExercises.push({
                            title: classItem.exercise_4_title,
                            slug: classItem.exercise_4_title,
                        });
                    }
                });

                // Find the newest homework entry based on the highest class number
                const newestHomework = allHomework.reduce((max, item) => {
                    return max.classNumber > item.classNumber ? max : item;
                }, allHomework[0] || null); // Default to the first item or null if empty

                // Update state with collected content
                setData({
                    handouts: newHandouts,
                    classesItems: newClasses,
                    homework: newestHomework ? [newestHomework] : [],  // Ensure it's an array
                    exercises: newExercises,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
                setLoading(false);
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
                                url={"handouts"}
                                array={data.handouts}
                                loading={loading}
                            />
                            <CustomAccordion
                                title={"Classes"}
                                url={"classes"}
                                array={data.classesItems}
                                loading={loading}
                            />
                            <CustomAccordion
                                title={"Homework"}
                                url={"homework"}
                                array={data.homework}
                                loading={loading}
                            />
                            <CustomAccordion
                                title={"Exercises"}
                                url={"exercises"}
                                array={data.exercises}
                                loading={loading}
                            />
                        </List>
                        <Toolbar />
                        <Toolbar />
                    </Drawer>
                </Stack>
            )}
            {isNavigating ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default DrawerComp;
