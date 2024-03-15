import React from "react";
import VideoCard from "../helper/VideoCard";
import { Container, Grid, Toolbar, Typography } from "@mui/material";

const HomeMain = ({ data, loading }) => {
    // Accept loading prop
    // Assuming data is an array of objects and has at least 3 objects if not loading
    const content = data.length ? data : Array(3).fill({}); // Fallback content if data is empty

    return (
        <>
            <Toolbar />
            <Container sx={{ maxWidth: { xs: "sm", md: "xl" } }}>
                <Typography mb={3} mx={3} variant="h5" textAlign="center">
                    {/* Your text here */}
                </Typography>
                <Grid container spacing={3}>
                    {content.map((item, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <VideoCard
                                title={item.title || ""}
                                url={item.class_video_url || ""}
                                description={item.class_week_description || ""}
                                toPage={item.url || ""}
                                subheader={item.subheader || ""}
                                loading={loading} // Pass loading state to VideoCard
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Toolbar />
        </>
    );
};

export default HomeMain;
