import React from "react";
import VideoCard from "../helper/VideoCard";
import { Container, Grid, Toolbar, Typography } from "@mui/material";

const HomeMain = ({ data, loading }) => {
    // Accept loading prop
    // Assuming data is an array of objects and has at least 3 objects if not loading
    const content = data.length ? data : Array(3).fill({}); // Fallback content if data is empty

    // Function to determine the toPage value based on the index, since i don't get url from api, that would be ideal
    const getPageAndSubheader = (index) => {
        switch (index) {
            case 0:
                return { toPage: "classes", subheader: "Latest class" };
            case 1:
                return { toPage: "homework", subheader: "Latest homework" };
            case 2:
                return { toPage: "exercises", subheader: "Latest exercise" };
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
                    {content.map((item, index) => {
                        const { toPage, subheader } =
                            getPageAndSubheader(index);
                        return (
                            <Grid item xs={12} sm={4} key={index}>
                                <VideoCard
                                    title={item.title || ""}
                                    url={item.class_video_url || ""}
                                    description={
                                        item.class_week_description || ""
                                    }
                                    toPage={toPage} // Dynamically set toPage based on index
                                    subheader={subheader}
                                    loading={loading} // Pass loading state to VideoCard
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
            <Toolbar />
        </>
    );
};

export default HomeMain;
