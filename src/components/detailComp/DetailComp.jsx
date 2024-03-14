import React from "react";
import { Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import VideoPlayer from "../helper/VideoPlayer";
import Link from "@mui/material/Link";

const DetailComp = ({ data }) => {
    return (
        <>
            <Toolbar />
            <Container maxWidth="lg">
                {/* <Toolbar /> */}
                {data.class_video_url && (
                    <VideoPlayer url={data.class_video_url} />
                )}
                <Grid container spacing={3} alignItems="center" mb={3}>
                    <Grid item xs={12} sx={{my:{xs:4, sm:6}}}>
                        <Typography
                            mb={0}
                            mx={3}
                            variant="h6"
                            textAlign="center"
                            color="secondary"
                        >
                            Title : {data.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                        <Typography variant="body1" color="text.secondary">
                            Description :
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.class_week_description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                        <Link
                            href={data.class_document_1}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: "secondary.main" }}
                            >
                                View PDF
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default DetailComp;
