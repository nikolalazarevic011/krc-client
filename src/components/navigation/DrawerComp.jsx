import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Drawer, List, Toolbar, Stack, Skeleton } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
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
                        slug: item.slug,
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

    // Function to render either a Skeleton or a CustomAccordion
    const renderContentOrSkeleton = (isLoading, dataArray, title) => {
        return isLoading ? (
            <Skeleton variant="rectangular" width={210} height={60} />
        ) : (
            <CustomAccordion title={title} array={dataArray} />
        );
    };

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
                            {/* {handouts && (
                                <CustomAccordion
                                    title={"Handouts"}
                                    array={handouts}
                                />
                            )}
                            {classesItems && (
                                <CustomAccordion
                                    title={"Classes"}
                                    array={classesItems}
                                />
                            )}
                            {homework && (
                                <CustomAccordion
                                    title={"Homework"}
                                    array={homework}
                                />
                            )}
                            {exercises && (
                                <CustomAccordion
                                    title={"Exercises"}
                                    array={exercises}
                                />
                            )} */}

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

                            {/* {renderContentOrSkeleton(
                                loading.handouts,
                                handouts,
                                "Handouts"
                            )}
                            {renderContentOrSkeleton(
                                loading.classesItems,
                                classesItems,
                                "Classes"
                            )}
                            {renderContentOrSkeleton(
                                loading.homework,
                                homework,
                                "Homework"
                            )}
                            {renderContentOrSkeleton(
                                loading.exercises,
                                exercises,
                                "Exercises"
                            )} */}
                        </List>
                        <Toolbar />
                        <Toolbar />
                    </Drawer>
                </Stack>
            )}
            <Outlet />
        </>
    );
};

export default DrawerComp;
