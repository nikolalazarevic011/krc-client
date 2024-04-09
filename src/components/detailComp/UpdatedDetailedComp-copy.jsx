import React from "react";
import VideoCard from "../helper/VideoCard";
import { Container, Grid, Toolbar, Typography } from "@mui/material";

const UpdatedDetailedComp = ({ data, loading }) => {
    // Accept loading prop
    // Assuming 'data' is either an object or null/undefined.
    // const content = data ? [data] : Array(3).fill({}); // Wrap it in an array if it exists, otherwise create an array with empty objects as a fallback
    const content =
        data && Object.keys(data).length > 0 ? [data] : Array(3).fill({});

    // Function to determine the toPage value based on the index, since i don't get url from api, that would be ideal
    const getPageAndSubheader = (index) => {
        switch (index) {
            case 0:
                return { toPage: "classes", subheader: "Latest class" };
            case 1:
                return {
                    toPage: "exercises",
                    subheader: "Exercise of the week",
                };
            default:
                return { toPage: "", subheader: "" }; // Default values if needed
        }
    };
    const getPageAndSubheader2 = (index) => {
        switch (index) {
            case 0:
                return {
                    toPage: "homework",
                    subheader: "Homework of the week",
                };
            case 1:
                return {
                    toPage: "handouts",
                    subheader: "Handout of the week",
                };
            default:
                return { toPage: "", subheader: "" }; // Default values if needed
        }
    };
    return (
        <>
            <Toolbar />
            <Container sx={{ maxWidth: { xs: "sm", md: "xl" } }}>
                <Typography mb={3} mx={3} variant="h5" textAlign="center">
                    {/* Your text here */}
                </Typography>
                <Grid container spacing={3}>
                    {/* First two VideoCard components take up half the width on md and above */}
                    {content.slice(0, 2).map((item, index) => {
                        const { toPage, subheader } =
                            getPageAndSubheader(index);
                        // Construct the toDetailsPage string
                        const toDetailsPage =
                            item && item.class_document_1
                                ? item.class_document_1
                                : null;

                        return (
                            <Grid item xs={12} md={4} key={index}>
                                <VideoCard
                                    title={item.title || ""}
                                    url={item.class_video_url || ""}
                                    description={
                                        item.class_week_description || ""
                                    }
                                    toPage={toPage}
                                    toDetailsPage={toDetailsPage}
                                    subheader={subheader}
                                    loading={loading}
                                />
                            </Grid>
                        );
                    })}
                    {/* Third and Fourth VideoCard components are placed in a nested Grid container */}
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={3} direction="column">
                            {content.slice(2).map((item, index) => {
                                const { toPage, subheader } =
                                    getPageAndSubheader2(index);
                                // Construct the toDetailsPage string
                                const toDetailsPage =
                                    item && item.class_document_1
                                        ? item.class_document_1
                                        : null;

                                return (
                                    <Grid item xs={12} key={`nested-${index}`}>
                                        <VideoCard
                                            title={item.title || ""}
                                            url={item.class_video_url || ""}
                                            description={
                                                item.class_week_description ||
                                                ""
                                            }
                                            toPage={toPage}
                                            toDetailsPage={toDetailsPage}
                                            subheader={subheader}
                                            loading={loading}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Toolbar />
        </>
    );
};

export default UpdatedDetailedComp;
